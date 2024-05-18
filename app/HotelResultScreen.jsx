import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HotelResultScreen = () => {
  const route = useRoute();
  const { searchHotelData } = route.params;

  if (!searchHotelData) {
    return (
      <View style={styles.center}>
        <Text>No Hotel data available</Text>
      </View>
    );
  }

  const handleSubmit = (item) => {
    const selectedCityHotels = searchHotelData.data.filter(
      hotel => hotel.city_name === item.city_name && hotel.country === item.country
    );

    const destinationIds = selectedCityHotels.map(hotel => hotel.dest_id);
    console.log(`Hotel IDs for ${item.city_name}:`, destinationIds);
    // Perform any other action needed, such as navigation or API call
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleSubmit(item)}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.cityName}>{item.city_name}</Text>
        <Text style={styles.country}>{item.country}</Text>
        <Text style={styles.hotelsCount}>Number of Hotels: {item.nr_hotels}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={searchHotelData.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.dest_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  country: {
    fontSize: 14,
    color: '#666',
  },
  hotelsCount: {
    fontSize: 14,
    color: '#666',
  },
});

export default HotelResultScreen;
