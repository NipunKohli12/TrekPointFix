import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Functional component for the Fun Fact Screen.
 * Displays a fun nature fact received as a parameter.
 */
export default function FunFactScreen() {
  // Use the useLocalSearchParams hook to access route parameters.
  // In this case, we expect a parameter named 'fact' of type string.
  const { fact } = useLocalSearchParams<{ fact: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title of the screen */}
      <Text style={styles.title}>🌿 Nature Fun Fact</Text>
      {/* Container for displaying the fun fact */}
      <View style={styles.resultBox}>
        {/* Display the fun fact. If 'fact' is null or undefined, show a default message. */}
        <Text style={styles.suggestion}>{fact || 'No fun fact available.'}</Text>
      </View>
    </ScrollView>
  );
}

// Stylesheet for the FunFactScreen component.
const styles = StyleSheet.create({
  container: {
    padding: 24, // Padding for the entire screen content
    backgroundColor: '#fff', // White background
    flexGrow: 1, // Allow the ScrollView to grow and take up space
  },
  title: {
    fontSize: 24, // Larger font size for the title
    fontWeight: 'bold', // Bold font weight
    marginBottom: 20, // Bottom margin to separate title from content
  },
  resultBox: {
    padding: 16, // Padding for the result box
    backgroundColor: '#f1f1f1', // Light gray background for the box
    borderRadius: 8, // Rounded corners for the box
  },
  suggestion: {
    fontSize: 16, // Standard font size for the fact
    color: '#333', // Dark gray text color
  },
});
