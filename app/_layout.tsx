import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack } from "expo-router";

export default function RootLayout() {
  return ( 
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}
