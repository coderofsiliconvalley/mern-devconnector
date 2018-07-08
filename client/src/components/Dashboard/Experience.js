import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Redux actions
import * as actions from "../../store/actions";

class Experience extends Component {
	deleteExperienceHandler(expId) {
		this.props.onDeleteExperience(expId);
	}

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD" utc>
						{exp.from}
					</Moment>
					-
					{exp.to === null ? (
						"Now"
					) : (
						<Moment format="YYYY/MM/DD" utc>
							{exp.to}
						</Moment>
					)}
				</td>
				<td>
					<button className="btn btn-danger" onClick={() => this.deleteExperienceHandler(exp._id)}>
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-6">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>{experience}</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	onDeleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		onDeleteExperience: expId => dispatch(actions.deleteExperience(expId))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withRouter(Experience));
