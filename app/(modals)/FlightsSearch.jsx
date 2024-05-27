import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import cityToIataMapping from '../../assets/data/cityToIataMapping';
import CustomButton from '../../components/CustomButton';
import CustomTextField from '../../components/CustomTextField';
import CustomDatePicker from '../../components/CustomDatePicker';

const FlightsSearch = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fromId: '',
    toId: '',
    departureDate: '',
    adults: ''
  });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    const suggestions = value.trim() !== '' ? Object.keys(cityToIataMapping).filter(city =>
      city.toLowerCase().startsWith(value.toLowerCase())
    ) : [];

    if (name === 'fromId') {
      setFromSuggestions(suggestions);
    } else if (name === 'toId') {
      setToSuggestions(suggestions);
    }
  };

  const handleSelectSuggestion = (name, suggestion) => {
    setFormData({ ...formData, [name]: suggestion });

    if (name === 'fromId') {
      setFromSuggestions([]);
    } else if (name === 'toId') {
      setToSuggestions([]);
    }
  };

  const handleSubmit = () => {
    const { fromId, toId, departureDate, adults } = formData;
    if (!fromId || !toId || !departureDate || !adults) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const fromIata = cityToIataMapping[fromId] || '';
    const toIata = cityToIataMapping[toId] || '';

    navigation.navigate('FlightResultScreen', { formData: { fromId: fromIata, toId: toIata, departureDate, adults } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        presentation: 'transparentModal',
        headerShown: false
      }} />
      <View style={styles.card}>
      <Text style={{fontSize: 30, marginBottom: 70,}}>Flights Search</Text>

        <CustomTextField
          style={styles.input}
          value={formData.fromId}
          onChangeText={(text) => handleChange('fromId', text)}
          placeholder="Enter from (e.g., BOM.AIRPORT)"
        />
        {fromSuggestions.length > 0 && fromSuggestions.map((suggestion, index) => (
          <Text key={index} onPress={() => handleSelectSuggestion('fromId', suggestion)}>{suggestion}</Text>
        ))}
        <CustomTextField
          style={styles.input}
          value={formData.toId}
          onChangeText={(text) => handleChange('toId', text)}
          placeholder="Enter destination (e.g., DEL.AIRPORT)"
        />
        {toSuggestions.length > 0 && toSuggestions.map((suggestion, index) => (
          <Text key={index} onPress={() => handleSelectSuggestion('toId', suggestion)}>{suggestion}</Text>
        ))}

        
        <CustomDatePicker defaultDate={formData.departureDate} />

        <CustomTextField
          style={styles.input}
          value={formData.adults}
          onChangeText={(text) => handleChange('adults', text)}
          placeholder="No of adults"
          keyboardType="numeric"
        />

        <CustomButton color={'#102C57'} textColor={'#FEFAF6'} title="Search Flights" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  card: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default FlightsSearch;
