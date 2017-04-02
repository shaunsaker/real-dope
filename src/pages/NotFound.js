import React from "react";
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

// Components
import Header from '../components/Header';

// Not found page component
export default class NotFound extends React.Component {
  render() {
    return (
      <div className="page page-not-found-page bg-primary">
        <div className="flex-vt flex-stretch flex-space-between">
          <div className="home-header">
            <Header class='headerGame position-relative flex-hz flex-space-between'>
              <p>Not Found</p>
            </Header>
          </div>
          <div className="text-center padding-large">
            <p>Yo cracker!</p>
            <p>This page doesn't exist.</p>
            <p>Get back to the game son!</p>
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
