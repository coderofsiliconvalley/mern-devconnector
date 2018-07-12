import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

// Ui Components
import Spinner from "../Common/Spinner";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

class Posts extends Component {
	componentDidMount() {
		this.props.onGetAllPosts();
	}

	render() {
		const { posts, loading } = this.props.post;
		let postContent;

		if (posts === null && loading) {
			postContent = <Spinner />;
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Post Feed</h1>
							<PostForm />
							<div className="posts">{postContent}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	//posts: PropTypes.object.isRequired,
	onGetAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		post: state.post
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetAllPosts: () => dispatch(actions.getPostsAll())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Posts);
