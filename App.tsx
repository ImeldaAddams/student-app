import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EventHandling from './components/EventHandling';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <EventHandling />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});