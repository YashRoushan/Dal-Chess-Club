import './App.css';
import Tournaments from './pages/tournaments.js';
import News from './pages/News';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
        <NavBar />
        <Routes>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
