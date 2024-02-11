import './App.css';
import Tournaments from './pages/tournaments.js';
import News from './pages/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
          <Route path="/library" element={<Library />} />
          <Route path="/improve" element={<Improve />} />
        </Routes>
    </Router>
    </div>
  );
}
export default App;
