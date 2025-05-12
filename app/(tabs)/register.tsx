// app/register.tsx
import { useRouter } from 'expo-router';
import { getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

// Import Firebase configuration.  This assumes the firebase.js file is correctly set up.
const { firebaseConfig } = require('../../firebase');

// Initialize Firebase only once to prevent multiple apps.
// Check if an app is already initialized. If not, initialize a new one.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// Get the authentication service instance from the initialized Firebase app.
const auth = getAuth(app);
// Get the Firestore database instance from the initialized Firebase app.
const db = getFirestore(app);

/**
 * Functional component for the Registration Screen.
 * Allows users to create a new account with their full name, email, and password.
 */
export default function RegisterScreen() {
  // Hook for navigating between different routes in the Expo Router.
  const router = useRouter();

  // State variable to store the user's full name input.
  const [fullName, setFullName] = useState('');
  // State variable to store the user's email input.
  const [email, setEmail] = useState('');
  // State variable to store the user's password input.
  const [password, setPassword] = useState('');
  // State variable to store the status of the registration process (e.g., success/failure message).
  const [status, setStatus] = useState('');

  /**
   * Asynchronous function to handle user registration.
   * Creates a new user account with email and password using Firebase Authentication,
   * and then stores the user's full name in Firestore.
   */
  const createA = () => {
    // Basic input validation: Check if any of the required fields are empty.
    if (!fullName || !email || !password) {
      Alert.alert('All fields are required'); // Show an alert if any field is missing.
      return; // Stop the registration process.
    }

    // Use Firebase's createUserWithEmailAndPassword to create a new user.
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // If user creation is successful, the 'then' block executes.
        const user = userCredential.user; // Get the user object from the credential.
        setStatus('Created: ' + user.email); // Update status with success message.
        console.log('CreateEmailPassword:', 'success:', user.email); // Log success.

        // Store the user's full name and email in Firestore.
        // Use setDoc to create or overwrite a document in the 'users' collection,
        // using the user's UID as the document ID.
        await setDoc(doc(db, 'users', user.uid), {
          fullName: fullName,
          email: email,
        });

        router.replace('/'); // Redirect to the login screen after successful registration.
      })
      .catch((error) => {
        // If user creation fails, the 'catch' block executes.
        setStatus('Create unsuccessful'); // Update status with failure message.
        console.error('CreateEmailPassword:', error.code, error.message); // Log the error.
        Alert.alert('Registration Error', error.message); // Show an alert with the error.
      });
  };

  return (
    <View style={styles.container}>
      {/* Title of the registration screen */}
      <Text style={styles.title}>TrekPoint</Text>

      {/* Input field for Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa" // Placeholder text color
        value={fullName}
        onChangeText={setFullName} // Update state when text changes
      />

      {/* Input field for Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address" // Optimize keyboard for email input
        autoCapitalize="none"        // Prevent auto-capitalization
        value={email}
        onChangeText={setEmail}
      />

      {/* Input field for Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry // Hide the password characters
        value={password}
        onChangeText={setPassword}
      />

      {/* Button to trigger the registration process */}
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={createA} />
      </View>

      {/* Display the registration status message */}
      {!!status && <Text style={styles.status}>{status}</Text>}

      {/* Link to the login screen for users who already have an account */}
      <Pressable onPress={() => router.replace('/')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

// Stylesheet for the RegisterScreen component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically
    padding: 40,
    backgroundColor: '#fff', // White background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center', // Center-align the text
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#ccc', // Light gray border
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 16, // Horizontal padding
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  status: {
    fontSize: 14,
    color: '#444', // Dark gray text
    textAlign: 'center',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 14,
    color: '#007AFF', // Blue color for links
    textAlign: 'center',
  },
});
