import React, { useEffect, useRef } from 'react';
import { X, Star, Calendar, Clock, Globe, Tv, Film, ExternalLink } from 'lucide-react';
import { getYear, formatRating, stripHtml } from '../../services/tvmazeApi';

export default function MovieModal({ show, onClose }) {
  const dialogRef = useRef(null);

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
  const networkName = show.network?.name || show.webChannel?.name || 'Unknown Network';
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

        {/* Modal Banner Backdrop */}
        <div className="modal-banner">
          {posterImg ? (
            <img 
              src={posterImg} 
              alt={`${show.name} backdrop`} 
              className="modal-banner-img"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1c263d 0%, #0d1222 100%)' }} />
          )}
          <div className="modal-banner-gradient" />
        </div>

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
            <h2 className="modal-title text-gradient" id="modal-title">
              {show.name}
            </h2>

            {/* Meta Strip */}
            <div className="modal-meta-strip">
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
                  <span>TVMaze Page</span>
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
