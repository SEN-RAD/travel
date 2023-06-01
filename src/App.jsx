import React, { Component } from 'react';
import Weather from './components/Weather/Weather';
import Flights from './components/Flights/Flights';
import SearchBox from './components/SearchBox/SearchBox';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: ' ',
      inputSubmitted: ' ',
      temperature: 0,
      windSpeed: 0,
      precipitation: 0,
      description: ' ',
      icon: 0,
      time: ' ',
      carrier: ' ',
      route: ' ',
      price: ' ',
      iataCode: ' ',
      airline: ' ',
      itinerary: ' '
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  locationUpdate = () => {
    this.setState({ inputSubmitted: this.state.input });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.setState({ inputSubmitted: this.state.input })
      this.fetchData();
    }
  };

  fetchData = () => {
    this.fetchFlightDetails();
    this.fetchWeather();
    this.locationUpdate();
  }

  fetchWeather = () => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=Zgug1Kxt7jih3YTp4Liwd27r0VKm8uGG&q=${this.state.input}`)
      .then(response => response.json())
      .then((data) => {
        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=Zgug1Kxt7jih3YTp4Liwd27r0VKm8uGG&details=true`)
          .then(response => response.json())
          .then((data) => {
            this.setState({
              temperature: data[0].Temperature.Metric.Value,
              windSpeed: data[0].Wind.Speed.Metric.Value,
              precipitation: data[0].PrecipitationSummary.Precipitation.Metric.Value,
              description: data[0].WeatherText,
              icon: data[0].WeatherIcon
            })
          })
      })
  };

  fetchFlightDetails = () => {
    fetch(`https://airlabs.co/api/v9/suggest?q=${this.state.input}&api_key=0b8bb7e6-e676-40db-a94b-03e3018e8ad4`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          iataCode: data.response.airports[0].iata_code
        }, this.fetchFlights())
      })
  };

  fetchFlights = () => {
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
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PRG&destinationLocationCode=${this.state.iataCode}&departureDate=${currentDate}&adults=1&nonStop=false&currencyCode=EUR&max=3`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.access_token}`
          }
        })
          .then(response => response.json())
          .then((data) => {
            this.setState({
              price: data.data[0].price.total,
              time: data.data[0].itineraries[0].duration,
              carrier: data.data[0].validatingAirlineCodes[0],
              itinerary: data.data[0].itineraries[0].segments.length
            }, this.carrierDetails())
          })
          .catch(err => console.error(err));
      })
  }

  carrierDetails = () => {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials&client_id=h7tSapUeqKCZ2AwIPz9VJpf5N6A5QnhX&client_secret=m52F65ZLVDtyv1jV"
    })
      .then(response => response.json())
      .then((data) => {
        fetch(`https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${this.state.carrier}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.access_token}`
          }
        })
          .then(response => response.json())
          .then((data) => {
            this.setState({
              airline: data.data[0].businessName
            })
          })
          .catch(err => console.error(err));
      })
  }

  render() {

    const {
      temperature,
      icon,
      windSpeed,
      precipitation,
      description,
      price,
      airline,
      time,
      itinerary,
      inputSubmitted
    } = this.state;

    return (
      <div className="App">
        <SearchBox
          onInputChange={this.onInputChange}
          fetchOnKeyDown={this.handleKeyPress}
          fetchOnClick={this.fetchData}
        />
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
      </div>
    );
  }
}

export default App;