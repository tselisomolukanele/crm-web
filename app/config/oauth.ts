import * as AuthSession from 'expo-auth-session';

// OAuth2 Configuration
// Update these values with your OAuth2 server details
export const oauthConfig = {
  authorizationEndpoint: process.env.EXPO_PUBLIC_OAUTH_AUTHORIZATION_ENDPOINT || 'https://your-oauth-server.com/oauth/authorize',
  tokenEndpoint: process.env.EXPO_PUBLIC_OAUTH_TOKEN_ENDPOINT || 'https://your-oauth-server.com/oauth/token',
  clientId: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.EXPO_PUBLIC_OAUTH_CLIENT_SECRET || undefined, // Optional, depending on your OAuth2 server
  redirectUri: AuthSession.makeRedirectUri({
    scheme: 'crmweb', // Should match the scheme in app.json
    path: 'callback',
  }),
  scopes: ['basic'],
};
