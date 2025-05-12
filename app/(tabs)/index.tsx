import { useRouter } from 'expo-router';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
const { firebaseConfig } = require('../../firebase');

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<string>('');

  const loginA = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login success:', user.email);
        setLoginStatus('Login success: ' + user.email);
        router.push('/home');
      })
      .catch((error) => {
        console.error('Login failed:', error.code, error.message);
        setLoginStatus('Login failed');
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View style={styles.containerColumn}>
      <View style={styles.containerRow}>
        <Text style={styles.title}>TrekPoint</Text>
      </View>

      {!!loginStatus && (
        <View style={styles.containerRow}>
          <Text style={styles.status}>{loginStatus}</Text>
        </View>
      )}

      <View style={styles.containerRow}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.containerRow}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.containerRow}>
        <Button title="Login" onPress={loginA} />
      </View>

      <View style={styles.containerRow}>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  linkText: {
    fontSize: 14,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
});
