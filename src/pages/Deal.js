import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { Button } from 'react-bootstrap';
import { Motion, spring, presets } from 'react-motion';

// Components
import Header from '../components/Header';
import FinancesDisplay from '../components/FinancesDisplay';
import Space from '../components/Space';
import UserError from '../components/UserError';
import ElementsHeader from '../components/ElementsHeader';
import DrugElement from '../components/DrugElement';

// Home page component
export class Deal extends React.Component {

  constructor(props) {
    super(props);

    this.hasDrug = false;

    this.buyDrugs = this.buyDrugs.bind(this);
    this.buyMaxDrugs = this.buyMaxDrugs.bind(this);
    this.sellDrugs = this.sellDrugs.bind(this);
    this.sellMaxDrugs = this.sellMaxDrugs.bind(this);
  }

  static get propTypes() {
    return {
      drug: React.PropTypes.object.isRequired,
      drugsCarried: React.PropTypes.array.isRequired,
      userError: React.PropTypes.bool.isRequired
    };
  }


  componentWillMount() {
    if (this.props.userError) {
      this.props.dispatch({
        type: 'main.resetUserError'
      });
    }
  }

  handleFinances(action, name, amount) {

    // Only dispatch action if we have a value, ie. field has not been left blank
    if (amount) {
      this.props.dispatch({
        type: "main." + action,
        name: name,
        quantity: amount
      });

      // reset form inputs
      [...document.getElementsByTagName("input")].forEach(function (input) {
        input.value = "";
      });
    }

    // Only dispatch if amount is not 0
    else if (amount !== 0) {
      this.props.dispatch({
        type: 'main.userErrorBlank'
      })
    }

    // Remove userError
    else {
      this.props.dispatch({
        type: 'main.resetUserError'
      })
    }
  }

  buyDrugs(event) {
    const inputAmount = Number(event.target.parentNode.previousSibling.value);
    const drugName = event.target.parentNode.getAttribute("data-name");
    this.handleFinances("buyDrugs", drugName, inputAmount);
  }

  buyMaxDrugs(event) {
    this.props.dispatch({
      type: "main.buyMax",
      name: this.props.drug.name,
      price: this.props.drug.price,
      quantity: this.props.drug.quantity
    });
  }

  sellDrugs(event) {
    const inputAmount = Number(event.target.parentNode.previousSibling.value) * -1;
    const drugName = event.target.parentNode.getAttribute("data-name");
    this.handleFinances("buyDrugs", drugName, inputAmount);
  }

  sellMaxDrugs(event) {
    this.props.dispatch({
      type: "main.sellMax",
      name: this.props.drug.name,
      id: this.props.drug.id
    });
  }

  render() {
    return (
      <div className="page deal-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <Header class='headerGame position-relative flex-hz flex-space-between'>
            <p>{this.props.drug.name}</p>
          </Header>
          <div className="row">
            <div className="info-container">
              <FinancesDisplay />
              <Space />
              <UserError />
            </div>
          </div>
          <div className="flex-1 row">
            <div className="deal flex-vt-normal flex-stretch">
              <ElementsHeader text="No." class="bg-dark" deal={true} />
              <DrugElement
                drug={this.props.drug}
                button="Buy"
                deal={true}
                handleClick={this.buyDrugs}
                handleBuyMax={this.buyMaxDrugs}
              />
            </div>
          </div>
          <div className="flex-1 row">
            <div className="deal flex-vt-normal flex-stretch">
              <ElementsHeader text="No." class="bg-dark" deal={true} />
              {
                this.props.drugsCarried.map((drug, index) => {

                  // render our matching carried drug with options to sell
                  if (Number(this.props.drug.id) === drug.name) {
                    this.hasDrug = true;
                    return (
                      <Motion
                        key={index}
                        defaultStyle={{ left: -450, opacity: 0 }}
                        style={{ left: spring(0, presets.stiff), opacity: spring(1, presets.stiff) }}>
                        {(style) =>
                          <div
                            style={{ opacity: style.opacity, left: style.left }}
                            className="position-relative">
                            <DrugElement
                              key={index}
                              button="Sell"
                              drug={drug}
                              deal={true}
                              handleClick={this.sellDrugs}
                              handleSellMax={this.sellMaxDrugs}
                            />
                          </div>
                        }
                      </Motion>
                    );
                  }
                })
              }
              {!this.hasDrug ? <p className="text-center padding-small">You aren't carrying this drug.</p> : <span></span>}
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

  // grab the correct state based on the name of the drug provided in the query string
  const drugName = state.routing.locationBeforeTransitions.query.name;
  const drugsDisplayed = state.main.status.drugsDisplayed;
  let drug;

  for (let i = 0; i < drugsDisplayed.length; i++) {
    if (drugName === drugsDisplayed[i].name) {
      drug = drugsDisplayed[i];
    }
  }

  return ({
    drug: {
      action: state.routing.locationBeforeTransitions.query.action,
      name: state.routing.locationBeforeTransitions.query.name,
      id: state.routing.locationBeforeTransitions.query.id,
      quantity: drug.quantity,
      price: drug.price
    },
    drugsCarried: state.main.currentGame.currentDrugs,
    userError: state.main.status.userError.active
  });
}
export default connect(mapStateToProps)(Deal);