import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import searchHotelDestination from '../apis/searchHotelDestination';
import { useNavigation } from 'expo-router';

const HotelDestionationSearch = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    destination: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { destination } = formData;
    if (!destination) {
      Alert.alert('Error', 'Please fill in the required field');
      return;
    }

    try {
      const searchHotelData = await searchHotelDestination({ query: destination });
      console.log('Hotel data:', searchHotelData);
      navigation.navigate('HotelResultScreen', { searchHotelData });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch hotel data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={formData.destination}
        onChangeText={(text) => handleChange('destination', text)}
        placeholder="Enter location"
      />
      <Button title="Search Hotels" onPress={handleSubmit} />
    </View>
  );
};

export default HotelDestionationSearch;

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});
