import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Actions
import * as actions from "../../store/actions";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCredentials from "./ProfileCredentials";
import ProfileGithub from "./ProfileGithub";

// UI Components
import Spinner from "../Common/Spinner";

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			// Get Profile by Handle
			this.props.onGetHandle(this.props.match.params.handle);
		}
	}
	render() {
		const { profile } = this.props.profile;

		let profileContent = null;

		if (profile !== null) {
			profileContent = (
				<div>
					<ProfileHeader />
					<ProfileAbout />
					<ProfileCredentials />
					<ProfileGithub />
				</div>
			);
		} else {
			profileContent = <p>Profile not found.</p>;
		}
		return (
			<div>
				<h1>Main Profile:</h1>
				{profileContent === null ? <Spinner /> : profileContent}
			</div>
		);
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	onGetHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile
	};
};

const mapDisptachToProps = dispatch => {
	return {
		onGetHandle: handle => dispatch(actions.getProfileByHandle(handle))
	};
};

export default connect(
	mapStateToProps,
	mapDisptachToProps
)(Profile);
