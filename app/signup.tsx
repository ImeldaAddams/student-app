import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { registerStudent } from './_database-service'; // <-- 1. Import the database service [cite: 228-230, 248]

export default function SignUpScreen() {
  const router = useRouter();

  // 2. Local input tracking states [cite: 220-224]
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // 3. Database submission lifecycle
  const handleSignUp = () => {
    // Validation check to prevent empty rows [cite: 248]
    if (!regNo.trim() || !name.trim() || !course.trim() || !yearOfStudy.trim() || !phoneNumber.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all universal student profile attributes.");
      return;
    }

    try {
      // Execute transaction write sequence [cite: 228-230, 248]
      registerStudent(
        regNo.trim(),
        name.trim(),
        course.trim(),
        yearOfStudy.trim(),
        phoneNumber.trim(),
        password
      );

      Alert.alert(
        "Success", 
        "Student identity record successfully committed to SQLite storage blocks.",
        [{ text: "OK", onPress: () => router.replace('/login') }]
      );
    } catch (error: any) {
      Alert.alert("Database Error", "Failed to persist record: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Student Management System (SMS)</Text>

        {/* Input Form Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Registration Number</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., BIT/2024/39544" 
            value={regNo} 
            onChangeText={setRegNo} 
            autoCapitalize="characters"
          />

          <Text style={styles.label}>Full Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., Imelda Mwaura" 
            value={name} 
            onChangeText={setName} 
          />

          <Text style={styles.label}>Course Path</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., BSc. Information Technology" 
            value={course} 
            onChangeText={setCourse} 
          />

          <Text style={styles.label}>Year of Study</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., Year 2" 
            value={yearOfStudy} 
            onChangeText={setYearOfStudy} 
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g., 0712345678" 
            value={phoneNumber} 
            onChangeText={setPhoneNumber} 
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Account Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry
          />

          {/* Action Trigger Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register Student</Text>
          </TouchableOpacity>

          {/* Route Redirect Anchor Link */}
          <TouchableOpacity onPress={() => router.push('/login')} style={styles.linkContainer}>
            <Text style={styles.linkText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 32, textAlign: 'center', fontWeight: '500' },
  form: { width: '100%' },
  label: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#f4f6f9', padding: 14, borderRadius: 10, fontSize: 15, color: '#111', borderWidth: 1, borderColor: '#e4e7eb' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 24, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#007AFF', fontSize: 14, fontWeight: '600' }
});