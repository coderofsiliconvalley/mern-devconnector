import React, { Component } from "react";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Landing from "./components/Layout/Landing";

// Boostrap App-Wide Style sheet
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<Landing />
				<Footer />
			</div>
		);
	}
}

export default App;
