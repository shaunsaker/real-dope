import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Motion, spring, presets } from 'react-motion';
import CheckIcon from 'react-icons/lib/md/check-circle';

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
            loading: false,
            saveMessage: false
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

        if (nextProps.apiMessage && nextProps.apiMessage === "Game saved.") {
            this.setState({
                saveMessage: true
            });

            // Display Game Saved Message for 2 seconds
            setTimeout(() => {
                this.setState({
                    saveMessage: false
                })
            }, 2000);
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'main.nomad'
        });
    }

    render() {
        return (
            <div className="page game-page bg-primary">
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
                        { this.state.saveMessage ?
                            <Motion
                                defaultStyle={{ height: 0, opacity: 0 }}
                                style={{ height: spring(64, presets.stiff), opacity: spring(1, presets.stiff) }}>
                                {(style) =>
                                    <div
                                        style={{ opacity: style.opacity, height: style.height }}
                                        className="alert alert-danger flex-vt-normal">
                                        <p className="text-light flex-hz flex-1 flex-center">
                                            <span className="icon"><CheckIcon /></span>
                                            { this.props.apiMessage }
                                        </p>
                                    </div>
                                }
                            </Motion>
                            :
                            <div></div>
                        }
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