import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../store/actions";

// Form Components
import TextInputGroup from "../Common/TextInputGroup";
import TextAreaGroup from "../Common/TextAreaGroup";

class AddEducation extends Component {
	// Local UI State - Profile form and errors
	state = {
		// Form errros
		errors: {},

		// Form fields
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		disabled: false,
		description: ""
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onSubmitHandler = event => {
		// Stop the form submission...we control verticle
		event.preventDefault();

		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.onAddEducation(eduData, this.props.history);
	};

	onChangeHandler = event => {
		// Set the UI state property with the changed field value
		this.setState({ [event.target.name]: event.target.value });
	};

	// Toggle "Current" Checkboxfield Handler
	onToggleCurrent = () => {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		});
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link className="btn btn-light" to="/dashboard">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">
								Add any education that you have had in the past or currently engaged in.
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmitHandler} noValidate>
								<TextInputGroup
									name="school"
									type="text"
									placeholder="* School"
									value={this.state.school}
									onChange={this.onChangeHandler}
									error={errors.school}
								/>
								<TextInputGroup
									name="degree"
									type="text"
									placeholder="* Degree"
									value={this.state.degree}
									onChange={this.onChangeHandler}
									error={errors.degree}
								/>
								<TextInputGroup
									name="fieldofstudy"
									type="text"
									placeholder="* Field of Study"
									value={this.state.fieldofstudy}
									onChange={this.onChangeHandler}
									error={errors.fieldofstudy}
								/>
								<h6>From Date</h6>
								<TextInputGroup
									name="from"
									type="date"
									value={this.state.from}
									onChange={this.onChangeHandler}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextInputGroup
									name="to"
									type="date"
									value={this.state.to}
									onChange={this.onChangeHandler}
									error={errors.to}
									disabled={this.state.disabled ? "disabled" : ""}
								/>
								<div className="form-check mb-4">
									<input
										id="current"
										name="current"
										type="checkbox"
										className="form-check-input"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onToggleCurrent}
									/>
									<label htmlFor="current" className="form-check-label">
										Currently Attending
									</label>
								</div>
								<TextAreaGroup
									name="description"
									type="text"
									placeholder="* Description"
									value={this.state.description}
									onChange={this.onChangeHandler}
									error={errors.description}
									info="Tell us about this position"
								/>
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	onAddEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddEducation: (eduData, history) => dispatch(actions.addEducation(eduData, history))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddEducation));
