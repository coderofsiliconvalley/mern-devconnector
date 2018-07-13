import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux actions
import * as actions from "../../store/actions";

class PostItem extends Component {
	// Delete post button handler
	onDeleteClick = postId => {
		// TODO: Call delete post action
		this.props.onDeletePost(postId);
	};

	render() {
		const { post, auth } = this.props;

		return (
			<div>
				<div className="card card-body mb-3">
					<div className="row">
						<div className="col-md-2">
							<Link to={`/profiles`}>
								<img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
							</Link>
							<br />
							<p className="text-center">{post.name}</p>
						</div>
						<div className="col-md-10">
							<p className="lead">{post.text}</p>
							<button type="button" className="btn btn-light mr-1">
								<i className="text-info fas fa-thumbs-up" />
								<span className="badge badge-light">{post.likes.length}</span>
							</button>
							<button type="button" className="btn btn-light mr-1">
								<i className="text-secondary fas fa-thumbs-down" />
							</button>
							<Link to={`post/${post._id}`} className="btn btn-info mr-1">
								Comments
							</Link>
							{/* Only Allow deletion by the original poster */}
							{post.user === auth.user.id ? (
								<button type="button" className="btn btn-danger mr-1" onClick={() => this.onDeleteClick(post._id)}>
									<i className="fas fa-times" />
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	onDeletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onDeletePost: postId => dispatch(actions.deletePostById(postId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostItem);
