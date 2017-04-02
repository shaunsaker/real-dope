import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (WrappedComponent) {
  class GameInit extends React.Component {  
    static get propTypes()
    {
        return {
          drugsDisplayed: React.PropTypes.array
        };
    }

    componentWillMount() {
      if (!this.props.drugsDisplayed) {
        browserHistory.push('/');
      }
    }

    render() {
      return this.props.drugsDisplayed ? <WrappedComponent {...this.props} /> : <div></div>
    }
  }

  function mapStateToProps(state) {
    return { drugsDisplayed: state.main.status.drugsDisplayed };
  }

  return connect(mapStateToProps)(GameInit);
}