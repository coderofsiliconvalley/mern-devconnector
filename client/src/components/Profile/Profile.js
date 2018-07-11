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
		const { profile, loading } = this.props.profile;

		let profileContent = null;

		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<div className="row" />

					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCredentials profile={profile} />
					<ProfileGithub profile={profile} />
				</div>
			);
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="col-md-12">{profileContent === null ? <p>Profile Not Found.</p> : profileContent}</div>
				</div>
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
