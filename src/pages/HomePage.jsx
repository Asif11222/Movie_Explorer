import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { fetchShows } from '../services/tvmazeApi';
import MovieCard from '../components/common/MovieCard';
import SkeletonCard from '../components/common/SkeletonCard';

export default function HomePage({ onSelectShow }) {
  const [featuredShows, setFeaturedShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadFeatured() {
      try {
        const shows = await fetchShows(0);
        if (mounted) {
          // Pick top 8 shows with highest ratings
          const sorted = [...shows]
            .filter(s => s.rating?.average)
            .sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0))
            .slice(0, 8);
          setFeaturedShows(sorted);
        }
      } catch (err) {
        console.error('Failed to load featured shows:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadFeatured();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="home-page" id="home-page">
      {/* Hero Banner Section */}
      <section className="hero-section" aria-label="Hero Banner">
        <div className="hero-background" />
        <div className="hero-backdrop-glow" />

        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Next-Level Movie Discovery</span>
          </div>

          <h1 className="hero-title">
            DISCOVER YOUR NEXT <br />
            <span className="text-gradient-primary">FAVORITE MOVIES</span>
          </h1>

          <p className="hero-description">
            Explore and discover your favorite movies and shows from around the world.
            Search thousands of titles, stream metadata, ratings, and detailed overviews in seconds.
          </p>

          <div className="hero-actions">
            <Link to="/movies" className="btn btn-primary" id="hero-cta-btn">
              <Compass size={18} />
              <span>Explore Now</span>
            </Link>
            <a href="#featured-section" className="btn btn-secondary" id="hero-learn-more-btn">
              <span>View Highlights</span>
            </a>
          </div>

          {/* Hero Statistics */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-number text-gradient-primary">50,000+</span>
              <span className="hero-stat-label">Indexed Shows</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number text-gradient-primary">Real-Time</span>
              <span className="hero-stat-label">TVMaze Sync</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number text-gradient-primary">100% Free</span>
              <span className="hero-stat-label">Public Database</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="container" style={{ padding: '3rem 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: 'rgba(225, 29, 72, 0.15)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1rem' 
            }}>
              <Zap size={22} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Instant Dynamic Search</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Type any title to instantly query the global TVMaze database with debounced live search.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: 'rgba(245, 158, 11, 0.15)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1rem' 
            }}>
              <TrendingUp size={22} color="#fbbf24" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Verified Ratings &amp; Overviews</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Inspect critical scores, premiere dates, broadcast networks, and synopses with one click.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: 'rgba(6, 182, 212, 0.15)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '1rem' 
            }}>
              <ShieldCheck size={22} color="#06b6d4" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Zero Signup Needed</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              No credit card, no registration, no ads. Enjoy a pristine, ultra-responsive cinema dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Highlights Section */}
      <section id="featured-section" className="container" style={{ padding: '2rem 1.5rem 5rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.85rem', 
              color: 'var(--primary)', 
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.4rem'
            }}>
              <TrendingUp size={14} />
              <span>Curated Selection</span>
            </div>
            <h2 style={{ fontSize: '2rem' }}>Featured &amp; Top Rated</h2>
          </div>

          <Link to="/movies" className="btn btn-secondary btn-sm" id="view-all-movies-btn">
            <span>Explore All Titles</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Featured Movies Grid */}
        <div className="movies-grid">
          {loading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          ) : (
            featuredShows.map(show => (
              <MovieCard 
                key={show.id} 
                show={show} 
                onSelect={onSelectShow} 
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
