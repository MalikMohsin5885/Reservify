import axios from 'axios'
import { app } from "../app/firebase";
import { getDatabase, ref, onValue, set, remove, get, child, update } from "firebase/database";

import { useState } from 'react';
const useHotelHook = () => {
    const [images, setImg] = useState([])
    const [favorite, setFavorite] = useState([])
    const [listing, setListing] = useState([])
    const search = async (formData) => {
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
            params: {
                checkout_date: formData.check_out_date,
                order_by: 'popularity',
                filter_by_currency: 'AED',
                room_number: formData.room_qty,
                dest_id: '-2602512',
                dest_type: 'city',
                adults_number: formData.adults,
                checkin_date: formData.check_in_date,
                locale: 'en-gb',
                units: 'metric',
                include_adjacency: 'true',
                children_number: '2',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                children_ages: '5,0'
            },
            headers: {
                'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data; // Return the response data for further processing
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch hotels');
        }
    }

    const dummy = async () => {
        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
            params: {
                checkout_date: '2024-07-28',
                order_by: 'popularity',
                filter_by_currency: 'AED',
                room_number: '1',
                dest_id: '-2602512',
                dest_type: 'city',
                adults_number: '1',
                checkin_date: '2024-07-4',
                locale: 'en-gb',
                units: 'metric',
                include_adjacency: 'true',
                children_number: '2',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                children_ages: '5,0'
            },
            headers: {
                'X-RapidAPI-Key': 'e1ad799182mshb4f50555b8fe85ap1bf88fjsn0a6335d2a042',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log("Hook called");
            console.log("=====================================================");
            console.log();
            console.log()
            console.log(response.data.result[0].hotel_id)
            console.log()
            console.log()
            setListing(response.data.result)
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch hotels');
        }
    }

    const fetchImages = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, 'images');
        console.log("data receiving")
        onValue(dbRef, (snapshot) => {
            let data = snapshot.val();
            console.log(data);
            setImg(data)
        })
    };

    const addWishList = async (wishedObj, userId) => {
        try {
            console.log("wishedObj", wishedObj);
            const db = getDatabase(app);
            const dbRef = ref(db, `users/${userId}/wishlist`);

            // Here we assume wishedObj has a unique identifier you can use as the key
            const newWishRef = ref(db, `users/${userId}/wishlist/${wishedObj.hotel_id}`);
            await set(newWishRef, wishedObj);
            console.log("Wishlist updated successfully");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const removeWishList = async (hotelId, userId) => {
        try {
            console.log("Removing wishlist item:", hotelId);
            const db = getDatabase(app);
            const wishRef = ref(db, `users/${userId}/wishlist/${hotelId}`);
            await remove(wishRef);
            console.log("Wishlist item removed successfully");
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const isHotelInWishlist = async (hotelId, userId) => {
        try {
            const db = getDatabase(app);
            const wishlistRef = ref(db, `users/${userId}/wishlist/${hotelId}`);
            const snapshot = await get(wishlistRef);
            return snapshot.exists();
        } catch (error) {
            console.error("Error checking wishlist status:", error);
            return false;
        }
    };

    const getWishLists = async (userId) => {

        const db = getDatabase(app);
        const dbRef = ref(db, `users/${userId}/wishlist`);
        console.log("data receiving");
        onValue(dbRef, (snapshot) => {
          let data = snapshot.val();
          console.log(data);
          setFavorite(data); // This will update the state and cause a re-render
        });
      };

    return {
        search,
        dummy,
        fetchImages,
        addWishList,
        removeWishList,
        isHotelInWishlist,
        getWishLists,
        images,
        listing,
        favorite
    };
};

export default useHotelHook;