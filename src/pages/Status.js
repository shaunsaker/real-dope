import React from "react";
import { connect } from 'react-redux';
import { Link, browserHistory } from "react-router";
import { Button } from 'react-bootstrap';

// Components
import Header from '../components/Header';

export class Status extends React.Component {

  constructor(props) {
    super(props);

    this.resetDays = this.resetDays.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  static get propTypes() {
    return {
      win: React.PropTypes.bool.isRequired
    };
  }


  resetDays() {
    this.props.dispatch({
      type: 'main.resetDays'
    });
  }

  resetGame() {
    this.props.dispatch({
      type: 'main.newGame'
    });
    browserHistory.push('/game');
  }

  render() {
    return (
      <div className="page status-page bg-primary">
        <div className="flex-vt flex-center">
          <Header class='headerGame position-fixed'></Header>
          <h3 className="text-medium">You {this.props.win ? "Win" : "Lose"}</h3>
          <div className="button-group flex-vt-normal">
            {
              this.props.win ?
                <Link to="/game">
                  <Button bsSize="lg" bsStyle="default" onClick={this.resetDays}>
                    <p className="text-dark">Continue Game</p>
                  </Button>
                </Link>
                :
                <div></div>
            }
            <Link to="/game">
              <Button bsSize="lg" bsStyle="primary" onClick={this.resetGame}>
                <p className="text-light">New Game</p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  return ({
    win: state.main.status.gameEnd.win
  });
}
export default connect(mapStateToProps)(Status);