import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Functional component for the Results Screen.
 * Displays a list of dummy trails near Bundoora with their difficulty and distance.
 */
export default function ResultsScreen() {
  // Dummy trail data.  In a real application, this would come from a database or API.
  const trails = [
    { id: '1', name: 'Bundoora Park Trail', difficulty: 'Easy', distance: '3 km' },
    { id: '2', name: 'Darebin Creek Trail', difficulty: 'Medium', distance: '5 km' },
    { id: '3', name: 'Plenty Gorge Park', difficulty: 'Hard', distance: '10 km' },
    { id: '4', name: 'Gresswell Forest Loop', difficulty: 'Medium', distance: '4 km' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trails Near Bundoora</Text>
      {/* Map through the trails array and render a TrailCard component for each trail. */}
      {trails.map((trail) => (
        <View key={trail.id} style={styles.trailCard}>
          <Text style={styles.trailName}>{trail.name}</Text>
          <Text style={styles.trailInfo}>Difficulty: {trail.difficulty}</Text>
          <Text style={styles.trailInfo}>Distance: {trail.distance}</Text>
        </View>
      ))}
    </View>
  );
}

// Stylesheet for the ResultsScreen component.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background for the whole screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Darker text for the title
  },
  trailCard: {
    backgroundColor: '#fff', // White background for each trail card
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, // Adds a subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  trailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF', // Blue color for trail name to indicate interactivity
    marginBottom: 5,
  },
  trailInfo: {
    fontSize: 16,
    color: '#444', // Darker gray for trail info
  },
});
