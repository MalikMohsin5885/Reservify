import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFlightHook from '../hooks/useFlightHook';
import LottieView from 'lottie-react-native';

const FlightResultScreen = () => {
  const route = useRoute();
  const formData={
    fromId:'LHE',
    toId:'LHR',
    departureDate:'2024-05-30',
    adults:'1'
  }

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRandomPrice = () => {
    return Math.floor(Math.random() * (2000 - 1200 + 1) + 1200);
  };

  const fetchFlights = async () => {
    try {
      const response = await useFlightHook(formData);
      console.log('FlightData', response);

      const flightList = response.data.flights.map(flight => ({
        id: flight.id,
        airline: flight.bounds[0].segments[0].marketingCarrier.name,
        flightNumber: flight.bounds[0].segments[0].flightNumber,
        duration: flight.bounds[0].segments[0].duration,
        cabinClassName: flight.bounds[0].segments[0].cabinClassName,
        arrivedAt: flight.bounds[0].segments[0].arrivedAt,
        numberOfStops: flight.bounds[0].segments.length - 1,
        imageUrl: `https://www.gstatic.com/flights/airline_logos/70px/${flight.bounds[0].segments[0].marketingCarrier.code}.png`,
        price: getRandomPrice(),
      }));

      setFlights(flightList);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch flight data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const formatDuration = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hr ${minutes} min`;
  };

  const renderItem = ({ item }) => {
    const arrivedTime = item.arrivedAt.split('T')[1].substring(0, 5);
    const durationHours = Math.floor(item.duration / (1000 * 60 * 60));
    const durationMinutes = Math.floor((item.duration % (1000 * 60 * 60)) / (1000 * 60));
    const [arrivedHours, arrivedMinutes] = arrivedTime.split(':').map(Number);
    const departureHours = (arrivedHours + durationHours) % 24;
    const departureMinutes = (arrivedMinutes + durationMinutes) % 60;
    const departureTime = `${departureHours < 10 ? '0' : ''}${departureHours}:${departureMinutes < 10 ? '0' : ''}${departureMinutes}`;

    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.logo} />
          <View style={styles.detailsContainer}>
            <Text style={styles.airlineName}>{item.airline}</Text>
            <Text style={styles.intervalText}>{`${arrivedTime} to ${departureTime}`}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.stopsText}>{item.numberOfStops} Stops</Text>
            <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieView style={{ flex: 1 }} source={require('../assets/lottie/loading.json')} autoPlay loop />
      ) : (
        <View style={styles.flatListContainer}>
          {/* <Text style={styles.heading}>Available Flights</Text> */}
          <FlatList
            data={flights}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "grey",
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  flatListContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    padding: 13,
  },
  cardContainer: {
    backgroundColor: '#DEE5F0',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
  },
  itemContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '10%',
    aspectRatio: 1,
    marginRight: 15,
  },
  airlineName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  detailsRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  intervalText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  stopsText: {
    fontSize: 12,
    color: '#666',
  },
});

export default FlightResultScreen;
