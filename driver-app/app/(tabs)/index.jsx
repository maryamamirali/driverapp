import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { collection, query, where, getDocs, updateDoc, doc } from '../config/firebase';
import { db } from '../config/firebase';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../styles/styling';

import * as Location from 'expo-location'; // Import for getting user location

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [carSelections, setCarSelections] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // To store the selected car details
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null); // To store the user's location

  useEffect(() => {
    // Function to fetch the car selections from Firestore
    const fetchCarSelections = async () => {
      try {
        const q = query(collection(db, 'rides'), where('status', '==', 'pending'));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log('No documents found.');
        } else {
          const selections = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Selections:', selections);  // Add this log to see the fetched data
          setCarSelections(selections);
        }
      } catch (error) {
        console.error('Error fetching car selections:', error);
        setError('Failed to fetch car selections. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch car selections when the component mounts
    fetchCarSelections();

    // Fetch the user's current location
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    fetchLocation();
  }, []);

  // Function to update the status of a car selection
  const updateStatus = async (id, status) => {
    try {
      const carRef = doc(db, 'rides', id);
      await updateDoc(carRef, { status });
      setCarSelections(prevSelections =>
        prevSelections.map(item =>
          item.id === id ? { ...item, status } : item
        )
      );
      if (status === 'accepted') {
        const selected = carSelections.find(item => item.id === id);
        setSelectedCar(selected);
      }
      Alert.alert('Success');
    } catch (error) {
      Alert.alert('Error', 'Failed to update car selection. Please try again.');
    }
  };

  // Function to handle accept button press
  const handleAccept = (id) => {
    Alert.alert('Confirm', 'Are you sure you want to accept this car selection?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          updateStatus(id, 'accepted');
          Alert.alert('Accept', 'You have accepted the car selection');
        }
      },
    ]);
  };

  // Function to update and delete
  const updateStatusAndDeleteFields = async (id) => {
    try {
      const carRef = doc(db, 'rides', id);
  
      // Update the status and clear fields
      await updateDoc(carRef, { 
        status: 'declined', 
        'pickup.pickupAddress': '', 
        'dropOff.dropOffAddress': '', 
        fare: 0 
      });
  
      // Call the function to delete the declined request from Firestore and the UI
      deleteDeclinedRequest(id);
    } catch (error) {
      Alert.alert('Error', 'Failed to update car selection. Please try again.');
    }
  };
  


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : carSelections.length === 0 ? (
        <Text>No car selections available</Text>
      ) : (
        <FlatList
          data={carSelections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>Pickup: {item.pickup.pickupAddress}</Text>
              <Text>Dropoff: {item.dropOff.dropOffAddress}</Text>
              <Text>Total Price: PKR {item.fare}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(item.id)}
                >
                  <Text>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => updateStatusAndDeleteFields(item.id)}
                >
                  <Text>Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {location && (
        <MapView
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description={"This is where you are!"}
          />
        </MapView>
      )}
    </View>
  );
}

