import React, { useRef, useState } from 'react';
import searchIcon from './assets/icons8-search-30.png';
import locationIcon from './assets/location.png';
import moistureIcon from './assets/moisture.png';
import windIcon from './assets/wind.png';
import cloudSunIcon from './assets/cloud-sun.png';
import sunIcon from './assets/sun.png';
import rainIcon from './assets/rain.png';
import cloudIcon from './assets/cloud.png';
import './weather.css';

const Weather = () => {
  const apiKey = "e86e83663143a91adb953b7006a37d6d";
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  async function updateWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.cod === 200) {
        setWeatherData(result);
        setError(null); // Clear any previous errors
      } else {
        setWeatherData(null);
        setError(result.message); // Set the error message returned by the API
      }
      console.log(result);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An unexpected error occurred.");
    }
  }

  return (
    <div className='container'>
      <div className="search-box">
        <input type="text" placeholder='Search for city' ref={inputRef} />
        <div className="icon-box">
          <img src={searchIcon} alt="search" onClick={() => updateWeather(inputRef.current.value)} />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <>
          <div className="location">
            <p><img src={locationIcon} alt="location" />{weatherData.name}</p>
          </div>

          <div className="main-weather">
            <img src={weatherIcon} alt="weather icon" />
            <p>{weatherData.weather[0].main}</p>
          </div>

          <div className="temperature">
            <span>{Math.round(weatherData.main.temp)}</span>°C
          </div>

          <div className="details">
            <div className="col">
              <div className="info">
                <img src={moistureIcon} alt="moisture" />
                <p><span>{weatherData.main.humidity}</span>%</p>
              </div>
              <p className='type'>Moisture</p>
            </div>

            <div className="col">
              <div className="info">
                <img src={windIcon} alt="wind" />
                <p><span>{Math.round(weatherData.wind.speed)}</span> Km/hr</p>
              </div>
              <p className='type'>Wind</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
