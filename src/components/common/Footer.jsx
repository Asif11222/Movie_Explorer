import React from 'react';
import { Film, Code2, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-content">
        <div className="brand-logo">
          <div className="brand-icon-wrapper">
            <Film className="brand-icon" />
          </div>
          <span>Cine<span className="text-gradient-primary">Pulse</span></span>
        </div>

        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Discover and explore thousands of television series, movies, ratings, and casts powered by the public TVMaze database.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a 
            href="https://www.tvmaze.com/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem' }}
          >
            <span>TVMaze API Docs</span>
            <ExternalLink size={14} />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem' }}
          >
            <Code2 size={14} />
            <span>GitHub Repository</span>
          </a>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CinePulse MovieExplorer. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with React &amp; <Heart size={14} color="#e11d48" fill="#e11d48" /> for Assignment 2
          </p>
        </div>
      </div>
    </footer>
  );
}
