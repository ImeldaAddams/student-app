import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

type User = {
  id: number;
  name: string;
};

export default function ApiConsumerScreen() {
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>API Data</Text>
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList 
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
        />
      )}

      {/* Navigate explicitly to dashboard */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.replace('/dashboard')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16 },
  closeButton: { marginTop: 20, padding: 15, backgroundColor: '#007AFF', borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});