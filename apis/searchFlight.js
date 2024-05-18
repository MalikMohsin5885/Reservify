import axios from 'axios';

const searchFlights = async (formData) => {
    console.log(formData)
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
    
    params: {
      fromId: formData.from,
      toId: formData.to,
      departDate: formData.departureDate,
      pageNo: '1',
      adults: formData.adult,
      children: '0,17',
      currency_code: 'AED'
    },
    headers: {
      'X-RapidAPI-Key': '8857f31166mshdcdb67ac9d39494p1f60a6jsne9e4e097069b',
      'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};

export default searchFlights;
