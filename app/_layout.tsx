import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { initializeDatabase } from './_database-service'; // Import the database initialization service [cite: 248]

export default function RootLayout() {
  
  // The Init Hook: This runs once the very millisecond the app boots up
  useEffect(() => {
    try {
      initializeDatabase(); // Triggers the SQLite table creations [cite: 210-211, 248]
    } catch (error) {
      console.error("Database failed to initialize:", error);
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="api-consumer" />
    </Stack>
  );
}