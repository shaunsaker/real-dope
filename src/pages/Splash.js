import React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import { Motion, StaggeredMotion, spring, presets } from 'react-motion';

// Components
import Spinner from '../components/Spinner';

export class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMounted: false
    }

    this.logoElements = ['Real', 'Dope'];
  }

  static get propTypes() {
    return {
      authenticated: React.PropTypes.bool.isRequired,
      authenticationRedirect: React.PropTypes.bool.isRequired
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isMounted: true
      });

      setTimeout(() => {

        // Check if user is authenticated
        if (!this.props.authenticated) {
          this.props.dispatch({
            type: 'userAuth'
          });
        }
      }, 1500);

    }, 1500);
  }

  componentDidUpdate() {

    // If a user is authenticated, redirect them to the home page
    if (this.props.authenticated) {
      browserHistory.push('/home');
    }

    // Redirect to signup page when we have called our userAuth method but user is not authenticated
    if (!this.props.authenticated && this.props.authenticationRedirect) {
      browserHistory.push('/signup');
    }
  }

  // render
  render() {
    return (
      <div id="splash" className="page bg-primary">
        <div className="flex-vt flex-center text-center">
          <StaggeredMotion
            defaultStyles={[{ top: -400 }, { top: -400 }]}
            styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
              return i === 0
                ? { top: spring(0, presets.wobbly) }
                : { top: spring(prevInterpolatedStyles[i - 1].top + 65, presets.wobbly) }
            })}>
            {(interpolatedStyles) => {
              return <div className='position-absolute' style={{ height: '138px' }}>
                {interpolatedStyles.map((style, index) => {
                  return (
                    <div className='position-absolute-ct-hz' style={{ top: style.top }} key={index}>
                      <h1 className="text-primary text-large text-white text-shadow">
                        <span>{this.logoElements[index]}</span>
                        {index === (this.logoElements.length - 1) ? <span className='text-accent'> !</span> : <span></span>}
                      </h1>
                    </div>
                  );
                })}
              </div>
            }}
          </StaggeredMotion>
          <div style={{ position: 'absolute', top: '65%' }}>
            {this.state.isMounted ?
              <Motion
                defaultStyle={{ opacity: 0 }}
                style={{ opacity: spring(1, presets.stiff) }}>
                {(style) =>
                  <p key="description" className="text-secondary text-light" style={style}>Getting your digits fam...</p>
                }
              </Motion>
              :
              <p key="test" className="text-secondary text-light no-viz">Getting your digits fam...</p>
            }
          </div>
        </div>

        {!this.props.authenticated && this.state.isMounted ?
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

function mapStateToProps(state) {
  return ({
    authenticated: state.main.status.authenticated,
    authenticationRedirect: state.main.status.authenticationRedirect
  })
}

export default connect(mapStateToProps)(Splash);