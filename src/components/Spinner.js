import React from 'react';

export default class Spinner extends React.Component
{
	static get propTypes()
    {
        return {
			text: React.PropTypes.string
        };
    }
	
	render()
	{
		return (
			<div className={'spinnerWrapper' + (this.props.className ? this.props.className : '')} style={this.props.style ? this.props.style : {}}>
				<div className="spinner text-center">
					<div className="spinnerText">
						<p className="text-secondary">{this.props.text ? this.props.text : ''}</p>
					</div>
				</div>
			</div>
		)
	}
}