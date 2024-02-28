import './App.css';
import Tournaments from './pages/tournaments.js';
import News from './pages/News';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";
import AboutUsPage from './pages/about-us';
import FAQpage from './pages/faq';

function App() {
  return (
    <div className="App">
    <Router basename="/chessclub">
        <NavBar />
        <Routes>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
          <Route path="/library" element={<Library />} />
          <Route path="/improve" element={<Improve />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQpage />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
  //Will add <Route path="" element={<Homepage />} /> when homepage is completed
}

export default App;