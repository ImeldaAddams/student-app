import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = () => {
    // 1. Validation: Check if any fields are empty
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // 2. Validation: Simple email verification
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // 3. Validation: Enforce password length safety rules
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    // Success route transition straight to the dashboard
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started with your student app</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="John Doe" 
              placeholderTextColor="#999" 
              value={fullName} 
              onChangeText={setFullName} 
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              style={styles.input} 
              placeholder="student@university.ac.ke" 
              placeholderTextColor="#999" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              value={email} 
              onChangeText={setEmail} 
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="••••••••" 
                placeholderTextColor="#999" 
                secureTextEntry={secureText} 
                value={password} 
                onChangeText={setPassword} 
              />
              <TouchableOpacity 
                style={styles.toggleButton} 
                onPress={() => setSecureText(!secureText)}
              >
                <Text style={styles.toggleText}>{secureText ? "Show" : "Hide"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  flex: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  headerContainer: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A1C1E', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6C727A' },
  formContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  label: { fontSize: 14, fontWeight: '600', color: '#343A40', marginBottom: 8, marginTop: 12 },
  input: { height: 50, backgroundColor: '#F8F9FA', borderRadius: 10, paddingHorizontal: 16, fontSize: 16, color: '#1A1C1E', borderWidth: 1, borderColor: '#E9ECEF' },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 10, borderWidth: 1, borderColor: '#E9ECEF', height: 50 },
  passwordInput: { flex: 1, height: '100%', paddingHorizontal: 16, fontSize: 16, color: '#1A1C1E' },
  toggleButton: { paddingHorizontal: 16, justifyContent: 'center', height: '100%' },
  toggleText: { color: '#007AFF', fontWeight: '600', fontSize: 14 },
  button: { height: 50, backgroundColor: '#007AFF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontSize: 14, color: '#6C727A' },
  link: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
});