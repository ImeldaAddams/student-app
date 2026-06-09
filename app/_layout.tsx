// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { initializeDatabase } from './database';

export default function RootLayout() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeDatabase()
      .then(() => {
        console.log('SQLite Database tables initialized successfully.');
        setIsDbReady(true);
      })
      .catch((err) => {
        console.error('Database configuration failure:', err);
        setError('Failed to initialize local data storage.');
      });
  }, []);

  if (!isDbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          {error ? error : 'Setting up local persistent storage...'}
        </Text>
      </View>
    );
  }

  // WE ADDED THE REGISTRATION ROUTE DIRECTLY BELOW IN THE STACK
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="registration" /> 
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' },
  loadingText: { marginTop: 12, fontSize: 15, color: '#6C727A', fontWeight: '500' },
});