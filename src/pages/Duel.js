import React from "react";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import WheelChairIcon from 'react-icons/lib/fa/wheelchair';

import Header from '../components/Header';
import Health from '../components/Health';
import WeaponDisplay from '../components/WeaponDisplay';
import AmmoDisplay from '../components/AmmoDisplay';
import Newsfeed from '../components/Newsfeed';

export class Duel extends React.Component {

  constructor(props)
  {
    super(props);

    // this bindings here
    this.fight = this.fight.bind(this);
    this.run = this.run.bind(this);
  }

  static get propTypes()
  {
      return {
          recruits: React.PropTypes.number,
          fighting: React.PropTypes.bool,
          theirHealth: React.PropTypes.number
      };
  }

  componentWillMount() 
  {
    this.props.dispatch({
      type: 'main.setBattle'
    });
  }

  componentDidUpdate()
  {
    if (!this.props.fighting) {
        browserHistory.push('/game');
    } 
  }

  fight()
  {
    this.props.dispatch({
      type: 'main.fight'
    })
  }

  run()
  {
    this.props.dispatch({
      type: 'main.run'
    })
  }

  // render
  render() {
    return (
      <div className="page duel-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <Header class='headerGame position-relative flex-hz flex-space-between'>
            <p>Duel</p>
          </Header>
          <div className="row">
            <div className="info-container">
              <p className="text-center padding-small">{`Sergeant Landman and ${this.props.recruits} recruit(s) have you surrounded!`}</p>
              <div className="info-group flex-hz flex-space-between">
                <Health />
                <span className="icon flex-hz flex-space-between padding-large col-xs-4"><WheelChairIcon />
                    <p>{this.props.theirHealth}</p>
                </span>
                <AmmoDisplay />
              </div>
              <Newsfeed />
            </div>
          </div>
          <div className="main-content flex-1 flex-vt-normal flex-space-around row">
            <Button bsSize="sm" bsStyle="primary" onClick={this.fight}>
                <p className="text-light">Fight</p>
            </Button>
            <p className="text-center padding-large">OR</p>
            <Button bsSize="sm" bsStyle="default" onClick={this.run}>
                <p className="text-dark">Flight</p>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state){
    return({
      recruits: state.main.status.fighting.recruits,
      fighting: state.main.status.fighting.active,
      theirHealth: state.main.status.fighting.health
    });
}
export default connect(mapStateToProps)(Duel);