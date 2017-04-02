import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { Motion, spring, presets } from 'react-motion';

// Components
import Header from '../components/Header';
import Spinner from '../components/Spinner';

const validate = values => {
	const errors = {};

	if (!values.email) {
		errors.email = "Please enter an email.";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = "Please enter a password.";
	}

	return errors;
};

export class Login extends React.Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.resetAuthError = this.resetAuthError.bind(this);
	}

	static get propTypes() {
		return {
			loading: React.PropTypes.bool.isRequired,
			authenticated: React.PropTypes.bool.isRequired,
			authenticationError: React.PropTypes.bool.isRequired,
			authenticationErrorMessage: React.PropTypes.string
		};
	}

	renderField({ input, label, type, meta: { touched, error } }) {
		return (
			<fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
				<div>
					<input {...input} placeholder={label} className="form-control" type={type} />
					{ touched && error && 
						<Motion
							defaultStyle={{ height: 0, opacity: 0 }}
							style={{ height: spring(20, presets.stiff), opacity: spring(1, presets.stiff) }}>
							{(style) =>
								<div 
									style={style}
									className="help-block">{error}
								</div>
							}
						</Motion>	
					}
				</div>
			</fieldset>
		);
	}

	handleFormSubmit(values) {
		this.props.dispatch({
			type: 'main.toggleLoading'
		});

		this.props.dispatch({
			type: 'main.resetAuthError'
		});

		this.props.dispatch({
			type: 'signInUser',
			values
		});
	}

	componentWillMount() {
		if (this.props.authenticated) {
			browserHistory.push('/home');
		}

		if (this.props.authenticationError) {
			this.props.dispatch({
				type: 'main.resetAuthError'
			});
		}
	}

	componentDidUpdate() {
		if (this.props.loading) {
			if (this.props.authenticationError) {
				this.props.dispatch({
					type: 'main.toggleLoading'
				})
			}
		}

		if (this.props.authenticated) {
			browserHistory.push('/home');
		}
	}

	resetAuthError() {
		this.props.dispatch({
			type: 'main.resetAuthError'
		})
	}

	renderAuthenticationError() {
		const SIGNUP_BUTTON =
			this.props.authenticationErrorMessage === "It does not look like you've signed up." ?
				<Link to="/signup">
					<Button bsSize="lg" bsStyle="primary" onClick={this.resetAuthError}>
						<p className="text-light">Redirect to Signup Page?</p>
					</Button>
				</Link>
				:
				<div></div>;

		if (this.props.authenticationError) {
			return (
				<Motion
					defaultStyle={{ height: 0, opacity: 0, top: -100 }}
					style={{ height: spring(70, presets.stiff), opacity: spring(1, presets.stiff), top: spring(78, presets.stiff) }}>
					{(style) =>
						<div>
							<div 
								style={{ opacity: style.opacity, top: style.top }}
								className="signup-login-button text-center">
								{ SIGNUP_BUTTON }
							</div>
							<div 
								style={{ opacity: style.opacity, height: style.height }}
								className="alert alert-danger flex-hz flex-center">
								{this.props.authenticationErrorMessage}
							</div>
						</div>
					}
				</Motion>
			)
		}
		return <div></div>;
	}

	render() {
		return (
			<div className="page input-pages bg-primary">
				<div className="flex-vt flex-stretch flex-space-between">
					<div>
						<Header class='headerGame position-relative flex-hz flex-space-between'>
							<p>Login</p>
						</Header>
						{this.renderAuthenticationError()}
					</div>
					<div className="flex-1 flex-vt-normal flex-center">
						<form
							className="section-group text-center"
							onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
							<Field name="email" component={this.renderField} className="form-control" type="text" label="Email Address" />
							<Field name="password" component={this.renderField} className="form-control" type="password" label="Password" />
							<button action="submit" className="btn btn-primary">
								<p className="text-light">Log In</p>
							</button>
						</form>
					</div>
					{this.props.loading ? <Spinner text='' /> : <div></div>}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return ({
		loading: state.main.status.apiLoading,
		authenticated: state.main.status.authenticated,
		authenticationError: state.main.status.authenticationError,
		authenticationErrorMessage: state.main.status.authenticationErrorMessage
	});
}

export default connect(mapStateToProps)(reduxForm({
	form: 'login',
	validate
})(Login));