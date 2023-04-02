import React, {Component} from 'react';
import './Flights.css';

class Flights extends Component {
    constructor( props ) {
    super( props );
    this.ticketPrice = props.ticketPrice;
    this.airline = props.airline;
    this.duration = props.duration;
	this.route = props.route;
  }

	render(){ 

		const route = this.props.route === 1 ? 'DIRECT' :
		this.props.route > 1 ? `STOPS ${this.props.route}` : '' ;

		return (
			<div id="flights_wrapper">
				<div className="flights">
					<div className="currentFlights">
						<span className="conditions"></span>
						<div className="infoFlights">
							<span className="time">TIME</span>
                            <span className="carrier">CARRIER</span>
                            <span className="route">DIRECT/STOPS</span>
                            <span className="price">PRICE</span>
						</div>
						<div className="infoFlights2">
							<span className="time">{this.props.duration}</span>
                            <span className="carrier">{this.props.airline}</span>
                            <span className="route">{route} </span>
                            <span className="price">{this.props.ticketPrice}</span>
						</div>
					</div>
				</div>
			</div>
		);	
		
	}
}

export default Flights;