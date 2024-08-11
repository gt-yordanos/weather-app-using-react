import React from 'react';
import searchIcon from './assets/icons8-search-30.png'
import locationIcon from './assets/icons8-location-50.png'
import moistureIcon from './assets/icons8-moisture-50.png'
import windIcon from './assets/icons8-wind-48.png'
import cloudSunIcon from './assets/cloud-sun.png'
import './weather.css'

const Weather = () => {
  return (
    <div className='container'>

      <div className="search-box">
        <input type="text" placeholder='Search for city'/>
        <div className="icon-box">
        <img src={searchIcon} alt="" />
        </div>
      </div>

      <div className="location">
        <p><img src={locationIcon} alt="" />Addis Ababa</p>
      </div>

      <div className="main-weather">
        <img src={cloudSunIcon} alt="" />
        <p>Cloud</p>
      </div>

      <div className="temprature">
        <span>19</span>°C
      </div>

      <div className="details">

        <div className="col">
          <div className="info">
            <img src={moistureIcon} alt="" />
            <p><span>78</span>%</p>
          </div>
          <p>Moisture</p>
        </div>

        <div className="col">
          <div className="info">
            <img src={windIcon} alt="" />
            <p><span>4</span> Km/hr</p>
          </div>
          <p>Wind</p>
        </div>
        
      </div>

    </div>
  )
}

export default Weather
