import React, { useState, useEffect, useMemo } from 'react';
import { fetchShows, searchShows } from '../services/tvmazeApi';
import MovieCard from '../components/common/MovieCard';
import SkeletonCard from '../components/common/SkeletonCard';
import SearchBar from '../components/movies/SearchBar';
import { Film, AlertCircle, RefreshCw, SlidersHorizontal } from 'lucide-react';

const GENRES = ['All', 'Drama', 'Action', 'Comedy', 'Science-Fiction', 'Thriller', 'Romance', 'Crime', 'Adventure'];

export default function MovieListingPage({ onSelectShow }) {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Initial load of shows from /shows
  const loadInitialShows = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShows(0);
      setShows(data);
    } catch (err) {
      setError('Unable to fetch shows from TVMaze. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialShows();
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If user cleared search, reload initial shows if not already loaded
      if (shows.length === 0 && !loading) {
        loadInitialShows();
      }
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        const results = await searchShows(searchTerm);
        setShows(results);
        setError(null);
      } catch (err) {
        setError('Error performing search. Please try again.');
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    loadInitialShows();
  };

  // Filter and Sort shows locally
  const filteredShows = useMemo(() => {
    return shows
      .filter((show) => {
        if (selectedGenre === 'All') return true;
        return show.genres && show.genres.includes(selectedGenre);
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating?.average || 0) - (a.rating?.average || 0);
        }
        if (sortBy === 'year') {
          return (b.premiered || '').localeCompare(a.premiered || '');
        }
        if (sortBy === 'name') {
          return (a.name || '').localeCompare(b.name || '');
        }
        return 0; // Default / popular order
      });
  }, [shows, selectedGenre, sortBy]);

  return (
    <main className="container" style={{ padding: '2.5rem 1.5rem 5rem' }} id="movie-listing-page">
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
          Explore <span className="text-gradient-primary">Movies &amp; Shows</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
          Browse through our curated catalog of international television shows and cinema releases.
        </p>
      </div>

      {/* Prominent Search Bar */}
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClearSearch}
        totalCount={filteredShows.length}
        isSearching={isSearching}
      />

      {/* Filter and Sort Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '0.75rem 1rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)'
      }}>
        {/* Genre Pill Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <SlidersHorizontal size={14} /> Genre:
          </span>
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setSelectedGenre(genre)}
              className="btn btn-sm"
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                background: selectedGenre === genre ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedGenre === genre ? '#ffffff' : 'var(--text-muted)',
                borderRadius: 'var(--radius-full)',
                border: selectedGenre === genre ? 'none' : '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease'
              }}
              id={`genre-filter-${genre.toLowerCase()}`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <label htmlFor="sort-select" style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Sort by:
          </label>
          <select 
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-surface-elevated)',
              color: '#ffffff',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.35rem 0.75rem',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="popular">Popular Default</option>
            <option value="rating">Highest Rated</option>
            <option value="year">Newest Release</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: 'rgba(225, 29, 72, 0.12)',
          border: '1px solid rgba(225, 29, 72, 0.3)',
          borderRadius: 'var(--radius-md)',
          color: '#fda4af',
          marginBottom: '2rem'
        }}>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: '0.95rem' }}>{error}</div>
          <button 
            type="button" 
            onClick={loadInitialShows}
            className="btn btn-secondary btn-sm"
            style={{ color: '#ffffff' }}
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Movie Grid */}
      <div className="movies-grid" id="movies-grid-container">
        {loading || isSearching ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))
        ) : filteredShows.length > 0 ? (
          filteredShows.map((show) => (
            <MovieCard 
              key={show.id} 
              show={show} 
              onSelect={onSelectShow} 
            />
          ))
        ) : (
          /* Empty Search State */
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '5rem 1rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Film size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Movies Found</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
              We couldn't find any shows matching "{searchTerm}" {selectedGenre !== 'All' ? `in category "${selectedGenre}"` : ''}. Try another keyword or reset filters.
            </p>
            <button 
              type="button" 
              onClick={handleClearSearch}
              className="btn btn-primary btn-sm"
              id="empty-state-reset-btn"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
