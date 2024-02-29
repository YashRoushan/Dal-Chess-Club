import React, { useEffect } from 'react';
import './App.css';
import Tournaments from './pages/tournaments.js';
import News from './pages/News';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";

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
      <Router>
        <NavBar />
        <Routes>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
          <Route path="/library" element={<Library />} />
          <Route path="/improve" element={<Improve />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
