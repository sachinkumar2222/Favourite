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

  // Handle input change and update suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setShowSuggestions(true); 
    setSearchInput(value);
    sData(value); 
  };

  // Handle Enter key press event
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate('/result-movies'); // Navigate to result-movies page when Enter is pressed
    }
  };

  return (
    <>
      <div className={`navbar ps-3 ${shadow ? 'navbar-shadow' : ''}`}>
        <div className="col-2 logo-box">
          <img src={menu} onClick={() => setSmallSidebar(prev => !prev)} alt=""/>
          <h1>Sachin.</h1>
        </div>
        <div className="col-8 search-box">
          <div className="search">
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
        <div className="col-2 login-box">
          <a href='#'>About Me</a>
          <img src={user} alt="" />
        </div>
      </div>

      <Suggest />
    </>
  );
}

export default Navbar;
