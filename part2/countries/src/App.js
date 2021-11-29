import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherInfo = ({ city }) => {
  const [ weatherData, setWeatherData ] = useState(null);

  useEffect(() => {
    const API_key = process.env.REACT_APP_WEATHER_API_KEY;
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${API_key}&q=${city}&aqi=no`)
      .then(response => {
        setWeatherData(
          <div>
            <h3>Weather in {city}</h3>
            <p><strong>temperature:</strong> {response.data.current.temp_c}°C</p>
            <img src={response.data.current.condition.icon} alt={"weather icon"} />
            <p><strong>wind:</strong> {response.data.current.wind_mph} mph direction {response.data.current.wind_dir}</p>
          </div>
        );
      })
  }, []);

  return weatherData;

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
      <WeatherInfo city={countryData.capital} />
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