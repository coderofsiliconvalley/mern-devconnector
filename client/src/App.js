import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";

// Common Components
import PrivateRoute from "./components/Common/PrivateRoute";
import PageNotFound from "./components/Common/PageNotFound";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Landing from "./components/Layout/Landing";

// Authentication Components
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import Register from "./components/Auth/Register";

// Dashboard Components
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/Dashboard/Profile/CreateProfile";
import EditProfile from "./components/Dashboard/Profile/EditProfile";
import AddExperience from "./components/Dashboard/Profile/AddExperience";
import AddEducation from "./components/Dashboard/Profile/AddEducation";

// Public Profile Components
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";

// Post Components
import Posts from "./components/Posts/Posts";
import SinglePost from "./components/Post/Post";

// Boostrap App-Wide Style sheet
import "./App.css";

class App extends Component {
	componentWillMount() {
		// To Maintain Login Persistence: Check for Auth Token
		this.props.onCheckAuthentication();
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						{/* Authentication Routes */}
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/logout" component={Logout} />

						{/* Public App Routes */}
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/profile/:handle" component={Profile} />

						{/* Protected Routes */}
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/add-experience" component={AddExperience} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/add-education" component={AddEducation} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/feed" component={Posts} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/post/:id" component={SinglePost} />
						</Switch>

						{/* 404 Page */}
						<Route exact path="/not-found" component={PageNotFound} />
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCheckAuthentication: () => dispatch(actions.checkAuthentication())
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
