import React, {Component} from 'react';
import './Weather.css';

class Weather extends Component {
    constructor( props ) {
    super( props );
    this.inputChange = props.inputChange;
	this.temperature = props.temperature;
	this.icon = props.icon;
	this.windSpeed = props.windSpeed;
	this.precipitation = props.precipitation;
	this.description = props.description;
  }

	render(){ 
		return (
			<div id="weather_wrapper">
				<div className="weatherCard">
					<div className="currentTemp">
						<span className="temp">{this.props.temperature}&deg;</span>
						<span className="location">{this.props.inputChange}</span>
					</div>
					<div className="currentWeather">
						<span className="conditions"><img src={require(`./icons/${this.props.icon}.png`)} alt=" "/> </span>
						<span>{this.props.description}</span>
						<div className="info">
							<span className="rain">{this.props.precipitation} MM</span>
							<span className="wind">{this.props.windSpeed} KM/H</span>
						</div>
					</div>
				</div>
			</div>
		);	
	}
}
		

export default Weather;