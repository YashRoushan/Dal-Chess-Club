import './App.css';
import Tournaments from './pages/tournaments.js';
import News from './pages/News';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";

function App() {
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
