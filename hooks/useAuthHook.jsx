import { getDatabase, ref, set, push, get, query, orderByChild, equalTo } from 'firebase/database';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../app/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthHook = () => {
    const signUp = async (formData) => {
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(async () => {
                    const db = getDatabase(app);
                    const dbRef = ref(db, 'users');
                    const newPostRef = push(dbRef);
                    await set(newPostRef, formData);
                    console.log('User registered successfully',formData);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log('Error Message == ', errorMessage)
                });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    return {
        signUp
    };
};

export default useAuthHook;
