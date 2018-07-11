import React from "react";
import isEmpty from "../../validation/is-empty";

// External Profile Links
import SocialLink from "./ProfileSocial";

const profileHeader = props => {
	const { profile } = props;

	// Header {profile.handle}
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-info text-white mb-3">
					<div className="row">
						<div className="col-4 col-md-3 m-auto">
							<img className="rounded-circle" src={profile.user.avatar} alt="" />
						</div>
					</div>
					<div className="text-center">
						<h1 className="display-4 text-center">{profile.user.name}</h1>
						<p className="lead text-center">
							{profile.status} {isEmpty(profile.company) ? null : <span> at {profile.company}</span>}
						</p>
						{isEmpty(profile.location) ? null : <p>{profile.location}</p>}
						<p>
							{isEmpty(profile.website) ? null : <SocialLink to={profile.website} icon={"fas fa-globe fa-2x"} />}

							{isEmpty(profile.social && profile.social.twitter) ? null : (
								<SocialLink to={profile.social.twitter} icon={"fab fa-twitter fa-2x"} />
							)}

							{isEmpty(profile.social && profile.social.facebook) ? null : (
								<SocialLink to={profile.social.facebook} icon={"fab fa-facebook fa-2x"} />
							)}

							{isEmpty(profile.social && profile.social.linkedin) ? null : (
								<SocialLink to={profile.social.linkedin} icon={"fab fa-linkedin fa-2x"} />
							)}

							{isEmpty(profile.social && profile.social.youtube) ? null : (
								<SocialLink to={profile.social.youtube} icon={"fab fa-youtube fa-2x"} />
							)}

							{isEmpty(profile.social && profile.social.instagram) ? null : (
								<SocialLink to={profile.social.instagram} icon={"fab fa-instagram fa-2x"} />
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default profileHeader;
