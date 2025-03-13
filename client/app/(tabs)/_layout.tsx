// app/_layout.js
import { Stack } from 'expo-router';
import { Header } from '@/components/header/Header'; 
export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}  
        />
         <Stack.Screen
          name="Home"
          options={{
            headerShown: false,  
          }}
        />
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,  
          }}
        />
      
      </Stack>
    </>
  );
}
