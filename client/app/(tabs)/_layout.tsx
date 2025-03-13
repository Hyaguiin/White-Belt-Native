// app/_layout.js
import { Stack } from 'expo-router';
import { Header } from '@/components/header/Header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}