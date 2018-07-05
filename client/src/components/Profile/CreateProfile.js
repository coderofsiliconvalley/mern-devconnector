import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../Common/TextInputGroup";

class CreateProfile extends Component {
	// Local UI State - Profile form and errors
	state = {
		displaySocialInputs: false,
		errors: {},
		handle: "",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: ""
	};

	render() {
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h4 className="display-4 text-center">Create Your Profile</h4>
							<p className="lead text-center">Let's get some information to make your profile stand out</p>
							<small className="d-block pb-3">* = required fields</small>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};

export default connect(mapStateToProps)(CreateProfile);
