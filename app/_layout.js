import { Stack } from 'expo-router/stack';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profileinfo" options={{ headerShown: false }} />
    </Stack>
  );
}