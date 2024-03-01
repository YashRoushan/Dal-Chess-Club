import './App.css';
import Tournaments from './pages/tournaments.js';
import NewsPage from './pages/news.js'
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";
import AboutUsPage from './pages/about-us';
import FAQpage from './pages/faq';
import AdminLogin from './pages/adminLogin.js';
import AdminLanding from './pages/adminLanding.js';
import AddFormAboutUs from './forms/addForm-AboutUs.js';
import HomeAddForm from './forms/Home-AddForm.js';
import TournamentsAddForm from './forms/Tournaments-AddForm.js';
import FAQAddForm from './forms/FAQ-AddForm.js';
import NewsAddForm from './forms/News-AddForm.js';

 
function App() {
  return (
    <div className="App">
    <Router basename='/chessclub'>
        <NavBar />
        <Routes>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/improve" element={<Improve />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQpage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminLanding" element={<AdminLanding />} />
          <Route path="/addForm-AboutUs" element={<AddFormAboutUs />} />
          <Route path="/Home-AddForm" element={<HomeAddForm />} />
          <Route path="/Tournaments-AddForm" element={<TournamentsAddForm />} />
          <Route path="/FAQ-AddForm" element={<FAQAddForm />} />
          <Route path="/News-AddForm" element={<NewsAddForm />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;