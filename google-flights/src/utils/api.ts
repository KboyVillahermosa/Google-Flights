import axios from 'axios';

const API_KEY = 'a2b3ac6ea9mshce0962c22bd5e71p19e3a9jsn6345e66f16a4';  // Replace with your RapidAPI key
const BASE_URL = 'https://sky-scrapper.p.rapidapi.com';

export const fetchAirports = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/flights/searchAirport`, {
      params: { query },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
};

export const fetchFlights = async (originSkyId: string, destinationSkyId: string, date: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/flights/searchFlights`, {
      params: {
        originSkyId,
        destinationSkyId,
        date,
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};
