import axios from 'axios';

const hotelDetails = async (formdata)=> {
  const option =  {
  method: 'GET',
  url: 'https://booking-com.p.rapidapi.com/v2/hotels/details',
  params: {
    currency: 'AED',
    locale: 'en-gb',
    checkout_date: formdata.checkout_date,
    hotel_id: '1676161',
    checkin_date: formdata.checkout_date,
    adults:formdata.adults,
    room_qty:formdata.room_qty||1

  },
  headers: {
    'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  }
}
  try {
    const response = await axios.request(hotelDetails);
    console.log('Hotel Details:',response.data);
  } catch (error) {
    console.error(error);
  }
};





export default HotelDetails;