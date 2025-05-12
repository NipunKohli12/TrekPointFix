import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth'; // Importing Firebase Authentication methods for user management.
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

/**
 * Functional component for the Profile Screen.
 * Displays user profile information and provides a button to log out.
 */
export default function ProfileScreen() {
  // Hook for navigating between different routes in the Expo Router.
  const router = useRouter();
  // Initialize Firebase Authentication instance.
  const auth = getAuth();

  // Assuming these state variables and their setters are available within the component's scope.
  // They are used within the logout function but their purpose in the broader component isn't explicitly clear here.
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  // State variable to track and display the status of the login/logout operation.
  const [loginout, setloginout] = useState('');

  /**
   * Asynchronous function to handle the user logout process using Firebase Authentication.
   */
  async function logoutA() {
    // Setting the email state with the current email value (purpose might be for logging or other operations).
    setEmail(email);
    // Setting the password state with the current password value (purpose might be for logging or other operations).
    setPword(pword);
    // Logging the email and password for debugging purposes before attempting to sign out.
    console.log('loginA', 'Login: ' + email + ' password: ' + pword);

    // Call Firebase's signOut function to log the user out.
    signOut(auth)
      .then(() => {
        // If the sign-out is successful, this block is executed.
        console.log('SignoutEmailPassword:', 'success:', email);
        // Update the loginout status state to indicate successful sign-out.
        setloginout('Signout successful for: ' + email);
        // Navigate the user back to the root route (likely the login screen) using Expo Router's replace function.
        // 'replace' is used to prevent the user from navigating back to the profile screen using the back button.
        router.replace('/');
      })
      .catch((error) => {
        // If an error occurs during the sign-out process, this block is executed.
        const errorCode = error.code;
        const errorMessage = error.message;
        // Update the loginout status state to indicate that the sign-out was unsuccessful.
        setloginout('Signout unsuccessful');
        // Log the Firebase error code and message to the console for debugging.
        console.log('SignoutEmailPassword:', errorCode, errorMessage);
        // Display an alert to the user informing them that the logout failed and showing the specific error message from Firebase.
        Alert.alert('Logout Failed', errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      {/* Title of the profile screen */}
      <Text style={styles.title}>Profile</Text>

      {/* Container to display user information */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>Nipun Kohli</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>nipun@kohli.com </Text>
      </View>

      {/* Container for the logout button and status message */}
      <View style={styles.buttonContainer}>
        {/* Button to trigger the logout process */}
        <Button title="Logout" onPress={logoutA} />
        {/* Text component to display the login/logout status */}
        <Text style={styles.logoutStatus}>{loginout}</Text>
      </View>
    </View>
  );
}

// Stylesheet for the ProfileScreen component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center', // Centers content vertically
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#555', // A slightly darker gray for labels
  },
  value: {
    fontSize: 18,
    fontWeight: '600', // Semi-bold for emphasis
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center', // Centers the button and status text horizontally
  },
  logoutStatus: {
    marginTop: 10,
    fontSize: 16,
    color: 'green', // Indicates a successful status
  },
});