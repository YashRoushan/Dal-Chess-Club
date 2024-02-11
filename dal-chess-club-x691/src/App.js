import './App.css';
import AboutUsPage from './pages/about-us';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/about-us" element={<AboutUsPage />} />
        </Routes>
      </Router>
    </div>
  );
}
 
export default App;




















// import './App.css';
// import AboutUsPage from './about-us';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           {/* <Route path="/" element={<Home />} /> */}
//           <Route path="/about-us" element={<AboutUsPage />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
