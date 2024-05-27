import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MenuButton from '../../components/ProfileMenuButton'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
  
    const menuOptions = [
        { title: 'Personnel Information', onPress: () => navigation.navigate('PersonnelInformation') },
        { title: 'Notifications', onPress: () => console.log('Notifications') },
        { title: 'Payments and Payouts', onPress: () => console.log('Payments and Payouts') },
        { title: 'Privacy Policy', onPress: () => console.log('Privacy Policy') }
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.profileHeader}>
                <Image
                    source={require('../../assets/profile.png')}//577 x 577
                    style={styles.profilePhoto}
                />
                <Text style={styles.userName}>Muhammad Almir</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardHeading}>Booking.com your place</Text>
                    <Text style={styles.cardDescription}>It's simple to get set up and start earning</Text>
                </View>
                <TouchableOpacity style={styles.iconCreditLink}>
                    <Image
                        style={styles.cardImage}
                        source={require('../../assets/solar-energy.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.releaseCard}>
                <Text style={styles.releaseText}>2024 Summer Release Features</Text>
                <View style={styles.newContainer}>
                    <Text style={styles.newText}>New</Text>
                </View>
            </View>

            <View style={styles.menuOptions}>
                {menuOptions.map((option, index) => (
                    <MenuButton key={index} title={option.title} onPress={option.onPress} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF6',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102C57',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#102C57',
  },
  cardDescription: {
    fontSize: 14,
    color: '#102C57',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  iconCreditLink: {
    backgroundColor: '#e1e4e8',
  },
  releaseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  releaseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#102C57',
  },
  newContainer: {
    backgroundColor: '#FFB900',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  newText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#102C57',
  },
  menuOptions: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 50,
  }
});
