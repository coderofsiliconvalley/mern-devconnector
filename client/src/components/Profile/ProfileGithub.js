import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
	state = {
		clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
		clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
		count: 5,
		sort: "updated: asc",
		repos: []
	};

	componentDidMount() {
		const { username } = this.props;
		const { count, sort, clientId, clientSecret } = this.state;

		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data => {
				this.setState({ repos: data });
			})
			.catch(err => console.log(err));
	}

	render() {
		const { repos } = this.state;
		//const { username } = this.props;

		const repoItems = repos.map(repo => (
			<div key={repo.id} className="card card-body mb-2">
				<div className="row">
					<div className="col-md-6">
						<h4>
							<Link to={repo.html_url} className="text-info" target="_blank">
								{repo.name}
							</Link>
						</h4>
						<p>{repo.description}</p>
					</div>
					<div className="col-md-6">
						<span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
					</div>
				</div>
			</div>
		));

		return (
			<div>
				<h4 className="text-info text-center mt-3">Github Repos</h4>
				{repoItems}
			</div>
		);
	}
}

export default ProfileGithub;
