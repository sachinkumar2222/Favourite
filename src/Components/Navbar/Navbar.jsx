import React, { useState, useEffect, useContext, useRef } from 'react'; 
import menu from "../../assets/img/menu.png";
import user from "../../assets/img/user.png";
import search from "../../assets/img/search.png";
import "./Navbar.css";
import { States } from '../../Store/Store';
import Suggest from '../Suggestion/suggest';

function Navbar() {
  const { setSmallSidebar, sData, setShowSuggestions } = useContext(States);
  const [shadow, setShadow] = useState(false);
  const inputRef = useRef(null); // Reference to the input field

  useEffect(() => {
    // Handle scroll shadow
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup scroll event
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Click outside handler
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
        event.target=""
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <>
      <div className={`navbar ps-3 ${shadow ? 'navbar-shadow' : ''}`}>
        <div className="col-2 logo-box">
          <img src={menu} onClick={() => setSmallSidebar((prev) => !prev)} alt="" />
          <h1>Sachin.</h1>
        </div>
        <div className="col-8 search-box">
          <div className="search">
            <input
              ref={inputRef} 
              type="text"
              className='form-control1'
              placeholder="Search..."
              onChange={(e) => sData(e.target.value)}
              onFocus={() => setShowSuggestions(true)} 
            />
            <img src={search} alt="" />
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
