import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const FlightResultScreen = () => {
  const route = useRoute();
  const { flightData } = route.params;

  if (!flightData || !flightData.data || !flightData.data.aggregation) {
    return (
      <View>
        <Text>No flight data available</Text>
      </View>
    );
  }

  const aggregation = flightData.data.aggregation;

  // Prepare data for FlatList
  const flightListData = aggregation.airlines.map((airline) => {
    // Find stops for this airline
    const stops = aggregation.stops.find(stop => 
      stop.minPrice.currencyCode === airline.minPrice.currencyCode &&
      stop.minPrice.units === airline.minPrice.units &&
      stop.minPrice.nanos === airline.minPrice.nanos
    );

    // Format baggage details
    const baggageDetails = aggregation.baggage.map(baggage => `${baggage.baggageType}: ${baggage.count}`).join(', ');

    // Format budget
    const budget = aggregation.budget ? 
      `${(+aggregation.budget.min.units + aggregation.budget.min.nanos / 1000000000).toFixed(2)} - ${(+aggregation.budget.max.units + aggregation.budget.max.nanos / 1000000000).toFixed(2)} ${aggregation.budget.max.currencyCode}` : 'N/A';

    // Format min price
    const minPrice = `${(+airline.minPrice.units + airline.minPrice.nanos / 1000000000).toFixed(2)} ${airline.minPrice.currencyCode}`;

    // Format duration
    const duration = `${aggregation.durationMin} - ${aggregation.durationMax} hours`;

    // Get flight offers for this airline
    const flightOffers = flightData.data.flightOffers.filter(offer => offer.airlineCode === airline.iataCode);

    return {
      name: airline.name,
      logoUrl: airline.logoUrl,
      minPrice,
      departureIntervals: aggregation.departureIntervals.map(interval => `${interval.start} - ${interval.end}`).join(', '),
      stops: stops ? stops.numberOfStops : 'N/A',
      baggage: baggageDetails,
      budget,
      duration,
      flightOffers,
    };
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.logoUrl }} style={styles.logo} />
      <View style={styles.detailsContainer}>
        <Text style={styles.airlineName}>{item.name}</Text>
        <Text>Departure Intervals: {item.departureIntervals}</Text>
        <Text>Min Price: {item.minPrice}</Text>
        <Text>Stops: {item.stops}</Text>
        <Text>Baggage: {item.baggage}</Text>
        <Text>Budget: {item.budget}</Text>
        <Text>Duration: {item.duration}</Text>
        <Text>Flight Offers:</Text>
        {item.flightOffers.length > 0 ? (
          item.flightOffers.map((offer, index) => (
            <Text key={index}>- {offer.offerDescription}</Text>
          ))
        ) : (
          <Text>No offers available</Text>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={flightListData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  airlineName: {
    fontWeight: 'bold',
  },
});

export default FlightResultScreen;
