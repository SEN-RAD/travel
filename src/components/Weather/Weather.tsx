import React from 'react';
import './Weather.css';

interface Props {
	inputChange: string;
	temperature: number;
	icon: number;
	windSpeed: number;
	precipitation: number;
	description: string;
}

const Weather: React.FC<Props> = ({ inputChange, temperature, icon, windSpeed, precipitation, description }) => {

	return (
		<div id="weather_wrapper">
			<div className="weatherCard">
				<div className="currentTemp">
					<span className="temp">{temperature}&deg;</span>
					<span className="location">{inputChange}</span>
				</div>
				<div className="currentWeather">
					<span className="conditions tc">
						<img className='icon' src={require(`./icons/${icon}.png`)} alt=" " />
					</span>
					<div className='description tc'>{description}</div>
					<div className="info">
						<span className="rain">{precipitation} MM</span>
						<span className="wind">{windSpeed} KM/H</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Weather;