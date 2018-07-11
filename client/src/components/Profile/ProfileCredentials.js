import React from "react";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

const profileCredentials = props => {
	const { experience, education } = props;

	const experienceList = experience.map(exp => (
		<li key={exp._id} className="list-group-item">
			<h4>{exp.company}</h4>
			<p>
				<Moment format="MMM YYYY" utc>
					{exp.from}
				</Moment>
				{" - "}
				{exp.to === null ? (
					"Current"
				) : (
					<Moment format="MMM YYY" utc>
						{exp.to}
					</Moment>
				)}
			</p>
			<p>
				<strong>Position:</strong> {exp.title}
			</p>
			{exp.location === "" ? null : (
				<p>
					<strong>Location:</strong> {exp.location}
				</p>
			)}
			{exp.description === "" ? null : (
				<p>
					<strong>Description:</strong> {exp.description}
				</p>
			)}
		</li>
	));

	const educationList = education.map((edu, index) => (
		<li key={edu._id} className="list-group-item">
			<h4>{edu.school}</h4>
			<p>
				<Moment format="MMM YYYY" utc>
					{edu.from}
				</Moment>
				{" - "}
				{edu.to === null ? (
					"Current"
				) : (
					<Moment format="MMM YYY" utc>
						{edu.to}
					</Moment>
				)}
			</p>
			{edu.degree === "" ? null : (
				<p>
					<strong>Degree:</strong> {edu.degree}
				</p>
			)}
			{edu.fieldofstudy === "" ? null : (
				<p>
					<strong>Field of Study:</strong> {edu.fieldofstudy}
				</p>
			)}
			{edu.description === "" ? null : (
				<p>
					<strong>Description:</strong> {edu.description}
				</p>
			)}
		</li>
	));

	return (
		<div className="row">
			<div className="col-md-6 mb-3">
				<h3 className="text-center text-info">Experience</h3>
				{experienceList.length > 0 ? (
					<ul className="list-group">{experienceList}</ul>
				) : (
					<p className="text-center">No Experience Listed</p>
				)}
			</div>
			<div className="col-md-6">
				<h3 className="text-center text-info">Education</h3>
				{experienceList.length > 0 ? (
					<ul className="list-group">{educationList}</ul>
				) : (
					<p className="text-center">No Education Listed</p>
				)}
			</div>
		</div>
	);
};

export default profileCredentials;
