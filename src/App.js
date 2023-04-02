import React, {Component} from 'react';
import './App.css';
import Weather from './Weather';
import Flights from './Flights';

class App extends Component {
  constructor() {
  super()
  this.state = {
    input: ' ',
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

  onClickFetchWeather = () => {
    fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Zgug1Kxt7jih3YTp4Liwd27r0VKm8uGG&q=${this.state.input}`)
      .then(response => response.json())
      .then((data) => {
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=Zgug1Kxt7jih3YTp4Liwd27r0VKm8uGG&details=true`)
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
  
  onClickFetchFlightDetails = () => {
    fetch(`https://airlabs.co/api/v9/suggest?q=${this.state.input}&api_key=0b8bb7e6-e676-40db-a94b-03e3018e8ad4`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          iataCode: data.response.airports[0].iata_code 
        }, this.onClickFetchFlights())
      })
  };

  onClickFetchFlights = () => {
    fetch ('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials&client_id=h7tSapUeqKCZ2AwIPz9VJpf5N6A5QnhX&client_secret=m52F65ZLVDtyv1jV"
     })
      .then(response => response.json())
      .then((data) => {
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PRG&destinationLocationCode=${this.state.iataCode}&departureDate=2023-05-02&adults=1&nonStop=false&currencyCode=EUR&max=3`, {
          method: "GET",
          headers:{
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
    fetch ('https://test.api.amadeus.com/v1/security/oauth2/token', {
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
          headers:{
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

  Fetch =()=> {
  this.onClickFetchFlightDetails();
  this.onClickFetchWeather();
  }

  render(){

    const { input, temperature, icon, windSpeed, precipitation, description, price, airline, time, itinerary  } = this.state;

    return (
      <div className="App">
          <h1> Where are you going? </h1>
          <input onChange = {this.onInputChange} placeholder='Enter city'/>
          <button onClick = {this.Fetch}> Go!</button> <br/>
          <p> Name of city is case sensitive and must be in English. E.g: London = correct. LONDON or london = not correct. </p>
        <div className='results'>
            <div className='flights'>
              <Flights 
                ticketPrice={price}
                airline={airline}
                duration={time}
                route={itinerary}
              />
            </div>
            <div className='weather'>
              <Weather 
                inputChange={input} 
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
