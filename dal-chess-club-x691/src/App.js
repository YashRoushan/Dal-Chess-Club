import './App.css';
import Tournaments from './pages/Tournaments';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/tournaments" element={<Tournaments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



/*import logo from './logo.svg';
import './App.css';

//Base auto-generated Page Layout for App, structure and values expected to change

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

