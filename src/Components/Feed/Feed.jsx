import React from 'react';
import "./Feed.css";
import heart1 from "../../assets/img/heart1.png";
import heart2 from "../../assets/img/heart2.png";
import star from "../../assets/img/star.png";
import { Link } from 'react-router-dom';

function Feed({ item, favourite, toggleFavourite }) {
  const formattedRating = item.vote_average.toFixed(1);
  const type = item.title ? "Movie" : "TV Show";
  const year = (item.release_date || item.first_air_date || "").substring(0, 4);

  return (
    <div className="feed">
      <div className="film-poster">
        {/* Favorite Button on Poster */}
        <div className="fav-overlay" onClick={(e) => { e.preventDefault(); toggleFavourite(item.id, item); }}>
          {favourite ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#e50914" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          )}
        </div>

        <Link to={`/about-movie/${item.id}?type=${item.media_type || (item.title ? 'movie' : 'tv')}`}>
          <img
            className="film-poster-img"
            alt={item.original_title}
            src={`https://image.tmdb.org/t/p/w780/${item.poster_path}`}
          />
        </Link>
      </div>

      <div className="film-detail">
        <Link to={`/about-movie/${item.id}?type=${item.media_type || (item.title ? 'movie' : 'tv')}`}>
          <h3 className="film-name">{item.title || item.name}</h3>
        </Link>
        <div className="film-meta">
          <div className="rating">
            <img src={star} alt="star" />
            <span>{formattedRating}</span>
          </div>
          <span className="year">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default Feed;
