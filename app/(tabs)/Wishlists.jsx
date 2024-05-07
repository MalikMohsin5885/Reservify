import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
        <Text>Wishlists</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
