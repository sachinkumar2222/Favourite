import { createContext, useState, useEffect } from "react";

export const States = createContext();

const ContextProvider = ({ children }) => {
  const [smallSidebar, setSmallSidebar] = useState(true);
  const [favourite, setFavourite] = useState({});
  const [apiData, setApiData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);


  const sData = async (searchTerm) => {
    setIsLoading(true);
    try {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c21b18d183786cd4be5c3a6f768b1d95&query=${searchTerm}&page=${page}`);
      const res = await data.json();

      if (res.results) {
        setSearchResults(res.results); 
        console.log(res.results);
      } else {
        setSearchResults([]); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); 
    }
  };



  const fData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=c21b18d183786cd4be5c3a6f768b1d95&page=${page}`
      );
      const res = await data.json();

      if (res.results) {
        setApiData(res.results);
      } else {
        setApiData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fData();
  }, [page]);

  const toggleFavourite = (itemId, movieData) => {
    setFavourite((prevFavourites) => {
      const updatedFavourites = { ...prevFavourites };
      if (updatedFavourites[itemId]) {
        delete updatedFavourites[itemId];
      } else {
        updatedFavourites[itemId] = movieData;
      }
      return updatedFavourites;
    });
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
        sData
      }}
    >
      {children}
    </States.Provider>
  );
};

export default ContextProvider;
