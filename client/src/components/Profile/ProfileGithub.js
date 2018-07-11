import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
	state = {
		clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
		clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
		count: 5,
		sort: "created: asc",
		repos: []
	};

	render() {
		const { username } = this.props;

		return <div>Github {username}</div>;
	}
}

export default ProfileGithub;
