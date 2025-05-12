import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Auth methods
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const auth = getAuth(); // Initialize Firebase Auth

  // Assuming these state setters are available
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [loginout, setloginout] = useState(''); // State to track login/logout status

  async function logoutA() {
    setEmail(email); // Setting state with current email
    setPword(pword); // Setting state with current password
    console.log('loginA', 'Login: ' + email + ' password: ' + pword);

    signOut(auth)
      .then(() => {
        console.log('SignoutEmailPassword:', 'success:', email);
        setloginout('Signout successful for: ' + email);
        router.replace('/'); // Redirect to login page on successful logout
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setloginout('Signout unsuccessful');
        console.log('SignoutEmailPassword:', errorCode, errorMessage);
        Alert.alert('Logout Failed', errorMessage);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>Nipun Kohli</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>nipun@kohli.com </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logoutA} />
        <Text style={styles.logoutStatus}>{loginout}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
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
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  logoutStatus: {
    marginTop: 10,
    fontSize: 16,
    color: 'green', // Can change based on status
  },
});