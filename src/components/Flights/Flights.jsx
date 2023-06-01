import React, { Component } from 'react';
import './Flights.css';

class Flights extends Component {

	render() {

		const route = this.props.route === 1 ? 'DIRECT' :
			this.props.route > 1 ? `STOPS ${this.props.route}` : '';

		return (
			<div id="flights_wrapper">
				<div className="infoFlights">
					<h3 className="time">TIME</h3>
					<h3 className="carrier">CARRIER</h3>
					<h3 className="route">DIRECT or STOPS</h3>
					<h3 className="price">PRICE</h3>
				</div>
				<div className="infoFlights2">
					<h3 className="time">{this.props.duration}</h3>
					<h3 className="carrier1">{this.props.airline}</h3>
					<h3 className="route">{route} </h3>
					<h3 className="price">{this.props.ticketPrice}</h3>
				</div>

			</div >
		);

	}
}

export default Flights;