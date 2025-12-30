import { createContext, useState, useEffect } from "react";

export const States = createContext();

const ContextProvider = ({ children }) => {
  const [smallSidebar, setSmallSidebar] = useState(true);
  const [favourite, setFavourite] = useState([]); // Initialize as Array

  // ...


  const [apiData, setApiData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const sData = async (searchTerm) => {
    // setIsLoading(true); // Don't block UI for search suggestions
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c21b18d183786cd4be5c3a6f768b1d95&query=${searchTerm}&page=${page}`
      );
      const movieData = await movieResponse.json();

      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=c21b18d183786cd4be5c3a6f768b1d95&query=${searchTerm}&page=${page}`
      );
      const tvData = await tvResponse.json();

      const movies = (movieData.results || []).map((item) => ({ ...item, media_type: 'movie' }));
      const tvs = (tvData.results || []).map((item) => ({ ...item, media_type: 'tv' }));

      const combinedResults = [...movies, ...tvs];

      if (combinedResults.length > 0) {
        setSearchResults(combinedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    } finally {
      // setIsLoading(false);
    }
  };

  // Fetch popular data (Movies, TV shows, Anime) based on page
  const fData = async () => {
    setIsLoading(true);
    try {
      // Popular movies
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=c21b18d183786cd4be5c3a6f768b1d95&page=${page}`
      );
      const movieData = await movieResponse.json();

      // Popular TV shows (including anime with genre 16)
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=c21b18d183786cd4be5c3a6f768b1d95&page=${page}`
      );
      const tvData = await tvResponse.json();

      const movies = (movieData.results || []).map((item) => ({ ...item, media_type: 'movie' }));
      const tvs = (tvData.results || []).map((item) => ({ ...item, media_type: 'tv' }));

      const combinedResults = [...movies, ...tvs];

      if (combinedResults.length > 0) {
        setApiData(combinedResults); // Set both popular movies and TV shows
      } else {
        setApiData([]); // Empty results
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiData([]); // Handle the error by clearing results
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fData();
  }, [page]);

  // Toggle favorite for movies/TV shows
  const toggleFavourite = (itemId, movieData) => {
    setFavourite((prevFavourites) => {
      // Check if item exists in array
      const isPresent = prevFavourites.some(item => item.id === itemId);

      if (isPresent) {
        // Remove item
        return prevFavourites.filter(item => item.id !== itemId);
      } else {
        // Add item
        return [...prevFavourites, movieData];
      }
    });
  };

  // Fetch by Genre
  const fetchByGenre = async (genreId) => {
    setIsLoading(true);
    setApiData([]); // Clear previous data
    try {
      // 1. Fetch Movies by Genre
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=c21b18d183786cd4be5c3a6f768b1d95&with_genres=${genreId}&page=${page}`
      );
      const movieData = await movieResponse.json();

      // 2. Fetch TV Shows by Genre
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=c21b18d183786cd4be5c3a6f768b1d95&with_genres=${genreId}&page=${page}`
      );
      const tvData = await tvResponse.json();

      const movies = (movieData.results || []).map((item) => ({ ...item, media_type: 'movie' }));
      const tvs = (tvData.results || []).map((item) => ({ ...item, media_type: 'tv' }));

      const combinedResults = [...movies, ...tvs];

      // Sort by popularity or vote_average to mix them well? 
      // For now, just interleave or concat. Random sort is fun but unpredictable.
      // Let's just concat for stability.
      setApiData(combinedResults);

    } catch (error) {
      console.error("Error fetching genre:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <States.Provider
      value={{
        smallSidebar,
        setSmallSidebar,
        favourite,
        apiData,
        searchResults,
        setSearchResults,
        showSuggestions,
        setShowSuggestions,
        isLoading,
        toggleFavourite,
        setPage,
        page,
        sData,
        fData, // Expose original fetch for "Trending"
        fetchByGenre, // Expose new genre fetch
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </States.Provider>
  );
};

export default ContextProvider;
