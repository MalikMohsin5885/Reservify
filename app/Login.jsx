import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../components/CustomTextField';
import CustomButton from '../components/CustomButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Ensure correct path to your firebase config
import LottieView from 'lottie-react-native'; // Import LottieView

export default function Login() {
    const navigation = useNavigation();

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for login process

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    function handleChange(name, text) {
        setSubmit(true);
        setUserData({
            ...userData,
            [name]: text
        });
    }

    const handleSubmit = async () => {
        if (userData.email.trim() === "" || userData.password.trim() === "") {
            Alert.alert("Invalid Form", "Please fill in all fields");
            return;
        }

        setLoading(true); // Set loading to true during login process

        try {
            console.log("userData======================================")
            console.log(userData)
            const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            navigation.navigate('(tabs)') // Navigate to appropriate screen upon successful login
        } catch (error) {
            Alert.alert("Invalid credentials", "Please try again");
            console.error(error);
        } finally {
            setLoading(false); // Set loading back to false after login attempt
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/login.png')}
                    />
                </View>

                <View style={styles.middleSection}>
                    <Text style={styles.text}>Login</Text>
                    <Text style={{ fontSize: 17 }}>Please Login to continue.</Text>
                    <View style={styles.inputSection}>
                        <CustomTextField
                            placeholder={'Email'}
                            name={'email'}
                            value={userData.email}
                            onChangeText={(text) => handleChange("email", text)}
                            keyboardType="email-address"
                            icon={"mail-outline"}
                        />
                        <CustomTextField
                            placeholder={'Password'}
                            name={'password'}
                            value={userData.password}
                            onChangeText={(text) => handleChange("password", text)}
                            secureTextEntry={true} // Secure text entry for password fields
                            icon={"lock-closed"}
                        />
                    </View>
                    <View style={styles.bottomSection}>
                        <CustomButton
                            title={'Login'}
                            color={'#102C57'}
                            textColor={'#FEFAF6'}
                            onPress={handleSubmit}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 17, fontWeight: '200' }}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={{ fontSize: 17, textDecorationLine: 'underline' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {loading && (
                <View style={styles.loader}>
                    <LottieView
                        style={{ width: 300, height: 300 }}
                        source={require('../assets/lottie/loading.json')} // Replace with your actual Lottie animation source
                        autoPlay
                        loop
                    />
                </View>
            )}

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFAF6',
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
    },
    tinyLogo: {
        marginTop: '20%',
        width: 300,
        height: 300,
    },
    text: {
        fontSize: 34,
        fontWeight: '400',
    },
    middleSection: {
        padding: 20,
        paddingHorizontal: 40,
    },
    inputSection: {
        marginTop: 18,
    },
    bottomSection: {
        marginTop: 18,
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    loader: {
        flex: 1,
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: 80,
    },
});
