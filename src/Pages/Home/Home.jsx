import React, { useContext } from 'react';
import "./Home.css";
import Feed from '../../Components/Feed/Feed';
import { States } from '../../Store/Store';
import next from "../../assets/img/next.png";
import prev from "../../assets/img/prev.png";
import Loading from '../../Components/Loading/Loading';

function Home() {
  const { apiData, smallSidebar, toggleFavourite, favourite, setPage, isLoading, fData, fetchByGenre } =
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

  // Categories Config
  const categories = [
    { name: 'Trending', id: 'trending' },
    { name: 'Action', id: 28 },
    { name: 'Romance', id: 10749 },
    { name: 'Animation', id: 16 },
    { name: 'Horror', id: 27 },
    { name: 'Sci-Fi', id: 878 },
    { name: 'Drama', id: 18 }
  ];

  const [activeCategory, setActiveCategory] = React.useState('Trending');

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat.name);
    setPage(1);
    if (cat.id === 'trending') {
      fData();
    } else {
      fetchByGenre(cat.id);
    }
  };

  // Slider Logic
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const heroMovies = apiData.slice(0, 10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  return (
    <>
      <div className="home">
        <div className={`${smallSidebar ? 'small' : 'big'}`}>

          {/* Hero Slider Section */}
          {!isLoading && heroMovies.length > 0 && (
            <div className="hero-slider-container">
              {heroMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                >
                  <div className="hero-overlay">
                    <h1>{movie.original_title || movie.name}</h1>
                    <p>{movie.overview.slice(0, 150)}...</p>
                    <button className="hero-play-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="white" />
                        <path d="M15 12L10 8V16L15 12Z" fill="black" />
                      </svg>
                      Let's Play Movie
                    </button>
                  </div>
                </div>
              ))}

              {/* Dots */}
              <div className="hero-dots">
                {heroMovies.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  ></span>
                ))}
              </div>
            </div>
          )}

          {/* Category Pills */}
          <div className="category-section">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <h2 className="section-title">{activeCategory} Movies</h2>

          <div className="home-content">
            {isLoading ? (
              <Loading />
            ) : (
              apiData.slice(10).map((item) => (
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
            <div onClick={decreasePage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div onClick={increasePage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
