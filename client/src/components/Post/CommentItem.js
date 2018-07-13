import React from "react";
import PropTypes from "prop-types";

const commentItem = props => {
	const { comment, postId } = props;
	return (
		<div>
			<p>{comment.text}</p>
		</div>
	);
};

commentItem.propTypes = {
	comment: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired
};

export default commentItem;
