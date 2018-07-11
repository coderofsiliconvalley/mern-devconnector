import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../store/actions/index";

import TextInputGroup from "../../Common/TextInputGroup";
import TextAreaGroup from "../../Common/TextAreaGroup";
import SelectListGroup from "../../Common/SelectListGroup";
import InputGroup from "../../Common/InputGroup";

class CreateProfile extends Component {
	// Local UI State - Profile form and errors
	state = {
		displaySocialInputs: false,
		errors: {},
		handle: "",
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: ""
	};

	onChangeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmitHandler = e => {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		// Dispatch the profile creation and forward upon success
		this.props.onCreateProfile(profileData, this.props.history);
	};

	componentWillReceiveProps(nextProps) {
		// Pass in any errors from last form submit
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						name="twitter"
						placeholder="Twitter Profile URL"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChangeHandler}
						error={errors.twitter}
					/>
					<InputGroup
						name="facebook"
						placeholder="Facebook Profile URL"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChangeHandler}
						error={errors.facebook}
					/>
					<InputGroup
						name="linkedin"
						placeholder="Linkedin Profile URL"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChangeHandler}
						error={errors.linkedin}
					/>
					<InputGroup
						name="youtube"
						placeholder="Youtube Profile URL"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChangeHandler}
						error={errors.youtube}
					/>
					<InputGroup
						name="instagram"
						placeholder="Instagram Profile URL"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChangeHandler}
						error={errors.instagram}
					/>
				</div>
			);
		}

		const optionsStatus = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Junior Developer", value: "Junior Developer" },
			{ label: "Senior Developer", value: "Senior Developer" },
			{ label: "Manager", value: "Manager" },
			{ label: "Student or Learning", value: "Student or Learning" },
			{ label: "Instructor or Teacher", value: "Instructor or Teacher" },
			{ label: "Intern", value: "Intern" },
			{ label: "Other", value: "Other" }
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h4 className="display-4 text-center">Create Your Profile</h4>
							<p className="lead text-center">Let's get some information to make your profile stand out</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmitHandler} noValidate>
								<TextInputGroup
									name="handle"
									type="text"
									placeholder="* Profile Handle"
									value={this.state.handle}
									onChange={this.onChangeHandler}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
								/>
								<SelectListGroup
									name="status"
									placeholder="Status"
									value={this.state.status}
									options={optionsStatus}
									onChange={this.onChangeHandler}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>
								<TextInputGroup
									name="company"
									type="text"
									placeholder="Company"
									value={this.state.company}
									onChange={this.onChangeHandler}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextInputGroup
									name="website"
									type="text"
									placeholder="Website"
									value={this.state.website}
									onChange={this.onChangeHandler}
									error={errors.website}
									info="Could be your own or a company website"
								/>
								<TextInputGroup
									name="location"
									type="text"
									placeholder="Location"
									value={this.state.location}
									onChange={this.onChangeHandler}
									error={errors.location}
									info="City & state suggested (eg. Austin, TX)"
								/>
								<TextInputGroup
									name="skills"
									type="text"
									placeholder="* Skills"
									value={this.state.skills}
									onChange={this.onChangeHandler}
									error={errors.skills}
									info="Could be your own company or one you work for"
								/>
								<TextInputGroup
									name="githubusername"
									type="text"
									placeholder="Github Username"
									value={this.state.githubusername}
									onChange={this.onChangeHandler}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include your username"
								/>
								<TextAreaGroup
									name="bio"
									placeholder="A short bio about yourself"
									value={this.state.bio}
									onChange={this.onChangeHandler}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<div className="mb-3">
									<button
										type="button"
										className="btn btn-light"
										onClick={e => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}));
										}}
									>
										Add Social Network Links
									</button>{" "}
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
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
		onCreateProfile: (profileData, history) => dispatch(actions.createProfile(profileData, history))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CreateProfile));
