import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

import Header from '../components/Header';
import FinancesDisplay from '../components/FinancesDisplay';
import ClothingDisplay from '../components/ClothingDisplay';
import Space from '../components/Space';
import ElementsHeader from '../components/ElementsHeader';
import ClothingElement from '../components/ClothingElement';
import UserError from '../components/UserError';

// Home page component
export class Clothing extends React.Component {
  constructor(props) {
    super(props);

    this.buyClothing = this.buyClothing.bind(this);
  }

  static get propTypes() {
    return {
      clothing: React.PropTypes.array.isRequired,
      currentClothing: React.PropTypes.number.isRequired,
      userError: React.PropTypes.bool.isRequired
    };
  }


  buyClothing(event) {
    const clothing = {
      name: event.target.getAttribute("data-name"),
      id: Number(event.target.getAttribute("data-id")),
      space: Number(event.target.getAttribute("data-space")),
      price: Number(event.target.getAttribute("data-price"))
    }
    this.props.dispatch({
      type: 'main.buyClothing',
      clothing
    })
  }

  componentWillMount() {
    if (this.props.userError) {
      this.props.dispatch({
        type: 'main.resetUserError'
      });
    }
  }

  render() {
    return (
      <div className="page clothing-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <Header class='headerGame position-relative flex-hz flex-space-between'>
            <p>Clothing</p>
          </Header>
          <div className="info-container row">
            <FinancesDisplay />
            <div className="flex-hz flex-space-between">
              <ClothingDisplay />
              <Space />
            </div>
            <UserError />
          </div>
          <div className="flex-1 flex-vt-normal flex-stretch row">
            <ElementsHeader text="Space" class="bg-dark"/> 
            {
              this.props.clothing.map((item, index) => {
                if (index !== this.props.currentClothing) {

                  // Only return the items the player is not wearing
                  return (
                    <ClothingElement name={item.name} space={item.space} price={item.price} key={index} id={index} handleClick={this.buyClothing} />
                  )
                }
              })
            }
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
  return ({
    clothing: state.main.game.clothing,
    currentClothing: state.main.currentGame.currentSpace.clothing,
    userError: state.main.status.userError.active
  });
}
export default connect(mapStateToProps)(Clothing);