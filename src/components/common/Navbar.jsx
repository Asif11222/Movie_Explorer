import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Film, Compass, Tv } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" id="nav-brand-logo" aria-label="CinePulse Home">
          <div className="brand-icon-wrapper">
            <Film className="brand-icon" />
          </div>
          <span>Cine<span className="text-gradient-primary">Pulse</span></span>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                id="nav-link-home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/movies" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                id="nav-link-movies"
              >
                Browse Movies
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Button */}
        <div>
          <Link to="/movies" className="btn btn-primary btn-sm nav-cta-btn" id="nav-explore-btn">
            <Compass size={16} />
            <span>Explore Shows</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
