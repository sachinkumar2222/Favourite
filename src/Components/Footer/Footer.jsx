import React from 'react';
import linkedin from "../../assets/img/linkedin.png";
import about from "../../assets/img/about.png";
import twitter from "../../assets/img/twitter.png";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/terms">Terms and Conditions</a>|
                    <a href="/privacy">Privacy Policy</a>
                </div>
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="" /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={about} alt="" /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="" /></a>
                </div>
                <hr />
                <div className="footer-copyright">
                    &copy; 2023 Sparky. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;