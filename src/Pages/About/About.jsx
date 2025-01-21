import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import './About.css';
import { States } from '../../Store/Store';
import plus from "../../assets/img/plus.png"

function About() {
  const { setShowSuggestions, smallSidebar } = useContext(States);
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);

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
        } else {
          setMovieDetails(tvData);
        }
      } catch (error) {
        console.error("Error fetching movie or TV show details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, setShowSuggestions]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '....+more';
    }
    return text;
  };

  const handleReadMore = () => {
    setShowFullOverview((prev) => !prev);
  };

  return (
    <div className="about">
      <div className={smallSidebar ? "small" : "big"}>
        {movieDetails ? (
          <div className='about-container'>
            <div className="about-poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                      : truncateText(movieDetails.overview, 25)
                    }
                    {movieDetails.overview.split(' ').length > 25 && (
                      <button onClick={handleReadMore} className="read-more-btn">
                        {showFullOverview ? '..Show Less' : ' Show More'}
                      </button>
                    )}
                  </p>
                  <div className="about-btn">
                    <div className="details">
                      Know More
                    </div>
                    <div className="add-fav">
                       <img src={plus} alt="" />
                       Add Favourite
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default About;
