import React from "react";
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

// Icons
import HomeIcon from 'react-icons/lib/md/home';
import SaveIcon from 'react-icons/lib/md/save';
import AppIcon from 'react-icons/lib/md/apps';
import AirplaneIcon from 'react-icons/lib/md/airplanemode-active';
import BoltIcon from 'react-icons/lib/fa/bolt';
import SpaceIcon from 'react-icons/lib/fa/street-view';
import HospitalIcon from 'react-icons/lib/fa/ambulance';
import DollarIcon from 'react-icons/lib/md/attach-money';
import AlarmIcon from 'react-icons/lib/md/alarm';
import NewsIcon from 'react-icons/lib/fa/newspaper-o';
import BankIcon from 'react-icons/lib/md/account-balance';
import CreditIcon from 'react-icons/lib/md/credit-card';
import BullseyeIcon from 'react-icons/lib/fa/bullseye';
import BulletIcon from 'react-icons/lib/md/mode-edit';
import HealthIcon from 'react-icons/lib/fa/heart';
import UserIcon from 'react-icons/lib/fa/user';
import PlaceIcon from 'react-icons/lib/md/place';

// Components
import Header from "../components/Header";

export default class Help extends React.Component {
    render() {
        return (
            <div className="page help-page bg-primary">
                <div className="flex-vt flex-stretch flex-space-between">
                    <Header class='headerGame position-relative flex-hz flex-space-between'>
                        <p>How to Play</p>
                    </Header>
                    <div className="row help-info">
                        <div className="section-group">
                            <p className="text-dark section-header text-center">Goal</p>
                            <p className="text-light text-center">To make enough money to pay off your loan by selling drugs. At the same time, avoiding the popo.</p>
                        </div>
                        <div className="section-group">
                            <p className="text-dark section-header text-center">Legend</p>
                            <div className="legend">
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><HomeIcon /></span>
                                    <p className="text-light">Go Home</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><AppIcon /></span>
                                    <p className="text-light">Open Toolbar</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><SaveIcon /></span>
                                    <p className="text-light">Save Game</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><AlarmIcon /></span>
                                    <p className="text-light">Days Left</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><NewsIcon /></span>
                                    <p className="text-light">Current News</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><DollarIcon /></span>
                                    <p className="text-light">Go to Finances / Current Cash</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><BankIcon /></span>
                                    <p className="text-light">Current Cash in Bank</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><CreditIcon /></span>
                                    <p className="text-light">Current Loan</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><AirplaneIcon /></span>
                                    <p className="text-light">Travel</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><PlaceIcon /></span>
                                    <p className="text-light">Current Location</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><BoltIcon /></span>
                                    <p className="text-light">Buy Weapons / Current Weapon</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><BullseyeIcon /></span>
                                    <p className="text-light">Current Weapon Damage</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><BulletIcon /></span>
                                    <p className="text-light">Current Ammo</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><HospitalIcon /></span>
                                    <p className="text-light">Go to Hospital</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><HealthIcon /></span>
                                    <p className="text-light">Current Health</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><SpaceIcon /></span>
                                    <p className="text-light">Buy Clothing / Current Space</p>
                                </div>
                                <div className="legend-row flex-hz flex-space-between">
                                    <span className="icon"><UserIcon /></span>
                                    <p className="text-light">Current Clothing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/home" className="page-footer flex-vt-normal flex-center">
                        <Button bsSize="sm" bsStyle="primary">
                            <p className="text-secondary text-light">Back</p>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}
