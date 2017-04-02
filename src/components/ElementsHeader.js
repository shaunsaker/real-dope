import React from 'react';

export default class ElementsHeader extends React.Component
{

	static get propTypes()
    {
        return {
            text: React.PropTypes.string.isRequired,
            deal: React.PropTypes.bool
        };
    }

	render()
	{
		return (
			<div className={this.props.class ? this.props.class + " drugsHeader padding-small flex-hz" : "drugsHeader padding-small flex-hz"}>
				{ this.props.deal ? 
					(
						<div></div>
					)
					:
					(
						<div className="flex-2">
							<p>Name</p>
						</div>
					)
				}
				<div className="flex-1">
					<p>{this.props.text}</p>
				</div>
				<div className="flex-1">
					<p>Price</p>
				</div>
				<div className="flex-1"></div>
				{
					this.props.deal ?
					<div className="flex-2"></div>
					:
					<span></span>
				}
        	</div>
		)
	}
}