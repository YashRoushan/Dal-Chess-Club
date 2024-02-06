import './App.css';
import News from './pages/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
 return (
   <div className="App">
     <Router>
       <Routes>
         <Route path="/news" element={<News />} />
       </Routes>
     </Router>
   </div>
 );
}
export default App;
