import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Forgot from "./pages/Forgot";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Reset from "./pages/Reset";
import Feedback from "./pages/Feedback";
import Footer from "./components/Footer";
import "./App.css";
import "./index.css";
import CheaperOption from "./pages/CheaperOption";
import { UserProvider } from './AuthContext'; 

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/forgot" element={<Forgot />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/reset" element={<Reset />} />
                            <Route path="/cheaper-option" element={<CheaperOption />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>
                    <ConditionalFooter />
                </div>
            </Router>
        </UserProvider>
    );
}

// Component to conditionally render the footer
function ConditionalFooter() {
    const location = useLocation();
    const pathsToHideFooter = ["/cheaper-option"];

    return !pathsToHideFooter.includes(location.pathname) ? <Footer /> : null;
}

export default App;
