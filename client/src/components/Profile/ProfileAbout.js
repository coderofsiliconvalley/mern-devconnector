import React from "react";

const profileAbout = props => {
	const { profile } = props;

	return <div>About {profile.handle}</div>;
};

export default profileAbout;
