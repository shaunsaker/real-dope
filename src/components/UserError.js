import React from 'react';
import { connect } from 'react-redux';
import { Motion, spring, presets } from 'react-motion';

export class UserError extends React.Component
{

	static get propTypes()
    {
        return {
        	userError: React.PropTypes.object.isRequired
        };
    }

	render()
	{
		return (
			<div>
				{ this.props.userError.active ? 
					<Motion
						defaultStyle={{ height: 0, opacity: 0 }}
						style={{ height: spring(37, presets.stiff), opacity: spring(1, presets.stiff) }}>
						{(style) =>
							<div 
								style={{ opacity: style.opacity, height: style.height }}>
								<span className="userError">{this.props.userError.display}</span> 
							</div>
						}
					</Motion>
				: 
					<span></span>
				}
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
    return({
    	userError: state.main.status.userError
    });
}
export default connect(mapStateToProps)(UserError);