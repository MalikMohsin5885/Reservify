import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlightSearch from '../../components/FlightSearch';
import HotelDestionationSearch from '../../components/HotelDestionationSearch';
import HotelSearch from '../../components/HotelSearch';

export default function Trips() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlightSearch />
      {/* <HotelDestionationSearch/> */}
      <HotelSearch/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
