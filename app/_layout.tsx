import { Stack, Slot } from "expo-router";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthBoundary } from "./components/AuthBoundary";
import { oauthConfig } from "./config/oauth";

export default function RootLayout() {
  return (
    <AuthProvider oauthConfig={oauthConfig}>
      <Stack>
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            presentation: 'fullScreenModal'
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
