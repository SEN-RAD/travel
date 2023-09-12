import React, { useState, useEffect } from 'react';
import Weather from './components/Weather/Weather';
import Flights from './components/Flights/Flights';
import SearchBox from './components/SearchBox/SearchBox';
import './App.css';
import CircularProgress from '@mui/material/CircularProgress';


const App = () => {

  const [input, setinput] = useState('');
  const [inputSubmitted, setinputSubmitted] = useState('');
  const [inputError, setinputError] = useState('');
  const [temperature, settemperature] = useState(0);
  const [windSpeed, setwindSpeed] = useState(0);
  const [precipitation, setprecipitation] = useState(0);
  const [description, setdescription] = useState('');
  const [icon, seticon] = useState(0);
  const [time, settime] = useState('');
  const [carrier, setcarrier] = useState('');
  const [price, setprice] = useState('');
  const [iataCode, setiataCode] = useState('');
  const [airline, setairline] = useState('');
  const [itinerary, setitinerary] = useState('');
  const [visible, setvisible] = useState(false);

  const onInputChange = (event) => {
    setinput(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setinputSubmitted(input);
      setvisible(true);
      fetchData();
    }
  };

  const fetchData = () => {
    fetchFlightDetails();
    fetchWeather();
    setinputSubmitted(input);
    setvisible(true);
  }

  const fetchWeather = () => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=Zgug1Kxt7jih3YTp4Liwd27r0VKm8uGG&q=${input}`)
      .then(response => response.json())
      .then((data) => {
        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=Zgug1Kxt7jih3YTp4Liwd27r0VKm8uGG&details=true`)
          .then(response => response.json())
          .then((data) => {
            settemperature(data[0].Temperature.Metric.Value);
            setwindSpeed(data[0].Wind.Speed.Metric.Value);
            setprecipitation(data[0].PrecipitationSummary.Precipitation.Metric.Value);
            setdescription(data[0].WeatherText);
            seticon(data[0].WeatherIcon);
          })
      })
  };

  const fetchFlightDetails = () => {
    fetch(`https://airlabs.co/api/v9/suggest?q=${input}&api_key=0b8bb7e6-e676-40db-a94b-03e3018e8ad4`)
      .then(response => response.json())
      .then((data) => {
        setiataCode(data.response.airports[0].iata_code);
        console.log(iataCode);
        setinputError('');
      })
      .catch(error => {
        console.error('Error fetching flight details:', error);
        setinputError('An error occurred. Please check for spelling mistakes or an invalid city name.');
      });
  };

  useEffect(() => {
    if (iataCode && iataCode !== prevIataCode) {
      fetchFlights();
      prevIataCode = iataCode;
    }
  }, [iataCode]);

  let prevIataCode = null;

  const fetchFlights = () => {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials&client_id=h7tSapUeqKCZ2AwIPz9VJpf5N6A5QnhX&client_secret=m52F65ZLVDtyv1jV"
    })
      .then(response => response.json())
      .then((data) => {
        const currentDate = new Date().toISOString().split('T')[0];
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PRG&destinationLocationCode=${iataCode}&departureDate=${currentDate}&adults=1&nonStop=false&currencyCode=EUR&max=3`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.access_token}`
          }
        })
          .then(response => response.json())
          .then((data) => {
            setprice(data.data[0].price.total);
            settime(data.data[0].itineraries[0].duration);
            setcarrier(data.data[0].validatingAirlineCodes[0]);
            setitinerary(data.data[0].itineraries[0].segments.length);
          })
          .catch(err => console.error(err));
      })
  }

  useEffect(() => {
    if (carrier && carrier !== prevCarrier) {
      carrierDetails();
      prevCarrier = carrier;
    }
  }, [carrier]);

  let prevCarrier = null;

  const carrierDetails = () => {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials&client_id=h7tSapUeqKCZ2AwIPz9VJpf5N6A5QnhX&client_secret=m52F65ZLVDtyv1jV"
    })
      .then(response => response.json())
      .then((data) => {
        fetch(`https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${carrier}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.access_token}`
          }
        })
          .then(response => response.json())
          .then((data) => {
            setairline(data.data[0].businessName);
          })
          .catch(err => console.error(err));
      })
  }



  return (
    <div className="App">
      <SearchBox
        onInputChange={onInputChange}
        fetchOnKeyDown={handleKeyPress}
        fetchOnClick={fetchData}
      />
      <p className='flex justify-center red b f3'>{inputError}</p>
      {visible ? (
        !price || !airline || !time || !itinerary ? (
          <div className='tc'>
            <CircularProgress />
            <p className='white'>Loading info...</p>
          </div>
        ) : (
          <div className='flex justify-center'>
            <div className='w-50 pr5'>
              <Flights
                ticketPrice={price}
                airline={airline}
                duration={time}
                route={itinerary}
              />
            </div>
            <div className='w-50 pl5'>
              <Weather
                inputChange={inputSubmitted}
                temperature={temperature}
                icon={icon}
                windSpeed={windSpeed}
                precipitation={precipitation}
                description={description}
              />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default App;