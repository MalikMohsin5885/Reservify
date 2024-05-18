import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Hotels = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { hotels } = route.params;

  // Render function for each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('HotelDescription', { hotel: item })}
    >
      <Text style={styles.title}>Hotel Name: {item.hotel_name}</Text>
      <Text>Rating: {item.review_score}</Text>
      <Text>Country: {item.country_trans}</Text>
      <Text>Address: {item.address}</Text>
      {item.max_photo_url && (
        <Image source={{ uri: item.max_photo_url }} style={styles.image} />
      )}
    </TouchableOpacity>
  );

  // Return FlatList
  return (
    <View style={styles.container}>
      <FlatList
        data={hotels.result}
        renderItem={renderItem}
        keyExtractor={(item) => item.hotel_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default Hotels;
