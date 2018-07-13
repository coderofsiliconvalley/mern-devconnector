import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Redux Actions
import * as actions from "../../store/actions";

// UI Components
import TextAreaGroup from "../Common/TextAreaGroup";

class CommentForm extends Component {
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
		const { postId } = this.props;

		const commentData = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.props.onAddComment(postId, commentData);

		// Clear the form
		this.setState({ text: "" });
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
					<div className="card-header bg-info text-white">Make a comment...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmitHandler} noValidate>
							<div className="form-group">
								<TextAreaGroup
									name="text"
									placeholder="Reply to post"
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

CommentForm.propTypes = {
	postId: PropTypes.string.isRequired,
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
		onAddComment: (postId, commentData) => dispatch(actions.addComment(postId, commentData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentForm);
