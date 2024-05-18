import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import searchHotel from '../apis/searchHotel';

const HotelSearch = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    check_in_date: '',
    check_out_date: '',
    adults: '',
    room_qty: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { check_in_date, check_out_date, adults, room_qty } = formData;
    if (!check_in_date || !check_out_date || !adults || !room_qty) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const hotels = await searchHotel(formData);
      navigation.navigate('Hotels', { hotels });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch hotels');
      console.log(error);
    }
  };

  return (
    <>
      <Text style={styles.label}>Checkin Date</Text>
      <TextInput
        style={styles.input}
        value={formData.check_in_date}
        onChangeText={(text) => handleChange('check_in_date', text)}
        placeholder="Check In Date"
      />

      <Text style={styles.label}>Checkout Date</Text>
      <TextInput
        style={styles.input}
        value={formData.check_out_date}
        onChangeText={(text) => handleChange('check_out_date', text)}
        placeholder="Check Out Date"
      />

      <Text style={styles.label}>Adults</Text>
      <TextInput
        style={styles.input}
        value={formData.adults}
        onChangeText={(text) => handleChange('adults', text)}
        placeholder="No of adults"
      />

      <Text style={styles.label}>Room Quantity</Text>
      <TextInput
        style={styles.input}
        value={formData.room_qty}
        onChangeText={(text) => handleChange('room_qty', text)}
        placeholder="Room Quantity"
      />
      <Button title="Get Details" onPress={handleSubmit} />
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

export default HotelSearch;
