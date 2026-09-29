import React, { useEffect, useRef, useState } from 'react';
import { X, Star, Calendar, Clock, Globe, Tv, Film, ExternalLink, Play, RotateCcw } from 'lucide-react';
import { getYear, formatRating, stripHtml } from '../../services/tvmazeApi';
import TrailerPlayer from './TrailerPlayer';

export default function MovieModal({ show, onClose, autoPlay = false }) {
  const dialogRef = useRef(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(autoPlay);

  // Reset trailer state when show changes
  useEffect(() => {
    setIsPlayingTrailer(Boolean(autoPlay));
  }, [show, autoPlay]);

  // Close on Escape key and prevent background scroll
  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  const posterImg = show.image?.original || show.image?.medium;
  const rating = formatRating(show.rating);
  const releaseYear = getYear(show.premiered);
  const summaryText = stripHtml(show.summary);
  const networkName = show.network?.name || show.webChannel?.name || 'TV Broadcast / Streaming';
  const runtime = show.averageRuntime || show.runtime ? `${show.averageRuntime || show.runtime} mins` : 'N/A';

  // Backdrop click handler
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay modal-backdrop-anim" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      id="movie-details-modal"
    >
      <div className="modal-dialog modal-content-anim" ref={dialogRef}>
        {/* Close Button top-right */}
        <button 
          type="button"
          onClick={onClose}
          className="modal-close-icon-btn"
          id="modal-close-icon-btn"
          aria-label="Close details modal"
        >
          <X size={20} />
        </button>

        {/* Video Player or Modal Banner Backdrop */}
        {isPlayingTrailer ? (
          <div style={{ position: 'relative' }}>
            <TrailerPlayer show={show} onClose={() => setIsPlayingTrailer(false)} />
            <button 
              type="button" 
              onClick={() => setIsPlayingTrailer(false)}
              className="btn btn-secondary btn-sm"
              style={{ 
                position: 'absolute', 
                top: '12px', 
                left: '12px', 
                zIndex: 20,
                background: 'rgba(0,0,0,0.7)',
                fontSize: '0.78rem',
                gap: '0.35rem'
              }}
            >
              <RotateCcw size={13} />
              <span>Back to Banner</span>
            </button>
          </div>
        ) : (
          <div className="modal-banner">
            {posterImg ? (
              <img 
                src={posterImg} 
                alt={`${show.name} backdrop`} 
                className="modal-banner-img"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at center, #1e293b 0%, #0d1222 100%)' }} />
            )}
            <div className="modal-banner-gradient" />

            {/* Prominent Play Trailer Action Button */}
            <div className="banner-play-overlay">
              <button 
                type="button" 
                onClick={() => setIsPlayingTrailer(true)} 
                className="play-circle-btn"
                id="banner-start-trailer-btn"
              >
                <Play size={22} fill="#ffffff" />
                <span>Watch Trailer &amp; Clips</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Content */}
        <div className="modal-body">
          {/* Left Column: Poster Thumbnail */}
          <div className="modal-poster-col">
            <div className="modal-poster-card">
              {posterImg ? (
                <img src={posterImg} alt={show.name} />
              ) : (
                <div className="poster-fallback" style={{ height: '100%' }}>
                  <Film size={32} color="var(--primary)" />
                  <span style={{ fontSize: '0.8rem' }}>No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: In-depth Details */}
          <div className="modal-details-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 className="modal-title text-gradient" id="modal-title" style={{ margin: 0 }}>
                {show.name}
              </h2>

              {!isPlayingTrailer && (
                <button 
                  type="button" 
                  onClick={() => setIsPlayingTrailer(true)} 
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.35rem', padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                >
                  <Play size={14} fill="#ffffff" />
                  <span>Play Trailer</span>
                </button>
              )}
            </div>

            {/* Meta Strip */}
            <div className="modal-meta-strip" style={{ marginTop: '0.75rem' }}>
              <div className="modal-meta-item">
                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                <span style={{ fontWeight: 700, color: '#fbbf24' }}>
                  {rating}
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>/ 10</span>
              </div>

              <div className="modal-meta-item">
                <Calendar size={15} color="var(--text-muted)" />
                <span>Premiered: {show.premiered || 'TBA'}</span>
              </div>

              <div className="modal-meta-item">
                <Clock size={15} color="var(--text-muted)" />
                <span>{runtime}</span>
              </div>
            </div>

            {/* Genres */}
            {show.genres && show.genres.length > 0 && (
              <div className="genre-tags" style={{ marginBottom: '1.25rem' }}>
                {show.genres.map((g) => (
                  <span key={g} className="genre-tag" style={{ background: 'rgba(225, 29, 72, 0.15)', color: '#fda4af', border: '1px solid rgba(225, 29, 72, 0.3)' }}>
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Overview / Summary */}
            <h3 className="modal-summary-title">Overview</h3>
            <p className="modal-summary-text">
              {summaryText}
            </p>

            {/* Extra Metadata Grid */}
            <div className="modal-extra-grid">
              <div>
                <div className="extra-item-label">Status</div>
                <div className="extra-item-value">{show.status || 'Unknown'}</div>
              </div>
              <div>
                <div className="extra-item-label">Language</div>
                <div className="extra-item-value">{show.language || 'English'}</div>
              </div>
              <div>
                <div className="extra-item-label">Network / Stream</div>
                <div className="extra-item-value">{networkName}</div>
              </div>
              <div>
                <div className="extra-item-label">Type</div>
                <div className="extra-item-value">{show.type || 'Show'}</div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="modal-footer">
              <button 
                type="button" 
                onClick={() => setIsPlayingTrailer(prev => !prev)} 
                className="btn btn-secondary btn-sm"
                id="modal-toggle-trailer-btn"
              >
                <Play size={15} fill={isPlayingTrailer ? "none" : "#ffffff"} />
                <span>{isPlayingTrailer ? 'Hide Trailer' : 'Watch Trailer'}</span>
              </button>

              {show.officialSite && (
                <a 
                  href={show.officialSite} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                  id="modal-official-site-btn"
                >
                  <Globe size={15} />
                  <span>Official Website</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {show.url && (
                <a 
                  href={show.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                  id="modal-tvmaze-link-btn"
                >
                  <Tv size={15} />
                  <span>TVMaze Info</span>
                  <ExternalLink size={13} />
                </a>
              )}
              <button 
                type="button" 
                onClick={onClose} 
                className="btn btn-primary btn-sm"
                id="modal-footer-close-btn"
              >
                <X size={16} />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
