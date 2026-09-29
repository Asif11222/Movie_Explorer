import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MovieModal from './components/common/MovieModal';
import HomePage from './pages/HomePage';
import MovieListingPage from './pages/MovieListingPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [autoPlayTrailer, setAutoPlayTrailer] = useState(false);

  const handleSelectShow = (show, autoPlay = false) => {
    setSelectedShow(show);
    setAutoPlayTrailer(Boolean(autoPlay));
  };

  const handleCloseModal = () => {
    setSelectedShow(null);
    setAutoPlayTrailer(false);
  };

  return (
    <BrowserRouter>
      <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage onSelectShow={handleSelectShow} />} />
            <Route path="/movies" element={<MovieListingPage onSelectShow={handleSelectShow} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Details & Video Trailer Modal */}
        <MovieModal 
          show={selectedShow} 
          onClose={handleCloseModal} 
          autoPlay={autoPlayTrailer} 
        />

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
