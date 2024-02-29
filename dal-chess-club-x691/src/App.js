import React, { useEffect } from 'react';
import './App.css';
import Tournaments from './pages/tournaments.js';
import NewsPage from './pages/news.js';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";
import AboutUsPage from "./pages/about-us";
import FAQpage from "./pages/faq";
import { Suspense } from "react";
import HomePage from "./pages/Home";
import AdminLogin from './pages/adminLogin.js';
import AdminLanding from './pages/adminLanding.js';

function App() {
  // Move useEffect inside the App function
  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <Suspense fallback="loading ...">
        <Router basename='/chessclub'>
          <NavBar />
          <Routes>
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/improve" element={<Improve />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/faq" element={<FAQpage />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/adminLanding" element={<AdminLanding />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}
export default App;
