import React, { useState } from 'react';
import { Star, Calendar, Film, Info, Play } from 'lucide-react';
import { getYear, formatRating } from '../../services/tvmazeApi';

export default function MovieCard({ show, onSelect }) {
  const [imgError, setImgError] = useState(false);
  
  if (!show) return null;

  const posterUrl = show.image?.medium || show.image?.original;
  const rating = formatRating(show.rating);
  const releaseYear = getYear(show.premiered);
  const genres = show.genres?.slice(0, 2) || [];

  return (
    <article className="movie-card" id={`movie-card-${show.id}`}>
      {/* Poster with aspect ratio container */}
      <div className="movie-poster-wrapper">
        {posterUrl && !imgError ? (
          <img 
            src={posterUrl} 
            alt={show.name || 'Movie Poster'} 
            className="movie-poster"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="poster-fallback" aria-label="No poster available">
            <Film size={36} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '140px' }}>
              {show.name || 'No Poster'}
            </span>
          </div>
        )}

        {/* Hover Quick Play Trailer Button */}
        <button
          type="button"
          onClick={() => onSelect(show, true)}
          className="card-hover-play-btn"
          id={`play-trailer-card-${show.id}`}
          aria-label={`Play trailer for ${show.name}`}
        >
          <Play size={15} fill="#ffffff" />
          <span>Watch Trailer</span>
        </button>

        {/* Rating Badge */}
        <div className="rating-badge" aria-label={`Rating: ${rating} out of 10`}>
          <Star size={13} fill="#fbbf24" color="#fbbf24" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="movie-info">
        <h3 className="movie-title" title={show.name}>
          {show.name}
        </h3>

        <div className="movie-meta">
          <span className="meta-item">
            <Calendar size={13} color="var(--text-muted)" />
            <span>{releaseYear}</span>
          </span>
          {show.language && (
            <>
              <span>•</span>
              <span className="meta-item">{show.language}</span>
            </>
          )}
        </div>

        {/* Genre Tags */}
        {genres.length > 0 && (
          <div className="genre-tags">
            {genres.map((genre) => (
              <span key={genre} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons: Details and Watch */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: 'auto' }}>
          <button 
            type="button"
            onClick={() => onSelect(show, false)}
            className="btn btn-secondary btn-sm"
            id={`see-details-btn-${show.id}`}
            aria-label={`See details for ${show.name}`}
            style={{ padding: '0.45rem 0.5rem', fontSize: '0.8rem' }}
          >
            <Info size={14} />
            <span>Details</span>
          </button>

          <button 
            type="button"
            onClick={() => onSelect(show, true)}
            className="btn btn-primary btn-sm"
            id={`watch-trailer-btn-${show.id}`}
            aria-label={`Watch trailer for ${show.name}`}
            style={{ padding: '0.45rem 0.5rem', fontSize: '0.8rem' }}
          >
            <Play size={14} fill="#ffffff" />
            <span>Trailer</span>
          </button>
        </div>
      </div>
    </article>
  );
}
