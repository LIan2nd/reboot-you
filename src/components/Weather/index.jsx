import React, { useEffect, useState } from 'react'
import { getWeather } from '../../_services/getExternalAPI';
import Card from '../Card';
import useFetch from '../../hooks/useFetch';

const Weather = () => {
  const { data, loading, error } = useFetch(getWeather);
  const weather = data;
  const city = import.meta.env.VITE_WEATHER_CITY || 'Your City';

  // Fungsi untuk menentukan apakah cuaca bagus atau buruk
  const isGoodWeather = (weatherMain) => {
    const goodWeatherConditions = ['Clear', 'Clouds', 'Mist', 'Haze'];
    return goodWeatherConditions.includes(weatherMain);
  };

  // Fungsi untuk mendapatkan emoji cuaca
  const getWeatherEmoji = (weatherMain) => {
    const weatherEmojis = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Haze': '🌫️',
      'Fog': '🌫️'
    };
    return weatherEmojis[weatherMain] || '🌤️';
  };

  // Fungsi untuk mendapatkan motivasi berdasarkan cuaca
  const getWeatherMotivation = (weatherMain) => {
    if (isGoodWeather(weatherMain)) {
      return {
        title: "Bagus, ga sih cuacanyaa??",
        message: "Let's go, keluar, cari energi buat kerjain task n routine yang ada! Jangan sia-siainn cuaca ini.",
        action: "Saatnya mengoutdoor!",
      };
    } else {
      return {
        title: "Tidak ada cuaca buruk!",
        message: "Saatnya mengchill di indoor. Fokus task n routine yang bisa dilakukan di indoor.",
        action: "Saatnya mengproduktif di dalamm",
      };
    }
  };

  return (
    <Card title="Weather Today">
      <div className="space-y-4">
        {error && (
          <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-center">
              <p className="text-red-600 font-medium">⚠️ Gagal memuat data cuaca</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Memuat data cuaca...</p>
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            {/* Weather Display */}
            <div className={`bg-gradient-to-r rounded-xl p-6 text-center border shadow-my shadow-black dark:shadow-white`}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className={`text-sm mb-1`}>
                    📍 {city}
                  </p>
                  <h3 className={`text-2xl font-bold mb-1`}>
                    {Math.round(weather.main.temp)}°C
                  </h3>
                  <p className={`text-sm`}>
                    Feels like {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-4xl mb-2">
                    {getWeatherEmoji(weather.weather[0].main)}
                  </div>
                  <p className={`text-lg font-medium`}>
                    {weather.weather[0].main}
                  </p>
                  <p className={`text-sm capitalize`}>
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>

              {/* Additional Weather Info */}
              <div className="flex justify-between mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className={`text-xs`}>Humidity</p>
                  <p className={`text-sm font-medium`}>
                    {weather.main.humidity}%
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs`}>Pressure</p>
                  <p className={`text-sm font-medium`}>
                    {weather.main.pressure} hPa
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs`}>Visibility</p>
                  <p className={`text-sm font-medium`}>
                    {weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Motivation Section */}
            <div className={`rounded-lg p-4`}>
              <h4 className={`font-bold text-lg mb-2`}>
                {getWeatherMotivation(weather.weather[0].main).title}
              </h4>
              <p className={`text-sm mb-3 opacity-90`}>
                {getWeatherMotivation(weather.weather[0].main).message}
              </p>
              <div className={`inline-flex items-center px-3 py-2 rounded-full text-xs text-white dark:text-black font-medium bg-black/50 dark:bg-white/50`}>
                {getWeatherMotivation(weather.weather[0].main).action}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}

export default Weather