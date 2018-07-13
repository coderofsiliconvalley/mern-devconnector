import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Redux Actions
import * as actions from "../../store/actions";

// UI Components
import Spinner from "../Common/Spinner";

class Post extends Component {
	// Get the single post by id
	componentDidMount() {
		this.props.onGetSinglePost(this.props.match.params.id);
	}

	// Render the single post component
	render() {
		const { post } = this.props.post;
		return (
			<div>
				<p>Todo: Single Post</p>
				<p>{post.text}</p>
			</div>
		);
	}
}

// Required props for this component
Post.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	onGetSinglePost: PropTypes.func.isRequired
};

// Redux Properties
const mapStateToProps = state => {
	return {
		auth: state.auth,
		post: state.post
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetSinglePost: postId => dispatch(actions.getPost(postId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Post);
