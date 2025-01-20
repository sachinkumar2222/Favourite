import React, { useContext } from "react";
import { States } from "../../Store/Store";
import "./Suggest.css";
import { Link } from "react-router-dom";

function Suggest() {
  const { showSuggestions, searchResults, isLoading } = useContext(States); 

  return (
    <div className={`suggest ${showSuggestions ? "" : "none"}`}>
      { searchResults.length > 0 ? (
        <ul className="suggest-content">
          {searchResults.map((item, index) => (
            <Link to={`/about/${item.id}`}>
            <li key={index} className="suggest-item">
              <img  src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} /> 
              <h3>{item.title}</h3> 
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p>No results found</p> 
        </div>
      )}
    </div>
  );
}

export default Suggest;
