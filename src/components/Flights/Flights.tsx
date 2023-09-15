import React from 'react';
import './Flights.css';

interface Props {
	route: number;
	duration: string;
	airline: string;
	ticketPrice: number;
}

const Flights: React.FC<Props> = ({ route, duration, airline, ticketPrice }) => {
	const routeLength = route === 1 ? 'DIRECT' :
		route > 1 ? `STOPS: ${route}` : '';

	return (
		<div id="flights_wrapper">
			<div className="infoFlights">
				<h3 className="time">DURATION</h3>
				<h3 className="carrier">CARRIER</h3>
				<h3 className="route">DIRECT or STOPS</h3>
				<h3 className="price">PRICE</h3>
			</div>
			<div className="infoFlights2">
				<h3 className="time">{duration}</h3>
				<h3 className="carrier1">{airline}</h3>
				<h3 className="route">{routeLength} </h3>
				<h3 className="price">{ticketPrice}</h3>
			</div>
		</div >
	);
}

export default Flights;