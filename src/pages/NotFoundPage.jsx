import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '65vh',
      textAlign: 'center',
      padding: '4rem 1.5rem'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(225, 29, 72, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <Film size={40} color="var(--primary)" />
      </div>

      <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem' }} className="text-gradient-primary">
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Scene Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '2rem', lineHeight: 1.6 }}>
        The page or film reel you are looking for has been moved, removed, or never existed in our directory.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
        <Link to="/movies" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Browse Movies</span>
        </Link>
      </div>
    </div>
  );
}
