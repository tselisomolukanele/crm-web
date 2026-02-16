import { Stack, Redirect } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "../hooks/useAuth";

// function RootNavigator() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {isAuthenticated ? (
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       ) : (
//         <Stack.Screen name="login" options={{ headerShown: false }} />
//       )}
//     </Stack>
//   );
// }

function RootNavigator() { 
  const { isAuthenticated } = useAuth(); 

  // if (!isAuthenticated) { // redirect to login if not authenticated 
    // return <Redirect href="/login" />; 
  // } 
  
  return ( 
  <Stack screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="(tabs)" /> 
  </Stack> 
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );

}
