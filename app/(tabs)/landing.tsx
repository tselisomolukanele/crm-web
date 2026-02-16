import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CaptureSaleForm from "../components/capture-sale-form";
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';

const CLIENT_ID = 'THE_CLIENT_ID';
const AUTH_DOMAIN = 'http://localhost:8000';
const REDIRECT_URI = makeRedirectUri({ useProxy: false });//'http://localhost:8081';
const SCOPES = ['basic'];

export default function Landing() {
  const [userInfo, setUserInfo] = useState(null);

  // Handle OAuth2 response
  // useEffect(() => {
  //   const getToken = async () => {
  //     if (response?.type === 'success' && discovery) {
  //       try {
  //         const tokenResponse = await AuthSession.exchangeCodeAsync(
  //           {
  //             clientId: CLIENT_ID,
  //             code: response.params.code,
  //             redirectUri: REDIRECT_URI,
  //             extraParams: { code_verifier: request.codeVerifier },
  //           },
  //           discovery
  //         );

  //         // Fetch user info
  //         const userResponse = await fetch(discovery.userInfoEndpoint, {
  //           headers: { Authorization: `Bearer ${tokenResponse.accessToken}` },
  //         });
  //         const user = await userResponse.json();
  //         setUserInfo(user);
  //       } catch (error) {
  //         console.error('Token exchange failed', error);
  //       }
  //     }
  //   };
  //   getToken();
  // }, [response, discovery]);

  function login() {
  const authUrl = `${AUTH_DOMAIN}/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES[0]}&state=xyz`;

  // 👇 Navigate the whole window
  window.location.href = authUrl;
}

  return (
    <View style={styles.container}>
      <CaptureSaleForm />
      <Text>Landing</Text>
      <Link href="/about">Go to About Page</Link>
      {userInfo ? (
        <>
          <Text style={styles.text}>Welcome, {userInfo.name}</Text>
          <Text style={styles.text}>Email: {userInfo.email}</Text>
        </>
      ) : (
        <Button
          title="Login with OAuth2"
          onPress={() => login() }//promptAsync({ useProxy: false, redirectUri: REDIRECT_URI })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
