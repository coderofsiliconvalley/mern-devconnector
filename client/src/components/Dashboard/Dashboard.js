import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
//import PropTypes from "prop-types";

class Dashboard extends Component {
	componentDidMount() {
		this.props.onGetUserProfile();
	}

	render() {
		return (
			<div>
				<h1>Dashboard loaded</h1>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors,
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
