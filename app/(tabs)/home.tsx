import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

// Store your API key securely - Consider using environment variables in production.
// This API key is directly in the code and should be handled with more caution in a real application.
const API_KEY = 'AIzaSyD6WvrHmpw945McGOenQR_vY1vcMh-95a8'; // Replace with your actual API key
// Constructing the Gemini API URL with the API key.
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

/**
 * Asynchronous function to fetch a fun nature fact from the Gemini API.
 * @returns {Promise<string | null>} A promise that resolves to the fun fact (string) or null if an error occurs.
 */
const fetchFunFactFromGemini = async () => {
    try {
        // Making a POST request to the Gemini API.
        const res = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Give me a short and fun nature fact for hikers." }] }],
            }),
        });
        // Parsing the JSON response from the API.
        const data = await res.json();
        // Extracting the text of the fun fact from the API response.
        // Using optional chaining (?.) to safely access nested properties.
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        // Logging any errors that occur during the API call for debugging.
        console.error('Error fetching fun fact:', error);
        return null; // Returning null to indicate that the fact could not be fetched.
    }
};

/**
 * Functional component for the Home Screen.
 * Displays a title, a search input (not yet functional), a button to fetch a fun nature fact,
 * a loading indicator while fetching, a map view, and a profile button.
 */
export default function HomeScreen() {
    // Hook for navigating between different routes in the Expo Router.
    const router = useRouter();
    // State variable to store the text entered in the search input.
    const [searchText, setSearchText] = useState('');
    // State variable to control the visibility of the loading indicator.
    const [loading, setLoading] = useState(false);

    /**
     * Asynchronous function to fetch a fun fact and navigate to the FunFact screen.
     */
    const getFunFact = async () => {
        // Set loading to true to display the activity indicator.
        setLoading(true);
        // Call the function to fetch the fun fact from the Gemini API.
        const fact = await fetchFunFactFromGemini();
        // Set loading to false to hide the activity indicator after the API call completes.
        setLoading(false);

        // Check if a fact was successfully retrieved.
        if (fact) {
            // Navigate to the FunFact screen, passing the retrieved fact as a parameter.
            router.push({ pathname: '/funfact', params: { fact } });
        } else {
            // Log a message to the console if the fact retrieval failed.
            console.log('Failed to retrieve fun fact.');
            // Basic handling: Log the failure, no user-facing alert for simplicity in this version.
            // In a production app, you might want to display an error message to the user.
        }
    };

    return (
        <View style={styles.container}>
            {/* SafeAreaView to ensure content is within the safe area of the device screen. */}
            <SafeAreaView style={styles.header}>
                <Text style={styles.title}>TrekPoint</Text>
                {/* Button to navigate to the Profile screen. */}
                <Pressable style={styles.profileButton} onPress={() => router.push('/profile')}>
                    <Text style={styles.profileIcon}>👤</Text>
                </Pressable>
            </SafeAreaView>

            {/* Container for the search input and icon. */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Describe your nature adventure..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {/* Non-functional search icon button. */}
                <Pressable
                    style={styles.searchIcon}
                    onPress={() => {
                        Alert.alert("AI trail search is not implemented yet.");
                        console.log('Search submitted:', searchText);
                    }}
                >
                    <Text>🔍</Text>
                </Pressable>
            </View>

            {/* Button to trigger the fetching of the fun nature fact. */}
            <Pressable style={styles.funFactButton} onPress={getFunFact}>
                <Text style={styles.funFactText}>🌿 Get Nature Fun Fact</Text>
            </Pressable>

            {/* ActivityIndicator displayed while the 'loading' state is true. */}
            {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 10 }} />}

            {/* Container for the MapView component. */}
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_DEFAULT}
                    style={styles.map}
                    initialRegion={{
                        latitude: -37.721,
                        longitude: 145.046,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {/* Example Marker on the map. */}
                    <Marker
                        coordinate={{ latitude: -37.721077, longitude: 145.047977 }}
                        title="Agora"
                        description="My Coffee"
                    />
                </MapView>
            </View>
        </View>
    );
}

// Stylesheet for the HomeScreen component.
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: { fontSize: 28, fontWeight: 'bold' },
    profileButton: { padding: 8 },
    profileIcon: { fontSize: 24 },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 16,
        paddingHorizontal: 12,
    },
    searchInput: { flex: 1, height: 48, fontSize: 16 },
    searchIcon: { paddingHorizontal: 8 },
    funFactButton: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: '#cce5cc',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    funFactText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapContainer: {
        flex: 1,
        marginTop: 16,
        marginHorizontal: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    map: { ...StyleSheet.absoluteFillObject },
});