import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, totalCount, isSearching }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <Search className="search-icon" aria-hidden="true" />
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for movies or shows (e.g. Batman, Friends, Girls)..."
          className="search-input"
          id="movie-search-input"
          aria-label="Search movies by title"
          autoComplete="off"
        />

        {value && (
          <button 
            type="button" 
            onClick={onClear} 
            className="search-clear-btn"
            id="search-clear-btn"
            aria-label="Clear search input"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Sub-label query indicator */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: '0.65rem', 
        padding: '0 0.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <span>
          {isSearching ? (
            <span>Searching TVMaze database...</span>
          ) : value ? (
            <span>Results for <strong style={{ color: '#ffffff' }}>"{value}"</strong> ({totalCount} found)</span>
          ) : (
            <span>Browsing curated popular shows ({totalCount} available)</span>
          )}
        </span>
      </div>
    </div>
  );
}
