import React from "react";
import { connect } from "react-redux";
import { Link, browserHistory } from "react-router";
import { Button } from 'react-bootstrap';

// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    // this bindings here
    this.newGame = this.newGame.bind(this);
    this.continueGame = this.continueGame.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  static get propTypes() {
    return {
      apiLoading: React.PropTypes.bool.isRequired,
      uid: React.PropTypes.string,
      apiLoaded: React.PropTypes.bool.isRequired,
      authenticated: React.PropTypes.bool.isRequired
    };
  }

  newGame() {
    this.props.dispatch({
      type: 'main.newGame'
    });
    browserHistory.push('/game');
  }

  continueGame() {
    this.props.dispatch({
      type: 'main.toggleLoading'
    });
    this.props.dispatch({
      type: 'loadGame',
      uid: this.props.uid
    });
  }

  signOut() {
    this.props.dispatch({
      type: 'signOutUser'
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.apiLoaded) {
      this.props.dispatch({
        type: 'main.toggleApiLoaded'
      });
      browserHistory.push('/game');
    }

    // If the user signed out
    if (!nextProps.authenticated) {
      browserHistory.push('/login');
    }
  }

  // render
  render() {
    return (
      <div className="page home bg-primary" >
        <Header />
        <div className="flex-vt flex-center">
          <div className="buttons-wrapper">
            <div className="button-container">
              <Link to="/game">
                <Button bsSize="lg" bsStyle="primary" onClick={this.newGame}>
                  <p className="text-secondary text-light">New Game</p>
                </Button>
              </Link>
            </div>
            {this.props.drugsDisplayed ?
              (<div className="button-container">
                <Link to="/game">
                  <Button bsSize="lg" bsStyle="default">
                    <p className="text-secondary text-dark">Continue Game</p>
                  </Button>
                </Link>
              </div>)
              :
              (<div></div>)
            }
            <div className="button-container">
              <Button bsSize="lg" bsStyle="default" onClick={this.continueGame}>
                <p className="text-secondary text-dark">Load Game</p>
              </Button>
            </div>
            <div className="button-container">
              <Link to="/help">
                <Button bsSize="lg" bsStyle="default">
                  <p className="text-secondary text-dark">How to Play</p>
                </Button>
              </Link>
            </div>
            <div className="button-container">
              <Button bsSize="lg" bsStyle="default" onClick={this.signOut}>
                <p className="text-secondary text-dark">Sign Out</p>
            </Button>
            </div>
          </div>
          {this.props.apiLoading ?
            <Spinner text='' />
            : <div className='spinnerPlaceholder'></div>}
        </div>
      </div >
    );
  }
}

function MapStateToProps(state) {
  return ({
    apiLoading: state.main.status.apiLoading,
    uid: state.main.status.uid,
    apiLoaded: state.main.status.apiLoaded,
    authenticated: state.main.status.authenticated,
    drugsDisplayed: state.main.status.drugsDisplayed,
  });
}

export default connect(MapStateToProps)(Home);