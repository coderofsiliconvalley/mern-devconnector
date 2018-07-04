import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import PropTypes from "prop-types";

class Dashboard extends Component {
	componentDidMount() {
		this.props.onGetUserProfile();
	}

	render() {
		let userInfo = "";
		if (this.props.profile.profile) {
			userInfo = this.props.profile.profile.handle;
		}

		return (
			<div>
				{userInfo && <h1>Dashboard loaded for:</h1>}
				{userInfo}
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
