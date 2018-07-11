import React from "react";

const profileGithub = props => {
	const { profile } = props;

	return <div>Github {profile.handle}</div>;
};

export default profileGithub;
