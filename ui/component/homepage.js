// import '../assets/styles/style.css';
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from 'semantic-ui-react';
import Weather from './weather';
import Forecast from './forecast';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';

export default function HomePage() {
  
  const [lat, setLat] = useState(12.9728884);
  const [area, setArea] = useState('');
  const [long, setLong] = useState(79.1586721);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   setLat(position.coords.latitude);
      //   setLong(position.coords.longitude);
      // });
    
      getWeather(lat, long)
      .then(weather => {
        
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

      getForecast(lat, long)
        .then(data => {
          
          setForecast(data);
          setError(null);
        })
        .catch(err => {
          setError(err.message);
        });

  }, [lat,long,error])

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }

  const getWeather = async(lat, long) => {
    return fetch(
      `${process.env.APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(weather => {
        if (Object.entries(weather).length) {
          const mappedData = mapDataToWeatherInterface(weather);
          return mappedData;
        }
      });
  }
  
  const getForecast = async (lat, long) => {
    return fetch(
      `${process.env.APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(forecastData => {
        if (Object.entries(forecastData).length) {
          return forecastData.list
            .filter(forecast => forecast.dt_txt.match(/09:00:00/))
            .map(mapDataToWeatherInterface);
        }
      });
  }

  const handleChange = (e) => {
    setArea(event.target.value);
  }

  const handleSearch = async () => {
    return fetch(
      `${process.env.GEO_API_URL}?q=${area}&APPID=${process.env.APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(areaMetaData => {
        if (Object.entries(areaMetaData).length) {
          setLat(areaMetaData[0].lat);
          setLong(areaMetaData[0].lon);
        }
      });
  }

  function mapDataToWeatherInterface(data) {
    const mapped = {
      date: data.dt * 1000, // convert from seconds to milliseconds
      description: data.weather[0].main,
      temperature: Math.round(data.main.temp),
      main: data.main,
      weather: data.weather,
      sys: data.sys,
      name: data.name,
    };
  
    // Add extra properties for the five day forecast: dt_txt, icon, min, max
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
  
    return mapped;
  }
  
  return (
    <div className="App">
    <div style={{margin: "2rem auto", width:"fit-content"}}>
      <TextField id="standard-basic" label="Search" variant="standard" value={area} onChange={handleChange}/>
      <Button variant="contained" onClick={handleSearch} sx={{marginLeft: "1rem", marginTop: "0.7rem"}}> Search</Button>
    </div>
      {(weatherData?.length != 0 && forecast?.length != 0)  ? (
        <div>
          <Weather weatherData={weatherData}/>
          <Forecast forecast={forecast} weatherData={weatherData}/>
        </div>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

