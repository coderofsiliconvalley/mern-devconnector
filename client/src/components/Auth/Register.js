import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

class Register extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		password2: "",
		errors: {}
	};

	// Form input handler
	onChangeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Form submit
	onSubmitHandler = event => {
		event.preventDefault();

		const newUser = {
			...this.state
		};

		delete newUser.errors;

		// Save to redux store
		this.props.registerUser(newUser, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
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
		// Extract errors from component state - will be a separate Redux store
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form onSubmit={this.onSubmitHandler} noValidate>
								<div className="form-group">
									<input
										type="text"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.name
										})}
										placeholder="Name"
										name="name"
										value={this.state.name}
										onChange={this.onChangeHandler}
									/>
									{errors.name && <div className="invalid-feedback">{errors.name}</div>}
								</div>
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
									<small className="form-text text-muted">
										This site uses Gravatar so if you want a profile image, use a Gravatar email
									</small>
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
								<div className="form-group">
									<input
										type="password"
										className={classnames("form-control form-control-lg", {
											"is-invalid": errors.password2
										})}
										placeholder="Confirm Password"
										name="password2"
										value={this.state.password2}
										onChange={this.onChangeHandler}
									/>
									{errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
