import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import searchFlights from '../apis/searchFlight';

const FlightSearch = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    adult: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { from, to, departureDate, adult } = formData;
    if (!from || !to || !departureDate || !currency) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const flightData = await searchFlights(formData);
      console.log('Flight data:', flightData);
      navigation.navigate('FlightResultScreen', { flightData });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch flight data');
    }
  };

  return (
    <>
      <Text style={styles.label}>From:</Text>
      <TextInput
        style={styles.input}
        value={formData.from}
        onChangeText={(text) => handleChange('from', text)}
        placeholder="Enter from (e.g., BOM.AIRPORT)"
      />

      <Text style={styles.label}>To:</Text>
      <TextInput
        style={styles.input}
        value={formData.to}
        onChangeText={(text) => handleChange('to', text)}
        placeholder="Enter destination (e.g., DEL.AIRPORT)"
      />

      <Text style={styles.label}>Departure Date:</Text>
      <TextInput
        style={styles.input}
        value={formData.departureDate}
        onChangeText={(text) => handleChange('departureDate', text)}
        placeholder="Enter departure date (YYYY-MM-DD)"
      />

      <Text style={styles.label}>Adult:</Text>
      <TextInput
        style={styles.input}
        value={formData.adult}
        onChangeText={(text) => handleChange('adult', text)}
        placeholder="No of adults"
      />



      <Button title="Search Flights" onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default FlightSearch;
