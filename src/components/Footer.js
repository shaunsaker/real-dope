import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { Motion, spring, presets } from 'react-motion';
import HomeIcon from 'react-icons/lib/md/home';
import SaveIcon from 'react-icons/lib/md/save';

// Components
import ReactPathMenu from './ReactPathMenu';
import Spinner from './Spinner';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer flex-1 flex-hz flex-center position-fixed-bottom">
                    <Link to="/home">
                        <Button bsSize="sm" bsStyle="default">
                            <span className="icon"><HomeIcon /></span> 
                        </Button>
                    </Link>   
                    <ReactPathMenu />
                    <Button bsSize="sm" bsStyle="default" onClick={this.props.handleClick}>
                        <span className="icon"><SaveIcon /></span> 
                    </Button>    
                {this.props.apiLoading ?
                    <Motion
                        defaultStyle={{ opacity: 0 }}
                        style={{ opacity: spring(1, presets.stiff) }}>
                        {
                        (style) =>
                            <Spinner key='loader' text='' style={style} />
                        }
                    </Motion>
                    :
                    <div className='spinnerPlaceholder'></div>
                }       
            </div>
        );
    }
}