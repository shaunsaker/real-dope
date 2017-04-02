import React from "react";
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

// Components
import Header from "../components/Header";

export default class About extends React.Component {
    render() {
        return (
            <div className="page about-page bg-primary">
                <div className="flex-vt flex-stretch flex-space-between">
                    <Header class='headerGame position-relative flex-hz flex-space-between'>
                        <p>About</p>
                    </Header>
                    <div className="row">
                        <div className="flex-vt-normal flex-center text-center">
                            <h1 className="text-primary text-large text-white text-shadow">
                                <span>Real</span>
                            </h1>
                            <h1 className="text-primary text-large text-white text-shadow">
                                <span>Dope</span>
                                <span className='text-accent'> !</span>
                            </h1>
                        </div>
                        <p className="text-center header">Version 1.0.0</p>
                        <div className="button-container">
                            <a className="btn btn-lg btn-default text-dark text-secondary" href="mailto:info@shaunsaker.com">Report a Bug</a>
                        </div>
                        <div className="button-container">
                            <a className="btn btn-lg btn-primary text-light text-secondary" href="mailto:info@shaunsaker.com">Get in Touch</a>
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
