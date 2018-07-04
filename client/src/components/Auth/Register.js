import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import TextInputGroup from "../Common/TextInputGroup";

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
								<TextInputGroup
									name="name"
									type="text"
									placeholder="Name"
									value={this.state.name}
									onChange={this.onChangeHandler}
									error={errors.name}
								/>
								<TextInputGroup
									name="email"
									type="email"
									placeholder="Email Address"
									value={this.state.email}
									onChange={this.onChangeHandler}
									error={errors.email}
									info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
								/>
								<TextInputGroup
									name="password"
									type="password"
									placeholder="Password"
									value={this.state.password}
									onChange={this.onChangeHandler}
									error={errors.password}
								/>
								<TextInputGroup
									name="password2"
									type="password"
									placeholder="Confirm Password"
									value={this.state.password2}
									onChange={this.onChangeHandler}
									error={errors.password2}
								/>
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
