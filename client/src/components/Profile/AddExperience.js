import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Form Components
import TextInputGroup from "../Common/TextInputGroup";
import TextAreaGroup from "../Common/TextAreaGroup";

class AddExperience extends Component {
	// Local UI State - Profile form and errors
	state = {
		// Form errros
		errors: {},

		// Form fields
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		disabled: false,
		description: ""
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link className="btn btn-light" to="/dashboard">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">Add any job or position that you have had in the past or current.</p>
							<small className="d-block pb-3">* = required fields</small>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};

export default connect(mapStateToProps)(withRouter(AddExperience));
