import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const HotelDescription = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { hotel } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel Name: {hotel.hotel_name}</Text>
      <Text>Rating: {hotel.review_score}</Text>
      <Text>Country: {hotel.country_trans}</Text>
      <Text>Address: {hotel.address}</Text>
      {/* Render other hotel details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HotelDescription;
