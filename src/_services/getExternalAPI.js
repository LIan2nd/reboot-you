import axios from 'axios';
import { memeURL, quotesURL, weatherURL } from "./API";

const getMemes = async () => {
  try {
    const { data } = await axios.get(memeURL);
    return data.data.memes;
  } catch (error) {
    throw new Error("Error fetching memes: " + error.message);
  }
}

const getQuotes = async () => {
  try {
    const { data } = await axios.get(quotesURL);
    return data;
  } catch (error) {
    throw new Error("Error fetching quotes: " + error.message);
  }
}

const getWeather = async () => {
  try {
    const { data } = await axios.get(weatherURL, {
      params: {
        q: import.meta.env.VITE_WEATHER_CITY,
        units: 'metric',
        appid: import.meta.env.VITE_WEATHER_API_KEY
      }
    });
    return data;
  } catch (error) {
    throw new Error("Error fetching weather data: " + error.message);
  }
}
export { getMemes, getQuotes, getWeather };