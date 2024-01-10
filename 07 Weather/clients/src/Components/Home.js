import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setdata] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      setdata(response.data);

      // Set background image based on the city
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;

      setError(null); // Reset error state on successful request
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status.
        setError(`Server responded with ${error.response.status} status.`);
      } else if (error.request) {
        // The request was made, but no response was received.
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error.
        setError(`Error setting up the request: ${error.message}`);
      }
      setdata(null); // Set weather to null on error
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      getWeather();
    }
    // Optionally, you can provide user feedback for an empty search
  };

  return (
    <div className="home-box">
      <div className="card m-0">
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search city for weather..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {data && (
            <div>
              <h2 className="city">Weather in {data.name}</h2>
              <h1 className="temp">{data.main.temp_max}°C</h1>
              <div className="flex">
                <img
                  src={`https://openweathermap.org/img/wn/${data.icon}.png`}
                  alt=""
                  className="icon"
                />
              </div>
              <div className="description m-0">
                Description: {data.weather[0].description}
              </div>
              <div className="humidity">Humidity: {data.main.humidity}%</div>
              <div className="wind">Wind speed: {data.wind.speed} km/h</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
