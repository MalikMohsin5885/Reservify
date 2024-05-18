import axios from 'axios';

const searchHotelDestination = async () => {
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
    params: { query: 'man' },
    headers: {
      'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; // If you want to return the data for further processing
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to handle it outside
  }
};

export default searchHotelDestination;
