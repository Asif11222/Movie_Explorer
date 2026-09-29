import React, { useState } from 'react';
import { Star, Calendar, Film, Info } from 'lucide-react';
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

        {/* See Details Button */}
        <button 
          type="button"
          onClick={() => onSelect(show)}
          className="btn btn-secondary btn-sm movie-card-btn"
          id={`see-details-btn-${show.id}`}
          aria-label={`See details for ${show.name}`}
        >
          <Info size={15} />
          <span>See Details</span>
        </button>
      </div>
    </article>
  );
}
