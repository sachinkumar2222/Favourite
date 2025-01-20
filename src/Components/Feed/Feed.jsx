import React from 'react';
import "./Feed.css";
import heart1 from "../../assets/img/heart1.png";
import heart2 from "../../assets/img/heart2.png";
import star from "../../assets/img/star.png";
import languageMapping from '../../assets/language.js';
import { Link } from 'react-router-dom';

function Feed({ item, favourite, toggleFavourite }) {
  const formattedRating = item.vote_average.toFixed(1);

  return (
    <div className="feed">
      <div className="feed-content">
        <div className="film-poster">
          <Link to={`/about-movie/${item.id}`}><img
            className="film-poster-img"
            alt={item.original_title}
            src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
          /></Link>
          <div className="film-rate-fav">
            <div className="film-rate">
              <img src={star} alt="star" />
              <span>{formattedRating}</span>
            </div>
            <div className="fav" onClick={() => toggleFavourite(item.id, item)}>
              {favourite ? <img src={heart2} alt="heart filled" /> : <img src={heart1} alt="heart empty" />}
            </div>
          </div>
        </div>
        <Link to={`/about-movie/${item.id}`}>
          <div className="film-detail">
            <h3 className="film-name">{item.title}</h3>
            <div className="fd-infor">
              <span className="fdi-item">{languageMapping[`${item.original_language}`]}</span>
              <span className="dot"></span>
              <span className="fdi-item">25m</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Feed;
