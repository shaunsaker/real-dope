import React from 'react';
import DownArrowIcon from 'react-icons/lib/md/arrow-drop-down';

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
				<div className="flex-1 flex-hz flex-center">
					{
						this.props.scrollable ?
						<span className="icon down-arrow-icon"><DownArrowIcon /></span>
						:
						<span />
					}
				</div>
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