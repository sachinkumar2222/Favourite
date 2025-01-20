import React, { useContext } from "react";
import { States } from "../../Store/Store";
import Feed from "../../Components/Feed/Feed";
import "./Favourite.css";


function Favourite() {
  const { smallSidebar, favourite, toggleFavourite } = useContext(States);

  // Filter favourite items
  const favouriteItems = Object.keys(favourite).filter((id) => favourite[id]);

  return (
    <>
      <div className={`favourite ${smallSidebar ? "small" : "big"}`}>
        <div className="favourite-content">
          {favouriteItems.length > 0 ? (
            favouriteItems.map((id) => {
              const item = favourite[id]; 
              return (
                <Feed
                  key={id}
                  item={item}  
                  favourite={true}  
                  toggleFavourite={() => toggleFavourite(id, item)} // Pass the movie object to toggle
                />
              );
            })
          ) : (
            <p className="fav-p">No Favourite Movie Selected.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Favourite;
