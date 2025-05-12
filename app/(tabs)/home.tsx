import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

// Store your API key securely
const API_KEY = 'AIzaSyD6WvrHmpw945McGOenQR_vY1vcMh-95a8'; // Replace with your actual API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const fetchFunFactFromGemini = async () => {
    try {
        const res = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Give me a short and fun nature fact for hikers." }] }],
            }),
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error('Error fetching fun fact:', error);
        return null;
    }
};

export default function HomeScreen() {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const getFunFact = async () => {
        setLoading(true);
        const fact = await fetchFunFactFromGemini();
        setLoading(false);

        if (fact) {
            router.push({ pathname: '/funfact', params: { fact } });
        } else {
            console.log('Failed to retrieve fun fact.');
            // Basic handling: Log the failure, no user-facing alert for simplicity
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.title}>TrekPoint</Text>
                <Pressable style={styles.profileButton} onPress={() => router.push('/profile')}>
                    <Text style={styles.profileIcon}>👤</Text>
                </Pressable>
            </SafeAreaView>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Describe your nature adventure..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setSearchText}
                />
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

            <Pressable style={styles.funFactButton} onPress={getFunFact}>
                <Text style={styles.funFactText}>🌿 Get Nature Fun Fact</Text>
            </Pressable>

            {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 10 }} />}

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