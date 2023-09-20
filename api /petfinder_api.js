import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const apiSecret = import.meta.env.VITE_API_SECRET;

let accessToken = '';

async function fetchAccessToken() {
  try {
    const response = await axios.post(
      'https://api.petfinder.com/v2/oauth2/token',
      `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

async function getAnimals() {
  try {
    if (!accessToken) {
      await fetchAccessToken();
    }

    const response = await axios.get('https://api.petfinder.com/v2/animals', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
}

export { getAnimals };










