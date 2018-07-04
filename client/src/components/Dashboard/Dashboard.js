import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import PropTypes from "prop-types";

import Spinner from "../Common/Spinner";

class Dashboard extends Component {
	componentDidMount() {
		this.props.onGetUserProfile();
	}

	render() {
		// Extract user and profile info from our segmented Redux states
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			dashboardContent = <h4>Hello, {profile.user.name}</h4>;
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
		onGetUserProfile: () => dispatch(actions.getCurrentProfile())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
