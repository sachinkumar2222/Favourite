import React, { useState, useEffect, useContext } from 'react';
import menu from "../../assets/img/menu.png";
import user from "../../assets/img/user.png";
import search from "../../assets/img/search.png";
import "./Navbar.css";
import { States } from '../../Store/Store';
import Suggest from '../Suggestion/Suggest';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const { setSmallSidebar, sData, setShowSuggestions, searchInput, setSearchInput } = useContext(States);
  const [shadow, setShadow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation
  const searchRef = React.useRef(null); // Ref for search bar

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is outside search bar AND outside suggestion box
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest('.suggest')
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setSearchInput('');
  }, [location.pathname, setSearchInput]);

  // Debouncing Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput.trim()) {
        sData(searchInput);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
  };

  // Handle Enter key press event
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate('/result-movies');
      setShowSuggestions(false); // Hide suggestions on enter
    }
  };


  return (
    <>
      <div className={`navbar ps-3 ${shadow ? 'navbar-shadow' : ''}`}>
        <div className="logo-box">
          <img src={menu} onClick={() => setSmallSidebar(prev => !prev)} alt="" />
          <h1>Sachin.</h1>
        </div>
        <div className="search-box">
          <div className="search" ref={searchRef}>
            <input
              type="text"
              className="form-control1"
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Listen for Enter key press
            />
            <Link to="/result-movies">
              <img src={search} alt="" />
            </Link>
          </div>
        </div>
        <div className="login-box">
          <a href='https://sparky-port.vercel.app/' target='_blank'>About Me</a>
          <img src={user} alt="" />
        </div>
      </div>

      <Suggest />
    </>
  );
}

export default Navbar;
