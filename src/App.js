import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    description: "",
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: "",
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4bad40e943f2f526df420f44d7e0f0e8&units=metric`
    )
      .then((response) => {
        setWeatherData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          feels_like: response.data.main.feels_like,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
        });
        setDataLoaded(true);
        setError(null);
      })
      .catch((error) => {
        setError("Failed to fetch weather data. Please try again.");
        setDataLoaded(false);
      });
  };

  return (
    <div className="App">
      <h1>Current Weather</h1>
      <div className="inputs">
        <input
          type="text"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      <div className="displayDataContainer">
        {error && <p>{error}</p>}
        {dataLoaded && (
          <div className="displayData">
            <h3>Description: {weatherData.description}</h3>
            <h3>Temperature: {weatherData.temp} °C</h3>
            <h3>Feels like: {weatherData.feels_like} °C</h3>
            <h3>Minimum Temperature: {weatherData.temp_min} °C</h3>
            <h3>Maximum Temperature: {weatherData.temp_max} °C</h3>
            <h3>Humidity: {weatherData.humidity}</h3>
            <h3>Sunrise: {weatherData.sunrise}</h3>
            <h3>Sunset: {weatherData.sunset}</h3>
            <h3>Country: {weatherData.country}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
