import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import './About.css';
import { States } from '../../Store/Store';
import plus from "../../assets/img/plus.png";
import check from "../../assets/img/check.png"; // Icon for "Remove Favourite"
import countryCodes, { calDate, calTime, calMoney } from "../../assets/Api/api";
import play from '../../assets/img/play-button.png';
import pause from '../../assets/img/pause.png';

function About() {
  const { setShowSuggestions, smallSidebar, favourite, toggleFavourite } = useContext(States);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const [movieCredits, setMovieCredits] = useState(null)

  async function fetchMovieTrailer(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=c21b18d183786cd4be5c3a6f768b1d95`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        // Filter for trailers
        const trailers = data.results.filter(video => video.type === 'Trailer');
        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&rel=0&fs=1&showinfo=0&disablekb=1&iv_load_policy=3`;
          setTrailerUrl(trailerUrl); // Set the trailer URL
        } else {
          j
          console.log('No trailers available.');
        }
      } else {
        console.log('No videos available.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  }

  async function fetchMovieCredits(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c21b18d183786cd4be5c3a6f768b1d95`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieCredits(data.cast)
    } catch (error) {
      console.error('Error fetching movie cast:', error);
    }
  }

  async function fetchTVCredits(tvId) {
    const url = `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=c21b18d183786cd4be5c3a6f768b1d95`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieCredits(data.cast)
    } catch (error) {
      console.error('Error fetching TV show cast:', error);
    }
  }

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setShowSuggestions(false);
      try {
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=c21b18d183786cd4be5c3a6f768b1d95`
        );
        const tvData = await tvResponse.json();

        if (tvData.success === false) {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=c21b18d183786cd4be5c3a6f768b1d95`
          );
          const movieData = await movieResponse.json();
          setMovieDetails(movieData);
          fetchMovieTrailer(id);
          fetchMovieCredits(id);
        } else {
          setMovieDetails(tvData);
          fetchMovieTrailer(id);
          fetchTVCredits(id);
        }
      } catch (error) {
        console.error("Error fetching movie or TV show details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, setShowSuggestions]);

  const handlePlayTrailer = () => {
    setShowTrailer((pre) => !pre);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + ". . . . .  ";
    }
    return text;
  };

  const handleReadMore = () => {
    setShowFullOverview((prev) => !prev);
  };

  const isFavourite = favourite[id] !== undefined;

  return (
    <div className="about">
      <div className={smallSidebar ? "small" : "big"}>
        {movieDetails ? (
          <div className='about-container'>
            <div className="about-poster" style={{ backgroundImage: showTrailer ? '' : `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {!showTrailer ? (
                <>
                  <div className="about-side-dark">
                    <div className="about-movie">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                        alt={movieDetails.title || movieDetails.name}
                      />
                      <div className='genres'>
                        {movieDetails.genres.map((genre) => (
                          <p key={genre.id}>{genre.name}</p>
                        ))}
                      </div>
                      <h1 className='title'>{movieDetails.title || movieDetails.name}</h1>
                      <p className='overview'>
                        {showFullOverview
                          ? movieDetails.overview
                          : truncateText(movieDetails.overview, 25)}
                        {movieDetails.overview.split(' ').length > 25 && (
                          <button onClick={handleReadMore} className="read-more-btn">
                            {showFullOverview ? `Show Less` : ' Show More'}
                          </button>
                        )}
                      </p>
                      <div className="about-btn">
                        <div className="fav-link">
                          <a href={movieDetails.homepage || `https://chatgpt.com`} target='_blank' rel="noopener noreferrer">
                            <div className="details">Know More</div>
                          </a>
                          <div className="add-fav" onClick={() => toggleFavourite(id, movieDetails)} >
                            <img src={isFavourite ? check : plus} alt={isFavourite ? "Remove Favourite" : "Add Favourite"} />
                            {isFavourite ? "Remove from Favourite" : "Add to Favourite"}
                          </div>
                        </div>
                        <div className="player1" onClick={handlePlayTrailer}>
                          <img src={play} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <iframe
                    className="trailer-iframe"
                    width="100%"
                    height="500"
                    src={trailerUrl}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  >
                  </iframe>
                  <div className="player2" onClick={handlePlayTrailer}>
                    <img src={pause} alt="" />
                  </div>
                </>
              )}
            </div>
            {movieDetails.name ? (
              <div className="about-info-columnn">
                <div className="about-info-row-1">
                  <div className='more-info'>
                    <strong className='status'>Status : </strong>
                    <p>
                      {movieDetails.status} {movieDetails.in_production ? "( Still in Production )" : "( Production has Stopped )"}
                    </p>
                  </div>
                  <div className='more-info'>
                    <strong className='run-time'>Running time : </strong>
                    <p>
                      {movieDetails.episode_run_time > 0 ? calTime(movieDetails.episode_run_time) : "Not Revealed"}
                    </p>
                  </div>
                  <div className='more-info'>
                    <strong>Seasons : </strong>
                    <p>{movieDetails.number_of_seasons}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Episodes : </strong>
                    <p>{movieDetails.number_of_episodes}</p>
                  </div>
                  <div className='more-info'>
                    <strong className='air-date'>Airing date : </strong>
                    <p>{calDate(movieDetails.first_air_date)} - {calDate(movieDetails.last_air_date)}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Rating : </strong>
                    <p>{movieDetails.vote_average.toFixed(1)}/10</p>
                  </div>
                  <div className='more-info'>
                    <strong className='country'>Country : </strong>
                    <p>{movieDetails.production_countries.map(country => countryCodes[country.iso_3166_1]).join(', ')}</p>
                  </div>
                  <div className='more-info'>
                    <strong className='sp-lan'>languages : </strong>
                    <p>{movieDetails.spoken_languages.map(language => language.english_name).join(', ')}</p>
                  </div>
                </div>

                <div className="about-info-row-2">
                  <strong>Cast:</strong>
                  <div className="cast pro-comp">
                    {movieCredits && movieCredits.map((cast, index) => (
                      <div key={index} className="creater">
                        <img src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} alt={cast.name} />
                        <div>
                          <p>{cast.name}</p>
                          <span>as {cast.character}</span><br />
                          <span>{cast.known_for_department}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <strong>production Companies:</strong>
                  <div className="pro-comp">
                    {movieDetails.production_companies.map((item, index) => (
                      <div key={index} className="production-company">
                        <img src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt={item.name} />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="about-info-columnn">
                <div className="about-info-row-1">
                  <div className='more-info'>
                    <strong>Status : </strong>
                    <p>{movieDetails.status}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Running time : </strong>
                    <p>{calTime(movieDetails.runtime)}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Budget : </strong>
                    <p>{movieDetails.budget > 0 ? calMoney(movieDetails.budget) : "Not Revealed"}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Revenue : </strong>
                    <p>{movieDetails.revenue > 0 ? calMoney(movieDetails.revenue) : "Not Revealed"}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Release date : </strong>
                    <p>{calDate(movieDetails.release_date)}</p>
                  </div>
                  <div className='more-info'>
                    <strong>Rating : </strong>
                    <p>{movieDetails.vote_average.toFixed(1)}/10</p>
                  </div>
                  <div className='more-info'>
                    <strong>Country : </strong>
                    <p>{movieDetails.production_countries.map(country => countryCodes[country.iso_3166_1]).join(', ')}</p>
                  </div>
                </div>
                <div className="about-info-row-2">
                  <strong>Cast:</strong>
                  <div className="cast pro-comp">
                    {movieCredits && movieCredits.map((cast, index) => (
                      <div key={index} className="creater">
                        <img src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} alt={cast.name} />
                        <div>
                          <p>{cast.name}</p>
                          <span>as {cast.character}</span><br />
                          <span>{cast.known_for_department}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <strong>production Companies:</strong>
                  <div className="pro-comp">
                    {movieDetails.production_companies.map((item, index) => (
                      <div key={index} className="production-company">
                        <img src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt={item.name} />
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default About;
