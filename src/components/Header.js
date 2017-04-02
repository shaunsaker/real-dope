import React from 'react';

export default class Header extends React.Component{
    render() {
        return (
            <div className={this.props.class ? this.props.class : "header position-fixed"}>
                <p className="text-primary text-medium text-white text-shadow text-center">
                    <span>Real Dope </span>
                    <span className="text-accent">!</span>
                </p>
                {this.props.children ? this.props.children : <span></span>}
            </div>
        );
    }
}