import React, { useContext } from 'react';
import "./Home.css";
import Feed from '../../Components/Feed/Feed';
import { States } from '../../Store/Store';
import next from "../../assets/img/next.png";
import prev from "../../assets/img/prev.png";
import Loading from '../../Components/Loading/Loading';

function Home() {
  const { apiData, smallSidebar, toggleFavourite, favourite, setPage, isLoading } =
    useContext(States);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const decreasePage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
    scrollToTop();
  };

  const increasePage = () => {
    setPage((prev) => prev + 1);
    scrollToTop();
  };

  return (
    <>
      <div className="home">
        <div className={`${smallSidebar ? 'small' : 'big'}`}>
          <div className="home-content">
            {isLoading ? (
              <Loading /> 
            ) : (
              apiData.map((item) => (
                <Feed
                  key={item.id}
                  item={item}
                  favourite={favourite[item.id] || false}
                  toggleFavourite={() => toggleFavourite(item.id, item)}
                />
              ))
            )}
          </div>
          <div className="navigation">
            <div>
              <img src={prev} onClick={decreasePage} alt="Previous Page" />
            </div>
            <div>
              <img src={next} onClick={increasePage} alt="Next Page" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
