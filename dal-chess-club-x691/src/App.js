import './App.css';
import imporve from "./pages/improve";
import library from "./pages/library";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/" exact Component={library}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
