// Import React, Hooks, and the css file
import React, { useState, useEffect } from "react";
import "./App.css";

//function for the application
function App() {
	// Use useState hook to store and set the data variables
	const [data, setdata] = useState({
		flaskConnected: "",
		date: "",
	});

	// Using useEffect for rendering
	useEffect(() => {

		// Use fetch to grab the data in the flask server
		fetch("/data").then((res) =>
			res.json().then((data) => {

				// Set the variables using data from the flask server
				setdata({
					flaskConnected: data.flaskConnected,
					date: data.Date,
				});
			})
		);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h1>React and flask</h1>

				{/* The data will be displayed here*/}
				<p>{data.flaskConnected}</p>
				<p>{data.date}</p>
			</header>
		</div>
	);
}

//Allows the App to be exported
export default App;
