import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: '#102C57',
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      height: '9%',
    }
  };

export default function TabLayout() {

  useEffect(()=>{
    // fetchHotelDetails();
    // searchFlights();
  })
  return (

    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons name="travel-explore" size={focused ? 34 : 24} color='#FEFAF6' />
              {focused ? <Text style={{color: '#FEFAF6', fontSize: 11}}>Explore</Text> : null}
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="Wishlists"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name="heart" size={focused ? 34 : 24} color='#FEFAF6' />
              {focused ? <Text style={{color: '#FEFAF6', fontSize: 11}}>Wishlists</Text> : null}
            </View>
          )
        }}
      />

      <Tabs.Screen
        name="Trips"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons name="airplane-marker" size={focused ? 34 : 24} color='#FEFAF6' />
              {focused ? <Text style={{color: '#FEFAF6', fontSize: 11}}>Trips</Text> : null}
            </View>
          )
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name="person-circle-outline" size={focused ? 34 : 24} color='#FEFAF6' />
              {focused ? <Text style={{color: '#FEFAF6', fontSize: 11}}>Profile</Text> : null}
            </View>
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDefault: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFocused: {
    backgroundColor: '#DDDDDD',
    borderRadius: 30,
    height: 65,
    width: 65,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
