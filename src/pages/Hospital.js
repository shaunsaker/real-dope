import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

import Header from '../components/Header';
import Health from '../components/Health';
import FinancesDisplay from '../components/FinancesDisplay';
import UserError from '../components/UserError';

// Home page component
export class Hospital extends React.Component {

  constructor(props)
  {
      super(props);

      this.buyHealth = this.buyHealth.bind(this);
  }

  static get propTypes()
  {
      return {
          health: React.PropTypes.object.isRequired,
          currentHealth: React.PropTypes.number.isRequired,
          userError: React.PropTypes.bool.isRequired
      };
  }


  buyHealth (event)
  {
    const health = {
      points: Number(event.target.getAttribute("data-points")),
      price: Number(event.target.getAttribute("data-cost"))
    }
    this.props.dispatch({
      type: 'main.buyHealth',
      health
    })
  }

  componentWillMount () 
  {    
      if (this.props.userError) {
          this.props.dispatch({
              type: 'main.resetUserError'
          });
      } 
  }

  render() {
    return (
      <div className="page hospital-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <div>
            <Header class='headerGame position-relative flex-hz flex-space-between'>
              <p>Hospital</p>
            </Header>
            <div className="row">
              <div className="info-container">
                <FinancesDisplay />
                <div className="flex-hz flex-center">
                  <Health />
                </div>
                <UserError />
              </div>
            </div>
          </div>
          <div className="button-group flex-vt-normal flex-center row">
            {
              this.props.currentHealth !== 100 ?
                this.props.health.options.map((item, index) => {
                  if ((item <= 100 - this.props.currentHealth) || index === 2) {
                    return (
                      <div key={index}>
                          <Button bsSize="sm" bsStyle={ index === 2 ? 'primary' : 'default'   } onClick={this.buyHealth} data-points={(index === 2 ? (100 - this.props.currentHealth) : item)} data-cost={this.props.health.cost}>
                              <p className={ index === 2 ? 'text-light' : 'text-dark' }>{"Heal " + item + " for R" + (index === 2 ? ((100 - this.props.currentHealth) * this.props.health.cost) : item * this.props.health.cost)}</p> 
                          </Button>
                      </div>
                    )
                  }
                })
              :
                <p className="text-center text-light">Full Health. You're good to go!</p>
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
function mapStateToProps(state){
  return {
    health: {
      options: state.main.game.options.health.options,
      cost: state.main.game.options.health.costPerPoint
    },
    currentHealth: state.main.currentGame.currentHealth,
    userError: state.main.status.userError.active
  }
}
export default connect(mapStateToProps)(Hospital);
