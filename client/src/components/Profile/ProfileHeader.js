import React from "react";

const profileHeader = props => {
	const { profile } = props;

	return <div>Header {profile.handle}</div>;
};

export default profileHeader;
