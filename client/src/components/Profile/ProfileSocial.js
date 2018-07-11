import React from "react";

const profileSocialLink = ({ to, icon }) => {
	return (
		<a className="text-white p-2" href={to} target="_blank">
			<i className={icon} />
		</a>
	);
};

export default profileSocialLink;
