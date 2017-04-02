import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// Components
import Header from '../components/Header';
import Location from '../components/Location';
import Days from '../components/Days';
import FinancesDisplay from '../components/FinancesDisplay';
import WeaponDisplay from '../components/WeaponDisplay';
import AmmoDisplay from '../components/AmmoDisplay';
import Health from '../components/Health';
import Space from '../components/Space';
import ClothingDisplay from '../components/ClothingDisplay';
import Newsfeed from '../components/Newsfeed';
import Drugs from '../components/Drugs';
import Footer from '../components/Footer';

export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.saveGame = this.saveGame.bind(this);
        this.state = {
            loading: false
        }
    }

    static get propTypes() {
        return {
            uid: React.PropTypes.string,
            currentGame: React.PropTypes.object.isRequired,
            drugsDisplayed: React.PropTypes.array,
            apiLoading: React.PropTypes.bool.isRequired,
            apiMessage: React.PropTypes.string,
            travelled: React.PropTypes.bool,
            userError: React.PropTypes.bool,
            fighting: React.PropTypes.bool.isRequired,
            gameEnd: React.PropTypes.bool.isRequired,
            drugStore: React.PropTypes.array.isRequired
        };
    }

    saveGame() {
        this.props.dispatch({
            type: 'main.toggleLoading'
        });
        this.props.dispatch({
            type: 'saveGame',
            uid: this.props.uid,
            currentGame: this.props.currentGame
        })
    }


    componentWillMount() {

        // When we have just started a new game
        if (!this.props.drugsDisplayed) {
            this.props.dispatch({
                type: 'main.playable',
                drugStore: JSON.stringify(this.props.drugStore),
                newGame: true
            });
        }

        if (this.props.travelled && !this.props.fighting) {
            this.props.dispatch({
                type: 'main.playable',
                drugStore: JSON.stringify(this.props.drugStore),
                newGame: false
            });
        }

        if (this.props.travelled && this.props.gameEnd) {
            browserHistory.push('/game/status');
        }

        if (this.props.userError) {
            this.props.dispatch({
                type: 'main.resetUserError'
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fighting) {
            browserHistory.push('/game/duel');
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'main.nomad'
        });
    }

    render() {
        return (
            <div className="page bg-primary">
                {
                    <div className="flex-vt flex-stretch">
                        <Header class='headerGame position-relative flex-hz flex-space-between'>
                            <Days />
                        </Header>
                        <div className="flex-1 row">
                            <Newsfeed />
                            <div className='info-container'>
                                <FinancesDisplay />
                                <WeaponDisplay />
                                <div className="flex-hz flex-space-between">
                                    <Health />
                                    <div className="col-xs-4"></div>
                                    <Space />
                                </div>
                            </div>
                            <Location />
                        </div>
                        <Drugs />
                        <Footer
                            handleClick={this.saveGame}
                            apiLoading={this.props.apiLoading} />
                    </div>
                }
            </div>
        )
    }
}

// export the connected class
function mapStateToProps(state) {
    return ({
        uid: state.main.status.uid,
        currentGame: state.main.currentGame,
        travelled: state.main.status.travelled,
        userError: state.main.status.userError.active,
        fighting: state.main.status.fighting.active,
        gameEnd: state.main.status.gameEnd.active,
        drugStore: state.main.game.drugs,
        drugsDisplayed: state.main.status.drugsDisplayed,
        apiLoading: state.main.status.apiLoading,
        apiMessage: state.main.status.apiMessage
    });
}
export default connect(mapStateToProps)(Game);