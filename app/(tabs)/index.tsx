import { useRouter } from 'expo-router';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// Importing the Firebase configuration from a local file.
const { firebaseConfig } = require('../../firebase');

// Initialize Firebase only once to prevent multiple app instances.
// Check if Firebase apps have already been initialized.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// Get the Firebase Auth instance associated with the initialized app.
const auth = getAuth(app);

/**
 * Functional component for the Login Screen.
 * Allows users to log in with their email and password using Firebase Authentication.
 */
export default function LoginScreen() {
  // Hook for navigating between different routes in the Expo Router.
  const router = useRouter();

  // State variable to store the user's email input.
  const [email, setEmail] = useState('');
  // State variable to store the user's password input.
  const [password, setPassword] = useState('');
  // State variable to display the status of the login attempt (e.g., success or failure messages).
  const [loginStatus, setLoginStatus] = useState<string>('');

  /**
   * function to handle the login process using Firebase email and password authentication.
   */
  const loginA = () => {
    // Call Firebase's signInWithEmailAndPassword function to authenticate the user.
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If login is successful, the 'then' block is executed.
        const user = userCredential.user;
        // Log the successful login and the user's email to the console for debugging.
        console.log('Login success:', user.email);
        // Update the login status state to display a success message.
        setLoginStatus('Login success: ' + user.email);
        // Navigate the user to the home screen using Expo Router.
        router.push('/home');
      })
      .catch((error) => {
        // If login fails, the 'catch' block is executed.
        // Log the error code and message to the console for debugging.
        console.error('Login failed:', error.code, error.message);
        // Update the login status state to display a failure message.
        setLoginStatus('Login failed');
        // Display an alert to the user informing them of the login error and the specific error message from Firebase.
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View style={styles.containerColumn}>
      {/* Row container for the title */}
      <View style={styles.containerRow}>
        <Text style={styles.title}>TrekPoint</Text>
      </View>

      {/* Conditional rendering of the login status message */}
      {!!loginStatus && (
        <View style={styles.containerRow}>
          <Text style={styles.status}>{loginStatus}</Text>
        </View>
      )}

      {/* Row container for the email input */}
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

      {/* Row container for the password input */}
      <View style={styles.containerRow}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry // Obscures the password input for security
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Row container for the login button */}
      <View style={styles.containerRow}>
        <Button title="Login" onPress={loginA} />
      </View>

      {/* Row container for the registration link */}
      <View style={styles.containerRow}>
        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Don&apos;t have an account?</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Stylesheet for the LoginScreen component.
const styles = StyleSheet.create({
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // Centers content vertically
    padding: 40,
    backgroundColor: '#fff',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers content horizontally within the row
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
    color: '#007AFF', // Standard blue color for links
    textAlign: 'center',
    marginTop: 10,
  },
});