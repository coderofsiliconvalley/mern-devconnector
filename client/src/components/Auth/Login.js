import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import classnames from "classnames";

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {}
	};

	// Form input handler
	onChangeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Form submit
	onSubmitHandler = event => {
		event.preventDefault();

		const userData = {
			...this.state
		};

		delete userData.errors;

		//console.log(user);
		this.props.onLoginUser(userData);
	};

	componentWillReceiveProps(nextProps) {
		// If auth state changed to true...forward to the dashboard
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}

		// Pass in any errors from last form submit
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	componentDidMount() {
		// If the user is already authenticated...forward to the dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push(this.props.auth.redirectURL);
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={this.onSubmitHandler}>
								<div className="form-group">
									<input
										type="email"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.email
										})}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChangeHandler}
									/>
									{errors.email && <div className="invalid-feedback">{errors.email}</div>}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.password
										})}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChangeHandler}
									/>
									{errors.password && <div className="invalid-feedback">{errors.password}</div>}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	onLoginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoginUser: userData => dispatch(actions.loginUser(userData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
