import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import { storage } from '../utils/storage';
import * as WebBrowser from 'expo-web-browser';

// Required for expo-auth-session to properly handle redirects
WebBrowser.maybeCompleteAuthSession();

const TOKEN_KEY = 'oauth_token';
const REFRESH_TOKEN_KEY = 'oauth_refresh_token';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  oauthConfig: {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    clientId: string;
    clientSecret?: string;
    redirectUri: string;
    scopes?: string[];
  };
}

export function AuthProvider({ children, oauthConfig }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from secure storage on mount
  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await storage.getItem(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading stored token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      
      const discovery = {
        authorizationEndpoint: oauthConfig.authorizationEndpoint,
        tokenEndpoint: oauthConfig.tokenEndpoint,
      };

      const request = new AuthSession.AuthRequest({
        clientId: oauthConfig.clientId,
        scopes: oauthConfig.scopes || ['openid', 'profile', 'email'],
        redirectUri: oauthConfig.redirectUri,
        responseType: AuthSession.ResponseType.Code,
        usePKCE: true,
      });

      const result = await request.promptAsync(discovery);

      if (result.type === 'success' && result.params.code) {
        // Exchange authorization code for access token
        const tokenRequestParams = new URLSearchParams({
          grant_type: 'authorization_code',
          code: result.params.code,
          redirect_uri: oauthConfig.redirectUri,
          client_id: oauthConfig.clientId,
        });

        // Add client secret if provided (for confidential clients)
        if (oauthConfig.clientSecret) {
          tokenRequestParams.append('client_secret', oauthConfig.clientSecret);
        }

        // Add PKCE verifier if used
        if (request.codeVerifier) {
          tokenRequestParams.append('code_verifier', request.codeVerifier);
        }

        const tokenResponse = await fetch(oauthConfig.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
          body: tokenRequestParams.toString(),
        });

        if (!tokenResponse.ok) {
          throw new Error(`Token exchange failed: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();

        if (tokenData.access_token) {
          await storage.setItem(TOKEN_KEY, tokenData.access_token);
          
          if (tokenData.refresh_token) {
            await storage.setItem(REFRESH_TOKEN_KEY, tokenData.refresh_token);
          }
          
          setToken(tokenData.access_token);
        } else {
          throw new Error('No access token received from server');
        }
      } else {
        throw new Error('Authentication cancelled or failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await storage.deleteItem(TOKEN_KEY);
      await storage.deleteItem(REFRESH_TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = await storage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const refreshParams = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshTokenValue,
        client_id: oauthConfig.clientId,
      });

      if (oauthConfig.clientSecret) {
        refreshParams.append('client_secret', oauthConfig.clientSecret);
      }

      const tokenResponse = await fetch(oauthConfig.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: refreshParams.toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token refresh failed: ${tokenResponse.statusText}`);
      }

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        await storage.setItem(TOKEN_KEY, tokenData.access_token);
        
        if (tokenData.refresh_token) {
          await storage.setItem(REFRESH_TOKEN_KEY, tokenData.refresh_token);
        }
        
        setToken(tokenData.access_token);
      } else {
        throw new Error('No access token received from refresh');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout the user
      await logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
