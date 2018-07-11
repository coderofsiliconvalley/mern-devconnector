import React from "react";

const profileCredentials = props => {
	const { profile } = props;

	return <div>Credentials {profile.handle}</div>;
};

export default profileCredentials;
