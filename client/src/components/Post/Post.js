import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class Post extends Component {
	componentDidMount() {
		this.props.onGetSinglePost(this.props.match.params.id);
	}

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
