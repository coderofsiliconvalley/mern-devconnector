import React, { Component } from "react";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Boostrap App-Wide Style sheet
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<h1>React App Hello</h1>
				<Footer />
			</div>
		);
	}
}

export default App;
