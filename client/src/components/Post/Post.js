import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux Actions
import * as actions from "../../store/actions";

// UI Components
import Spinner from "../Common/Spinner";
import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
	// Get the single post by id
	componentDidMount() {
		this.props.onGetSinglePost(this.props.match.params.id);
	}

	// Render the single post component
	render() {
		const { post, loading } = this.props.post;
		let postContent;

		if (post === null || Object.keys(post).length === 0 || loading) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			);
		}

		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">
								Back To Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
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
