import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Redux actions
import * as actions from "../../store/actions";

class Education extends Component {
	deleteEducationHandler(eduId) {
		this.props.onDeleteEducation(eduId);
	}

	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD" utc>
						{edu.from}
					</Moment>
					-
					{edu.to === null ? (
						"Now"
					) : (
						<Moment format="YYYY/MM/DD" utc>
							{edu.to}
						</Moment>
					)}
				</td>
				<td>
					<button className="btn btn-danger" onClick={() => this.deleteEducationHandler(edu._id)}>
						Delete
					</button>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className="mb-6">Education / Certification</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>{education}</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	onDeleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
	return {
		onDeleteEducation: eduId => dispatch(actions.deleteEducation(eduId))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withRouter(Education));
