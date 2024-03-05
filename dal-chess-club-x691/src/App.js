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
import EditTournaments from './pages/editPage-tournaments.js';
import EditAbout from './pages/editPage-about.js';
import EditLibrary from './pages/editPage-library.js';
import EditFaq from './pages/editPage-faq.js';
import EditTrainer from './pages/editPage-trainers.js';
import EditEvent from './pages/editPage-events.js';
import EditNews from './pages/editPage-news.js';
 
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
          <Route path="/editTournaments" element={<EditTournaments />} />
          <Route path="/editAbout" element={<EditAbout />} />
          <Route path="/editLibrary" element={<EditLibrary />} />
          <Route path="/editNews" element={<EditNews />} />
          <Route path="/editFaq" element={<EditFaq />} />
          <Route path="/editTrainer" element={<EditTrainer />} />
          <Route path="/editEvent" element={<EditEvent />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;