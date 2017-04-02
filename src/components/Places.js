import React from 'react';
import { Link } from "react-router";
import { Button } from 'react-bootstrap';

export default class Places extends React.Component
{
	render()
	{
		return (
			<div className="places text-center">
                <Link to="/game/travel">
                    <Button bsSize="sm" bsStyle="default">
                        Travel
                    </Button>
                </Link>  
                <Link to="/game/guns">
                    <Button bsSize="sm" bsStyle="default">
                        Gun Store
                    </Button>
                </Link> 
                <Link to="/game/clothing">
                    <Button bsSize="sm" bsStyle="default">
                        Clothing Store
                    </Button>
                </Link> 
                <Link to="/game/hospital">
                    <Button bsSize="sm" bsStyle="default">
                        Hospital
                    </Button>
                </Link> 
                <Link to="/game/finances">
                    <Button bsSize="sm" bsStyle="default">
                        Finances
                    </Button>
                </Link> 
                <Button bsSize="sm" bsStyle="default">
                    X
                </Button>
			</div>
		)
	}
}