import React from 'react';
import Card from '../Card';
import useFetch from '../../hooks/useFetch';
import { getWeather } from '../../_services/getExternalAPI';

/**
 * Weather component that displays current weather conditions and motivational messages
 * Features:
 * - Real-time weather data from API
 * - Weather-based motivational messages
 * - Responsive design with weather emojis
 * - Error handling and loading states
 */
const Weather = () => {
  const { data: weather, loading, error } = useFetch(getWeather);
  const city = import.meta.env.VITE_WEATHER_CITY || 'Your City';

  // Weather condition constants
  const WEATHER_CONDITIONS = {
    GOOD: ['Clear', 'Clouds', 'Mist', 'Haze'],
    EMOJIS: {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Haze': '🌫️',
      'Fog': '🌫️'
    },
    DEFAULT_EMOJI: '🌤️'
  };

  /**
   * Determines if the weather is good based on current conditions
   * @param {string} weatherMain - Main weather condition
   * @returns {boolean} True if weather is good
   */
  const isGoodWeather = (weatherMain) => (
    WEATHER_CONDITIONS.GOOD.includes(weatherMain)
  );

  /**
   * Gets appropriate emoji for current weather
   * @param {string} weatherMain - Main weather condition
   * @returns {string} Weather emoji
   */
  const getWeatherEmoji = (weatherMain) => (
    WEATHER_CONDITIONS.EMOJIS[weatherMain] || WEATHER_CONDITIONS.DEFAULT_EMOJI
  );

  /**
   * Gets motivational message based on weather
   * @param {string} weatherMain - Main weather condition
   * @returns {object} Motivation object with title, message and action
   */
  const getWeatherMotivation = (weatherMain) => (
    isGoodWeather(weatherMain)
      ? {
        title: "Bagus, ga sih cuacanyaa??",
        message: "Let's go, keluar, cari energi buat kerjain task n routine yang ada! Jangan sia-siainn cuaca ini.",
        action: "Saatnya mengoutdoor!",
      }
      : {
        title: "Tidak ada cuaca buruk!",
        message: "Saatnya mengchill di indoor. Fokus task n routine yang bisa dilakukan di indoor.",
        action: "Saatnya mengproduktif di dalamm",
      }
  );

  return (
    <Card title="Weather Today">
      <div className="space-y-4">
        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-center">
              <p className="text-red-600 font-medium">⚠️ Gagal memuat data cuaca</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Memuat data cuaca...</p>
            </div>
          </div>
        )}

        {/* Weather Data Display */}
        {!loading && !error && weather && (
          <>
            {/* Main Weather Card */}
            <div className={`bg-gradient-to-r rounded-xl p-6 text-center border shadow-my shadow-black dark:shadow-white`}>
              <div className="flex items-center justify-between">
                {/* Location and Temperature */}
                <div className="text-left">
                  <p className="text-sm mb-1">📍 {city}</p>
                  <h3 className="text-2xl font-bold mb-1">
                    {Math.round(weather.main.temp)}°C
                  </h3>
                  <p className="text-sm">
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>

                {/* Weather Icon and Description */}
                <div className="text-right">
                  <div className="text-4xl mb-2">
                    {getWeatherEmoji(weather.weather[0].main)}
                  </div>
                  <p className="text-lg font-medium">
                    {weather.weather[0].main}
                  </p>
                  <p className="text-sm capitalize">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>

              {/* Weather Metrics */}
              <div className="flex justify-between mt-4 pt-4 border-t">
                {[
                  { label: 'Humidity', value: `${weather.main.humidity}%` },
                  { label: 'Pressure', value: `${weather.main.pressure} hPa` },
                  {
                    label: 'Visibility',
                    value: weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'
                  }
                ].map((metric, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs">{metric.label}</p>
                    <p className="text-sm font-medium">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation Section */}
            <div className="rounded-lg p-4">
              {(() => {
                const motivation = getWeatherMotivation(weather.weather[0].main);
                return (
                  <>
                    <h4 className="font-bold text-lg mb-2">{motivation.title}</h4>
                    <p className="text-sm mb-3 opacity-90">{motivation.message}</p>
                    <div className="inline-flex items-center px-3 py-2 rounded-full text-xs text-white dark:text-black font-medium bg-black/50 dark:bg-white/50">
                      {motivation.action}
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default Weather;