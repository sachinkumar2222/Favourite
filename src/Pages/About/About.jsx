import React, { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import './About.css';
import { States } from '../../Store/Store';
import plus from "../../assets/img/plus.png";
import check from "../../assets/img/check.png";
import countryCodes, { calDate, calTime, calMoney } from "../../assets/Api/api";
import play from '../../assets/img/play-button.png';
import star from "../../assets/img/star.png";
import Feed from '../../Components/Feed/Feed';

function About() {
  const { setShowSuggestions, setSmallSidebar, favourite, toggleFavourite } = useContext(States);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') || 'movie';

  const [movieDetails, setMovieDetails] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const [credits, setCredits] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showInfo, setShowInfo] = useState(false); // Toggle for cast/production
  const [isFav, setIsFav] = useState(false);

  // --- API Fetching Functions ---

  async function fetchData(endpoint, setter) {
    const url = `https://api.themoviedb.org/3/${endpoint}?api_key=c21b18d183786cd4be5c3a6f768b1d95`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    } catch (error) { console.error(error); }
  }

  async function fetchTrailer() {
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=c21b18d183786cd4be5c3a6f768b1d95`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const trailer = data.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&modestbranding=1&rel=0`);
      }
    } catch (error) { console.error(error); }
  }

  // --- Effects ---

  useEffect(() => {
    // Reset States on ID change
    setMovieDetails(null);
    setTrailerUrl('');
    setShowTrailer(false);
    setShowFullOverview(false);
    setShowInfo(false);

    // UI Helpers
    window.scrollTo(0, 0);
    setShowSuggestions(false);
    setSmallSidebar(true);

    // Fetch Data
    fetchData(`${type}/${id}`, setMovieDetails);
    fetchData(`${type}/${id}/credits`, (data) => setCredits(data));
    fetchData(`${type}/${id}/similar`, (data) => setRecommendations(data.results));
    fetchTrailer();

  }, [id, type]);

  useEffect(() => {
    // Check if in favourites
    if (movieDetails) {
      setIsFav(favourite.some(item => item.id === movieDetails.id));
    }
  }, [favourite, movieDetails]);

  if (!movieDetails) return <Loading />;

  // --- Render Helpers ---

  const {
    title, name, backdrop_path, poster_path, vote_average, release_date, first_air_date,
    runtime, episode_run_time, genres, overview, tagline, status, revenue, budget
  } = movieDetails;

  const displayTitle = title || name;
  const displayDate = release_date || first_air_date;
  const displayYear = displayDate ? displayDate.substring(0, 4) : '';
  const displayRuntime = runtime ? calTime(runtime) : (episode_run_time?.[0] ? calTime(episode_run_time[0]) : 'N/A');
  const rating = vote_average ? vote_average.toFixed(1) : 'NR';
  const director = credits?.crew?.find(c => c.job === 'Director')?.name || 'Unknown';

  // Determine Genre Text
  const genreList = genres?.map(g => g.name).slice(0, 3) || [];

  return (
    <div className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="hero-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
            alt="backdrop"
          />
        </div>
        <div className="hero-overlay"></div>
      </div>

      {/* Content Wrapper */}
      <div className="about-content-wrapper">

        {/* Desktop Poster (Hidden on Mobile) */}
        <div className="desktop-poster-card">
          <img
            src={`https://image.tmdb.org/t/p/w780${poster_path}`}
            alt={displayTitle}
          />
        </div>

        {/* Main Details */}
        <div className="movie-header">
          <h1 className="movie-title">{displayTitle}</h1>
          {tagline && <p className="movie-tagline">“{tagline}”</p>}

          {/* Meta Data */}
          <div className="movie-meta">
            <div className="meta-item">
              <img src={star} alt="rating" />
              <span>{rating}</span>
            </div>
            <span>|</span>
            <span>{displayYear}</span>
            <span>|</span>
            <span>{displayRuntime}</span>
          </div>

          {/* Genres */}
          <div className="genres-list">
            {genreList.map((g, i) => (
              <span key={i} className="genre-pill">{g}</span>
            ))}
          </div>

          {/* Overview */}
          <div className="movie-overview">
            <p className={showFullOverview ? 'expanded' : ''}>
              {overview}
            </p>
            {overview && overview.length > 150 && (
              <button
                className="read-more-btn"
                onClick={() => setShowFullOverview(!showFullOverview)}
              >
                {showFullOverview ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="btn-glass btn-primary"
              onClick={() => trailerUrl && setShowTrailer(true)}
            >
              <img src={play} alt="play" className="btn-icon" style={{ filter: 'invert(1)' }} />
              Watch Trailer
            </button>

            <button
              className="btn-glass btn-secondary"
              onClick={() => toggleFavourite(movieDetails.id, movieDetails)}
            >
              <img src={isFav ? check : plus} alt="fav" className="btn-icon" />
              {isFav ? 'Added' : 'Add to List'}
            </button>
          </div>

        </div>
      </div>

      {/* Info Sections (Cast, Production) - Below Fold for cleaner look */}
      <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>

        <div className="section-container">
          <button className="toggle-info-btn" onClick={() => setShowInfo(!showInfo)}>
            <span>Show Cast & Production Info</span>
            <span>{showInfo ? '−' : '+'}</span>
          </button>

          {showInfo && (
            <div className="expanded-info">
              <div className="info-grid">
                <div className="info-item">
                  <h4>Director</h4>
                  <span>{director}</span>
                </div>
                <div className="info-item">
                  <h4>Status</h4>
                  <span>{status}</span>
                </div>
                {budget > 0 && (
                  <div className="info-item">
                    <h4>Budget</h4>
                    <span>{calMoney(budget)}</span>
                  </div>
                )}
                {movieDetails.production_countries?.[0] && (
                  <div className="info-item">
                    <h4>Country</h4>
                    <span>{movieDetails.production_countries[0].name}</span>
                  </div>
                )}
              </div>

              <h3 className="section-title" style={{ marginTop: '30px', fontSize: '1.2rem' }}>Top Cast</h3>
              <div className="genres-list" style={{ justifyContent: 'flex-start' }}>
                {credits?.cast?.slice(0, 5).map(actor => (
                  <Link to={`/person/${actor.id}`} key={actor.id} style={{ textDecoration: 'none' }}>
                    <span className="genre-pill" style={{ background: 'rgba(0,0,0,0.5)' }}>{actor.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="section-container">
          <h3 className="section-title">Recommended for you</h3>
          <div className="recommendations-grid-wrapper">
            {recommendations.slice(0, 10).map((item) => (
              <Feed
                key={item.id}
                item={item}
                favourite={favourite.some(f => f.id === item.id)}
                toggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <button className="close-modal" onClick={() => setShowTrailer(false)}>×</button>
          <div className="video-responsive" onClick={e => e.stopPropagation()}>
            <iframe
              src={trailerUrl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}

export default About;
