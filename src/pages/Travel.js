import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

import Header from '../components/Header';
import Location from '../components/Location';
import TravelElement from '../components/TravelElement';

// Home page component
export class Travel extends React.Component {

  constructor(props) {
    super(props);

    this.travelSuburb = this.travelSuburb.bind(this);
    this.travelCity = this.travelCity.bind(this);
  }

  static get propTypes() {
    return {
      cities: React.PropTypes.array.isRequired,
      suburbs: React.PropTypes.array.isRequired,
      currentCity: React.PropTypes.number.isRequired,
      currentSuburb: React.PropTypes.number.isRequired
    };
  }

  travelSuburb(id) {
    this.props.dispatch({
      type: 'main.travelSuburb',
      suburb: id
    });
  }

  travelCity(id) {
    this.props.dispatch({
      type: 'main.travelCity',
      city: id
    });
  }

  render() {
    return (
      <div className="page travel-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <Header class='headerGame position-relative flex-hz flex-space-between'>
            <p>Travel</p>
          </Header>
          <div className="row">
            <div className="info-container">
              <Location />
            </div>
          </div>

          <div className="taxi section-group flex-1 row flex-vt-normal flex-center">
            <p className="text-center text-dark section-header">Taxi</p>

            <div className="button-group flex-hz flex-wrap flex-center">
              {this.props.suburbs.map((suburb, index) => {
                if (this.props.currentSuburb !== index) {
                  return (
                    <TravelElement handleClick={this.travelSuburb} data={suburb} id={index} key={index} />
                  );
                }
              })}
            </div>
          </div>

          <div className="airport section-group flex-1 row flex-vt-normal flex-center">
            <p className="text-center text-dark section-header">Airport</p>

            <div className="button-group flex-hz flex-wrap flex-center">
              {this.props.cities.map((city, index) => {
                if (this.props.currentCity !== index) {
                  return (
                    <TravelElement handleClick={this.travelCity} data={city.city} id={index} key={index} />
                  );
                }
              })}
            </div>
          </div>

          <Link to="/game" className="page-footer flex-vt-normal flex-center">
            <Button bsSize="sm" bsStyle="primary">
              <p className="text-secondary text-light">Back</p>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  const cities = state.main.game.locations;
  const currentCity = state.main.currentGame.currentLocation.city;
  const currentSuburb = state.main.currentGame.currentLocation.suburb;
  const suburbs = cities[currentCity].suburbs;

  return ({
    cities,
    suburbs,
    currentCity,
    currentSuburb
  });
}
export default connect(mapStateToProps)(Travel);