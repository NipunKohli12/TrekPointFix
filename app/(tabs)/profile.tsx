import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  function handleLogout() {
    router.push('/');
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
        <Button title="Logout" onPress={handleLogout} />
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
});
