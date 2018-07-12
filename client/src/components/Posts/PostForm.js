import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions";

// UI Components
import TextAreaGroup from "../Common/TextAreaGroup";

class PostForm extends Component {
	state = {
		text: "",
		errors: {}
	};

	onChangeHandler = event => {
		// Set the UI state property with the changed field value
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmitHandler = event => {
		event.preventDefault();

		const { user } = this.props.auth;

		const postData = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.onAddPost(postData);
	};

	componentWillReceiveProps(nextProps) {
		// Set any error messages before next render
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmitHandler} noValidate>
							<div className="form-group">
								<TextAreaGroup
									name="text"
									placeholder="Create a post"
									value={this.state.text}
									onChange={this.onChangeHandler}
									error={errors.text}
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	onAddPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddPost: postData => dispatch(actions.addPost(postData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostForm);
