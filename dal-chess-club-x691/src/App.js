import './App.css';
import AboutUsPage from './pages/about-us';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FAQpage from './pages/faq';
 
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQpage />} />
        </Routes>
      </Router>
    </div>
  );
}
 
export default App;