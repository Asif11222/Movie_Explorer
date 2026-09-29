import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="movie-card" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <div className="movie-poster-wrapper skeleton" />
      <div className="movie-info">
        <div className="skeleton" style={{ height: '22px', width: '75%', marginBottom: '10px' }} />
        <div className="skeleton" style={{ height: '14px', width: '45%', marginBottom: '16px' }} />
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
          <div className="skeleton" style={{ height: '18px', width: '50px' }} />
          <div className="skeleton" style={{ height: '18px', width: '60px' }} />
        </div>
        <div className="skeleton" style={{ height: '36px', width: '100%', marginTop: 'auto' }} />
      </div>
    </div>
  );
}
