import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import CustomButton from '../components/CustomButton';


const animations = [
    {
        id: '1',
        title: 'girl walking on grass',
        src: require('../assets/lottie/girl.json')
    },
    {
        id: '2',
        title: 'girl walking on grass',
        src: require('../assets/lottie/girl2.json')
    },
]

export default function Onboarding() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <View style={styles.center}>
                <View style={styles.animation}>
                    <LottieView style={{ flex: 1 }} source={require('../assets/lottie/girl4.json')} autoPlay loop />
                </View>
            </View>

            <View style={styles.bottom}>

                <CustomButton
                    title={'GET STARTED'}
                    color={'#FEFAF6'}
                    textColor={'#102C57'}
                    onPress={() => {
                        navigation.navigate('Login');
                        // navigation.navigate('(tabs)');

                    }}
                />
            </View>


        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102C57',

    },
    animation: {
        height: 400,
        aspectRatio: 1,
        marginTop: 70,
        // backgroundColor: 'red',
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:20,
        // backgroundColor: 'yellow',

    },
    center: {
        flex: 7,
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});