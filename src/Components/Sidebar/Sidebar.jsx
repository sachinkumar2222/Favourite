import React, { useContext } from 'react';
import home from '../../assets/img/home.png';
import favourite from '../../assets/img/favourite.png';
import "./Sidebar.css";
import { States } from '../../Store/Store';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const { smallSidebar } = useContext(States);
    const location = useLocation();

    return (
        <div className={`sidebar ${smallSidebar ? 'small-sidebar' : ''}`}>
            <ul className="sidebar-menu">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                    <li>
                        {location.pathname === "/" ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" fill="url(#homeGradient)" />
                                <path d="M9 22V12H15V22" fill="url(#homeGradient)" />
                                <defs>
                                    <linearGradient id="homeGradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#ff00cc" />
                                        <stop offset="1" stopColor="#333399" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        )}
                        <p>Home</p>
                    </li>
                </Link>
                <Link to="/favourite-movies" className={location.pathname === "/favourite-movies" ? "active" : ""}>
                    <li>
                        {location.pathname === "/favourite-movies" ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.54871 7.04096 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61V4.61Z" fill="url(#favGradient)" />
                                <defs>
                                    <linearGradient id="favGradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#e50914" />
                                        <stop offset="1" stopColor="#ff00cc" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        )}
                        <p>Favourite</p>
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;