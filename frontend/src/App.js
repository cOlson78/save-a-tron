// Import React, Hooks, and the css file
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Forgot from "./pages/Forgot";
import Create from "./pages/Create";
import "./App.css";
import "./index.css";

// function to verify the react and flask connection
// Commented out for now 
// function App() {
// 	// Use useState hook to store and set the data variables
// 	const [data, setdata] = useState({
// 		flaskConnected: "",
// 		date: "",
// 	});

// 	// Using useEffect for rendering
// 	useEffect(() => {

// 		// Use fetch to grab the data in the flask server
// 		fetch("/data").then((res) =>
// 			res.json().then((data) => {

// 				// Set the variables using data from the flask server
// 				setdata({
// 					flaskConnected: data.flaskConnected,
// 					date: data.Date,
// 				});
// 			})
// 		);
// 	}, []);

// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<h1>React and flask</h1>

// 				{/* The data will be displayed here*/}
// 				<p>{data.flaskConnected}</p>
// 				<p>{data.date}</p>
// 			</header>
// 		</div>
// 	);
// }

function App() {
	return (
		<Router>
			<Navbar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/wishlist" element={<Wishlist/>}/>
				<Route path="/forgot" element={<Forgot/>}/>
				<Route path="/create" element={<Create/>}/>
			</Routes>
		</Router>
	);
}

//Allows the App to be exported
export default App;
