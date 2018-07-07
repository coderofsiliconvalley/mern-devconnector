import React, { Component } from "react";
import { connect } from "react-redux";
//import PropTypes from 'prop-types';

class Experience extends Component {
	render() {
		const experience = this.props.experience;

		return (
			<div>
				<h3>experiences go here: {experience[0].title}</h3>
			</div>
		);
	}
}

export default connect()(Experience);
