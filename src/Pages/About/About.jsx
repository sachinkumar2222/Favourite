import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './About.css';
import { States } from '../../Store/Store';

function About() {
  const { setShowSuggestions } = useContext(States);
  const { id } = useParams(); // Extract the movie or TV show id from the URL
  const [movieDetails, setMovieDetails] = useState(null);

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
      console.log(movieDetails);
    };

    fetchMovieDetails();
  }, [id, setShowSuggestions]);

  return (
    <div className="about">
      {movieDetails ? (
        <>
          <h1>{movieDetails.title || movieDetails.name}</h1>
          <p>{movieDetails.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title || movieDetails.name}
          />
        </>
      ) : (
        <p>Loading movie/TV show details...</p>
      )}
    </div>
  );
}

export default About;
