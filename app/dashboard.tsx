// app/dashboard.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  // DASHBOARD RENDER
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBlock}>
          <Text style={styles.welcomeText}>Welcome Back, Imelda Mwaura</Text>
        </View>

        <TouchableOpacity 
          style={[styles.gridCard, styles.registryCard]} 
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.cardIcon}>📝</Text>
          <Text style={styles.cardTitle}>Student Registry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => router.push('/api-consumer')}>
          <Text style={styles.cardTitle}>API Consumer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContainer: { padding: 24 },
  headerBlock: { padding: 20, marginBottom: 20 },
  welcomeText: { fontSize: 18, fontWeight: 'bold' },
  gridCard: { padding: 20, backgroundColor: '#FFF', marginBottom: 15, borderRadius: 10, borderWidth: 1, borderColor: '#DDD' },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  registryCard: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: 20, marginRight: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  logoutButton: { marginTop: 40, padding: 15, backgroundColor: '#DC3545', borderRadius: 8, alignItems: 'center' }
});