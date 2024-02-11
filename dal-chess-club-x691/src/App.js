import './App.css';
import Improve from "./pages/improve";
import Library from "./pages/library";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
        <Route path="/library" element={<Library />} />
        <Route path="/improve" element={<Improve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
