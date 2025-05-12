import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FunFactScreen() {
  const { fact } = useLocalSearchParams<{ fact: string }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌿 Nature Fun Fact</Text>
      <View style={styles.resultBox}>
        <Text style={styles.suggestion}>{fact || 'No fun fact available.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultBox: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  suggestion: {
    fontSize: 16,
    color: '#333',
  },
});