import React, { useRef, useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader'; 
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
  const [loading, setLoading] = useState(false); // Define the loading state

  async function updateWeather(city = null, lat = null, lon = null) {
    setLoading(true); // Start loading
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;
    
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `&q=${city}`;
    } else {
      setError("No city or coordinates provided");
      setLoading(false); // Stop loading
      return;
    }
  
    try {
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.cod === 200) {
        setWeatherData(result);
        setError(null); // Clear any previous errors
      } else {
        setError(result.message); // Set the error message returned by the API, but keep the previous weather data
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  }
  

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateWeather(null, latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Unable to retrieve your location.");
      }
    );
  }, []);

  let weatherIcon;
  if (weatherData) {
    switch (weatherData.weather[0].main) {
      case 'Rain':
        weatherIcon = rainIcon;
        break;
      case 'Clouds':
        weatherIcon = cloudIcon;
        break;
      case 'Clear':
        weatherIcon = sunIcon;
        break;
      default:
        weatherIcon = cloudSunIcon; // Use a default icon like partly cloudy
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
  
      {loading ? ( 
        <div className="loading-spinner">
          <BarLoader color="#000" size={50} /> {/* Spinner here */}
        </div>
      ) : weatherData && (
        <>
          <div className="location">
            <p><img src={locationIcon} alt="location" />{weatherData.name}</p>
          </div>
  
          <div className="main-weather">
            <img src={weatherIcon} alt="" />
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
