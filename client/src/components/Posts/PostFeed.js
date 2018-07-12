import React from "react";
import PropTypes from "prop-types";

// UI Element
import PostItem from "./PostItem";

const postFeed = props => {
	const { posts } = props;

	return posts.map(post => <PostItem key={post._id} post={post} />);
};

postFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default postFeed;
