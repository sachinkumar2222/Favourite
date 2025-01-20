import React, { useContext } from 'react';
import home from '../../assets/img/home.png';
import favourite from '../../assets/img/favourite.png';
import "./Sidebar.css";
import { States } from '../../Store/Store';
import { Link } from 'react-router-dom';

function Sidebar() {
    const { smallSidebar } = useContext(States)

    return (
        <div className={`sidebar ${smallSidebar ? 'small-sidebar' : ''}`}>
            <ul className="sidebar-menu">
                <Link to="/">
                    <li>
                        <img src={home} alt="" />
                        <p>Home</p>
                    </li>
                </Link>
                <Link to="/favourite-movies">
                    <li>
                        <img src={favourite} alt="" />
                        <p>Favourite</p>
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;