import React, { useState } from 'react';
import { Play, X, ExternalLink, Film, AlertTriangle } from 'lucide-react';

/**
 * TrailerPlayer Component
 * Embeds an official HD trailer using YouTube's search embed protocol,
 * with fallback options to open directly or view teaser clip.
 */
export default function TrailerPlayer({ show, onClose }) {
  const [hasError, setHasError] = useState(false);

  if (!show) return null;

  // Search query for official trailer
  const searchQuery = encodeURIComponent(`${show.name} official trailer`);
  const embedUrl = `https://www.youtube-nocookie.com/embed?listType=search&list=${searchQuery}&autoplay=1&rel=0`;
  const directYoutubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  return (
    <div className="trailer-player-container" id={`trailer-player-${show.id}`}>
      <div className="trailer-video-wrapper">
        {!hasError ? (
          <iframe
            src={embedUrl}
            title={`${show.name} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="trailer-iframe"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="trailer-error-box">
            <Film size={44} color="var(--primary)" />
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', margin: '0.5rem 0' }}>
              Trailer Player Notice
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.25rem' }}>
              Your browser or network extension might be restricting embedded playback. You can watch the official HD trailer directly on YouTube.
            </p>
            <a 
              href={directYoutubeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm"
            >
              <ExternalLink size={15} />
              <span>Watch on YouTube</span>
            </a>
          </div>
        )}
      </div>

      {/* Trailer status notice */}
      <div className="trailer-badge-bar">
        <span className="trailer-live-tag">
          <span className="pulse-dot"></span> NOW PLAYING TRAILER: {show.name}
        </span>
        <a 
          href={directYoutubeUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="trailer-ext-link"
        >
          <span>Open in YouTube</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
