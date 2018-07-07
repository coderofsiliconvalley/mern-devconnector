import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

// UI Components
import Spinner from "../Common/Spinner";

// Dashboard Components
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";

class Dashboard extends Component {
	componentDidMount() {
		this.props.onGetUserProfile();
	}

	deleteAccountHandler = () => {
		// Dispatch an account delete
		this.props.onDeleteAccount();
	};

	render() {
		// Extract user and profile info from our segmented Redux states
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			// Check if logged in user has any profile data
			if (Object.keys(profile).length > 0) {
				// This user has a profile!
				dashboardContent = <h4>Hello, {profile.user.name}</h4>;
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						{/* TODO: Experience and education tables */}
						<div style={{ marginBottom: "60px" }}>
							<button className="btn btn-danger" onClick={this.deleteAccountHandler}>
								Delete My Account
							</button>
						</div>
					</div>
				);
			} else {
				// Authenticated user hasn't created a profile yet.
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>You have not yet set up a profile, please add some info.</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	onGetUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		//errors: state.errors,
		profile: state.profile
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetUserProfile: () => dispatch(actions.getCurrentProfile()),
		onDeleteAccount: () => dispatch(actions.deleteAccount())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
