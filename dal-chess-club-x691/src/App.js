import React, { useEffect } from 'react';
import './App.css';
import Tournaments from './pages/tournaments.js';
import NewsPage from './pages/news.js';
import NavBar from './pages/navbar';
import Footer from './pages/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Improve from "./pages/improve";
import Library from "./pages/library";
import AboutUsPage from "./pages/about-us";
import FAQpage from "./pages/faq";
import { Suspense } from "react";
import HomePage from "./pages/Home";
import AdminLogin from './pages/adminLogin.js';
import AdminLanding from './pages/adminLanding.js';
import EditTournaments from './pages/editPage-tournaments.js';
import EditAbout from './pages/editPage-about.js';
import EditLibrary from './pages/editPage-library.js';
import EditFaq from './pages/editPage-faq.js';
import EditTrainer from './pages/editPage-trainers.js';
import EditEvent from './pages/editPage-events.js';
import EditNews from './pages/editPage-news.js';
import AddFormAboutUs from './forms/AboutUs-AddForm.js';
import HomeAddForm from './forms/Home-AddForm.js';
import TournamentsAddForm from './forms/Tournaments-AddForm.js';
import FAQAddForm from './forms/FAQ-AddForm.js';
import NewsAddForm from './forms/News-AddForm.js';
import TrainersAddForm from './forms/Trainers-AddForm.js';
import EventsAddForm from './forms/Events-AddForm.js';
import LibraryAddForm from './forms/Library_AddForm.js';
import ForgotPassword from './pages/forgotPassword.js';
import AuthGuard from './components/AuthGuard.js';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  // Move useEffect inside the App function
  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Suspense fallback="loading ...">
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
              <Route path="/" element={<HomePage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />

              {/* Admin only Routes */}
              <Route path="/adminLanding" element={<AuthGuard><AdminLanding /></AuthGuard>} />
              <Route path="/AboutUs-AddForm" element={<AuthGuard><AddFormAboutUs /></AuthGuard>} />
              <Route path="/Home-AddForm" element={<AuthGuard><HomeAddForm /></AuthGuard>} />
              <Route path="/Tournaments-AddForm" element={<AuthGuard><TournamentsAddForm /></AuthGuard>} />
              <Route path="/FAQ-AddForm" element={<AuthGuard><FAQAddForm /></AuthGuard>} />
              <Route path="/News-AddForm" element={<AuthGuard><NewsAddForm /></AuthGuard>} />
              <Route path="/Trainers-AddForm" element={<AuthGuard><TrainersAddForm /></AuthGuard>} />
              <Route path="/Events-AddForm" element={<AuthGuard><EventsAddForm /></AuthGuard>} />
              <Route path="/Library-AddForm" element={<AuthGuard><LibraryAddForm /></AuthGuard>} />
              <Route path="/editTournaments" element={<AuthGuard><EditTournaments /></AuthGuard>} />
              <Route path="/editAbout" element={<AuthGuard><EditAbout /></AuthGuard>} />
              <Route path="/editLibrary" element={<AuthGuard><EditLibrary /></AuthGuard>} />
              <Route path="/editNews" element={<AuthGuard><EditNews /></AuthGuard>} />
              <Route path="/editFaq" element={<AuthGuard><EditFaq /></AuthGuard>} />
              <Route path="/editTrainer" element={<AuthGuard><EditTrainer /></AuthGuard>} />
              <Route path="/editEvent" element={<AuthGuard><EditEvent /></AuthGuard>} />
          </Routes>
          <Footer/>
          </Router>
        </Suspense>
      </AuthProvider>
    </div>
  );
}
export default App;
