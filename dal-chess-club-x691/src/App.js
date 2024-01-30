import './App.css';
import Tournaments from './pages/Tournaments';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Base auto-generated Page Layout for App, structure and values expected to change

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/tournaments" exact component={Tournaments} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
