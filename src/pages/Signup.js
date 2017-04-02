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

	if (!values.passwordConfirmation) {
		errors.passwordConfirmation = "Please enter a password confirmation.";
	}

	if (values.password !== values.passwordConfirmation) {
		errors.password = 'Passwords do not match';
	}

	return errors;
};

export class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	static get propTypes()
	{
		return {
			loading: React.PropTypes.bool.isRequired,
			authenticated: React.PropTypes.bool.isRequired,
			authenticationError: React.PropTypes.bool.isRequired,
			authenticationErrorMessage: React.PropTypes.string,
			authenticationRedirect: React.PropTypes.bool.isRequired
		};
	}

	handleFormSubmit(values) {		
		this.props.dispatch({
			type: 'main.toggleLoading'
		});

		this.props.dispatch({
			type: 'main.resetAuthError'
		});

		this.props.dispatch({
			type: 'signUpUser',
			values
		});
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

	componentWillMount() {
		if (this.props.authenticated) {
			browserHistory.push('/home');
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

		if (this.props.authenticationError && this.props.authenticationRedirect) {
			setTimeout(() => {
				browserHistory.push('/login');
			}, 3000);
		}
	}

	renderAuthenticationError() {
		if (this.props.authenticationError) {
			return (
				<Motion
					defaultStyle={{ height: 0, opacity: 0 }}
					style={{ height: spring(70, presets.stiff), opacity: spring(1, presets.stiff) }}>
					{(style) =>
						<div 
							style={{ opacity: style.opacity, height: style.height }}
							className="alert alert-danger flex-hz flex-center">
							{this.props.authenticationErrorMessage === "The email address is already in use by another account." ? this.props.authenticationErrorMessage + ' Redirecting to Login Page.' : this.props.authenticationErrorMessage }
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
							<p>Sign Up</p>
						</Header>
						{ this.renderAuthenticationError() }
					</div>
					<Link to="/login" className="signup-login-button text-center">
						<Button bsSize="sm" bsStyle="default">
							<p className="text-dark">Login Instead?</p>
						</Button>
					</Link>

					<div className="flex-1 flex-vt-normal flex-center">
						<form 
							className="section-group text-center"
							onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
							<Field name="email" type="text" component={this.renderField} label="Email" />
							<Field name="password" type="password" component={this.renderField} label="Password" />
							<Field name="passwordConfirmation" type="password" component={this.renderField} label="Password Confirmation" />
							<button action="submit" className="btn btn-primary">
								<p className="text-light">Sign up</p>
							</button>
						</form>
					</div>
					{ this.props.loading ? <Spinner text=''/> : <div></div> }
					{ (this.props.authenticationError && this.props.authenticationRedirect) ? <Spinner text='Redirecting to Login Page...'/> : <div></div> }
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
		authenticationErrorMessage: state.main.status.authenticationErrorMessage,
		authenticationRedirect: state.main.status.authenticationRedirect
	});
}

export default connect(mapStateToProps)(reduxForm({
	form: 'signup',
	validate
})(Signup));