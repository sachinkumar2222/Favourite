import React, { useContext, useState, useEffect, useRef } from "react";
import { States } from "../../Store/Store";
import "./Suggest.css";
import { useNavigate } from "react-router-dom";

function Suggest() {
  const { showSuggestions, searchResults } = useContext(States);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const suggestionRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showSuggestions || searchResults.length === 0) return;

      if (e.key === "ArrowDown") {
        setActiveIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        const item = searchResults[activeIndex];
        const type = item.media_type || (item.title ? 'movie' : 'tv');
        navigate(`/about-movie/${item.id}?type=${type}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSuggestions, searchResults, activeIndex, navigate]);

  useEffect(() => {
    if (activeIndex >= 0 && suggestionRefs.current[activeIndex]) {
      suggestionRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <div className={`suggest ${showSuggestions ? "" : "none"}`}>
      {searchResults.length > 0 ? (
        <ul className="suggest-content">
          {searchResults.map((item, index) => (
            <li
              key={index}
              ref={(el) => (suggestionRefs.current[index] = el)}
              className={`suggest-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                const type = item.media_type || (item.title ? 'movie' : 'tv');
                navigate(`/about-movie/${item.id}?type=${type}`);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                alt={item.title || item.name}
              />
              <h3>{item.title || item.name}</h3>
            </li>
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
