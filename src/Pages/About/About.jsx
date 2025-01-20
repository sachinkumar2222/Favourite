import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './About.css';
import { States } from '../../Store/Store';

function About() {
  const {setShowSuggestions} = useContext(States);
  const { id } = useParams(); // Extract the movie id from the URL
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    setShowSuggestions(false);
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c21b18d183786cd4be5c3a6f768b1d95`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="about">
      {movieDetails ? (
        <>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          {/* Add more movie details here */}
        </>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default About;
