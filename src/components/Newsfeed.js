import React from 'react';
import { connect } from 'react-redux';
import NewsIcon from 'react-icons/lib/fa/newspaper-o';

export class Newsfeed extends React.Component
{

	static get propTypes()
    {
        return {
            news: React.PropTypes.object.isRequired
        };
    }

	render()
	{
		return (
			<div className="newsfeed text-center padding-small">
				<span className="icon"><NewsIcon /></span>
	        	<p>
		        	{
		        		this.props.news.active ?
		        		this.props.news.display :
						"No news today."
		        	}
	        	</p>
        	</div>
		)
	}
}

// export the connected class
function mapStateToProps(state){
    return ({
        news: state.main.status.news
    });
}
export default connect(mapStateToProps)(Newsfeed);