import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';
import { Motion, spring, presets } from 'react-motion';

import Header from '../components/Header';
import FinancesDisplay from '../components/FinancesDisplay';
import WeaponDisplay from '../components/WeaponDisplay';
import ElementsHeader from '../components/ElementsHeader';
import WeaponElement from '../components/WeaponElement';
import AmmoElement from '../components/AmmoElement';
import UserError from '../components/UserError';

// Home page component
export class Guns extends React.Component {

  constructor(props) {
    super(props);

    this.buyWeapon = this.buyWeapon.bind(this);
    this.buyAmmo = this.buyAmmo.bind(this);
    this.buyMaxAmmo = this.buyMaxAmmo.bind(this);
  }

  static get propTypes() {
    return {
      weapons: React.PropTypes.array.isRequired,
      currentWeapon: React.PropTypes.string.isRequired,
      currentWeaponIndex: React.PropTypes.number.isRequired,
      ammo: React.PropTypes.object.isRequired,
      userError: React.PropTypes.bool.isRequired
    };
  }


  buyWeapon(event) {
    const weapon = {
      name: event.target.getAttribute("data-name"),
      id: Number(event.target.getAttribute("data-id")),
      damage: Number(event.target.getAttribute("data-damage")),
      price: Number(event.target.getAttribute("data-price"))
    }
    this.props.dispatch({
      type: 'main.buyWeapon',
      weapon
    })
  }

  buyAmmo(event) {
    const inputAmount = Number(event.target.parentNode.previousSibling.value);
    this.props.dispatch({
      type: 'main.buyAmmo',
      quantityRequested: inputAmount
    })
  }

  buyMaxAmmo(event) {
    this.props.dispatch({
      type: 'main.buyMaxAmmo'
    })
  }

  componentWillMount() {
    if (!this.props.userError) {
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
            <p>Guns</p>
          </Header>
          <div className="row">
            <div className="info-container">
              <FinancesDisplay />
              <WeaponDisplay />
              <UserError />
            </div>
          </div>
          <div className="flex-1">
            <div className="weapons flex-vt-normal flex-stretch row">
              <ElementsHeader text="Damage" icon="bolt" class="bg-dark"/>
              {
                this.props.weapons.map((item, index) => {
                  if (item.name !== this.props.currentWeapon) {

                    // Only return the items the player is not using
                    return (
                      <WeaponElement name={item.name} damage={item.damage} price={item.price} key={index} id={index} handleClick={this.buyWeapon} />
                    )
                  }
                })
              }
            </div>
            <div className="ammo flex-vt-normal flex-stretch row">
              <ElementsHeader text="No." deal={true} icon="bullet" class="bg-dark"/>
              {
                this.props.weapons.map((item, index) => {
                  if (item.name === this.props.currentWeapon && item.name !== 'Fists' && item.name !== 'Baseball Bat') {

                    // Only return the weapon the player is using (but not if they're using Fists or a Baseball Bat)
                    return (
                      <Motion
                        key={index}
                        defaultStyle={{ left: -450, opacity: 0 }}
                        style={{ left: spring(0, presets.stiff), opacity: spring(1, presets.stiff) }}>
                        {(style) =>
                          <div 
                            style={{ opacity: style.opacity, left: style.left }}
                            className="position-relative">
                            <AmmoElement name={item.name} ammo={this.props.ammo} key={index} handleClick={this.buyAmmo} handleBuyMax={this.buyMaxAmmo} />
                            />
                          </div>
                        }
                      </Motion>
                    )
                  }
                })
              }
              {
                this.props.currentWeapon === 'Fists' || this.props.currentWeapon === 'Baseball Bat' ?
                  <p className="text-center padding-small">You don't need any ammo.</p>
                  :
                  <div></div>
              }
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
  const weaponIndex = state.main.currentGame.currentWeapon.name;
  const weaponName = state.main.game.weapons[weaponIndex].name;

  return ({
    weapons: state.main.game.weapons,
    currentWeapon: weaponName,
    currentWeaponIndex: weaponIndex,
    ammo: state.main.game.options.ammo,
    userError: state.main.status.userError.active
  });
}
export default connect(mapStateToProps)(Guns);