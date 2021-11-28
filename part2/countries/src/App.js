import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ countryData }) => {
  const API_key = process.env.REACT_APP_OW_API_KEY;
  const [weatherData, setWeatherData] = useState({});

  const windDirection = (deg) => {
    if ((deg >= 348.75 && deg < 360) || (deg >= 0 && deg < 11.25)) {
      return 'N';
    } else if (deg >= 11.25 && deg < 33.75) {
      return 'NNE';
    } else if (deg >= 33.75 && deg < 56.25) {
      return 'NE';
    } else if (deg >= 56.25 && deg < 78.75) {
      return 'ENE';
    } else if (deg >= 78.75 && deg < 101.25) {
      return 'E';
    } else if (deg >= 101.25 && deg < 123.75) {
      return 'ESE';
    } else if (deg >= 123.75 && deg < 146.25) {
      return 'SE';
    } else if (deg >= 146.25 && deg < 168.75) {
      return 'SSE';
    } else if (deg >= 168.75 && deg < 191.25) {
      return 'S';
    } else if (deg >= 191.25 && deg < 213.75) {
      return 'SSW';
    } else if (deg >= 213.75 && deg < 236.25) {
      return 'SW';
    } else if (deg >= 236.25 && deg < 258.75) {
      return 'WSW';
    } else if (deg >= 258.75 && deg < 281.25) {
      return 'W';
    } else if (deg >= 281.25 && deg < 303.75) {
      return 'WNW';
    } else if (deg >= 303.75 && deg < 326.25) {
      return 'NW';
    } else if (deg >= 326.25 && deg < 348.75) {
      return 'NNW';
    } else {
      return null;
    }
  };

  useEffect(() => {
    axios
      .get(`api.openweathermap.org/data/2.5/weather?q=${countryData.capital}&appid=${API_key}&units=metric`)
      .then(response => {
        setWeatherData(response.data);
        return (
          <div>
            <h3>Weather in {countryData.name.common}</h3>
            <p><strong>temperature:</strong> {weatherData.main.temp}°C</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}.png`} alt={"weather icon"} />
            <p><strong>wind:</strong> {weatherData.wind.speed} m/s direction {windDirection(weatherData.wind.deg)}</p>
          </div>
        );
      })
  }, []);

  return null;

};

const CountryInfo = ({ countryData }) => {
  return (
    <div>
      <h2>{countryData.name.common}</h2>
      <p>capital {countryData.capital}</p>
      <p>population {countryData.population}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(countryData.languages).map(language => <li key={language} >{language}</li> )}
      </ul>
      <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} />
      <WeatherInfo countryData={countryData} />
    </div>
  );
};

const SearchResult = ({ countriesData, searchString, handleShow }) => {
  
  if (!searchString) {
    return (
      <p>Start typing the name of the country ... </p>
    );
  };

  const filteredCountries = countriesData.filter(country => (
    country.name.common.toLowerCase()
      .includes(searchString.toLowerCase())
      )
    );
  
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  };

  if (filteredCountries.length === 1) {
    return (
      <CountryInfo countryData={filteredCountries[0]} />
    );
  };

  if (filteredCountries.length === 0) {
    return (
      <p>No match found!</p>
    );
  };

  return (
    <div>
      {filteredCountries.map(country => <p key={country.ccn3}>{country.name.common} <button onClick={handleShow(country.name.common)} >show</button></p>) }
    </div>
  );
};

const App = () => {

  const [countriesData, setCountriesData] = useState([]);
  const [searchString, setSearchString] = useState('');

  const handleSearchInput = (inputEvent) => {
    setSearchString(inputEvent.target.value);
  };

  const handleShow = (countryName) => () => setSearchString(countryName);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountriesData(response.data));
  }, []);

  return (
    <>
      <div>
        find countries <input onChange={handleSearchInput} value={searchString} />
      </div>
      <SearchResult countriesData={countriesData} searchString={searchString} handleShow={handleShow} />
    </>
  );
};

export default App;