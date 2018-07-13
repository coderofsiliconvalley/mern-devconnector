import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentItem extends Component {
	render() {
		const { comment, postId } = this.props;
		return (
			<div>
				<p>{comment.text}</p>
			</div>
		);
	}
}

CommentItem.propTypes = {
	comment: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired
};

export default connect(null)(CommentItem);
