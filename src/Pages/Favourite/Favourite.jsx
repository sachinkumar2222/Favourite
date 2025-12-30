import React, { useContext, useEffect } from "react";
import { States } from "../../Store/Store";
import Feed from "../../Components/Feed/Feed";
import "./Favourite.css";

function Favourite() {
  const { favourite, toggleFavourite, setSmallSidebar } = useContext(States);

  // Ensure sidebar logic is consistent if needed, 
  // though CSS handles layout mostly now.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="favourite-page">
      <div className="favourite-container">
        <h1 className="page-title">My Favourites</h1>

        {favourite.length > 0 ? (
          <div className="favourite-grid">
            {favourite.map((item) => (
              <Feed
                key={item.id}
                item={item}
                favourite={true}
                toggleFavourite={() => toggleFavourite(item.id, item)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No Favourites Yet</h2>
            <p>Start adding movies and TV shows to your list to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourite;
