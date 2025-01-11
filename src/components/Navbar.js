import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const Location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle hamburger menu
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleButtonClick = (e) => {
    const buttons = document.querySelectorAll(".navbar button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    setIsMenuOpen(false); // Close menu when button is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.button-container') && !event.target.closest('.hamburger-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [Location.pathname]);

  useEffect(() => {
    // Set active state based on current path
    const currentPath = Location.pathname;
    const buttons = document.querySelectorAll(".navbar button");
    buttons.forEach((btn) => btn.classList.remove("active"));

    const activeButton = document.querySelector(`[data-path="${currentPath}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }, [Location.pathname]);

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-brand-link">
        <div className="navbar-brand">SilverBulls</div>
      </Link>

      {/* Navigation Links */}
      <div className={`button-container ${isMenuOpen ? "open" : ""}`}>
        <Link to="/home">
          <button id="homeButton" data-path="/home" onClick={handleButtonClick}>
            <span>Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2.5625 7.92972C2.5625 7.6342 2.71291 7.35696 2.96616 7.1857L9.20616 2.96581C9.53924 2.74056 9.98576 2.74056 10.3188 2.96581L16.5588 7.1857C16.8121 7.35696 16.9625 7.6342 16.9625 7.92972V15.8274C16.9625 16.5838 16.3178 17.1969 15.5225 17.1969H4.0025C3.20721 17.1969 2.5625 16.5838 2.5625 15.8274V7.92972Z"
                stroke="currentColor"
              />
            </svg>
          </button>
        </Link>

        <Link to="/trade">
          <button id="portfolioButton" data-path="/trade" onClick={handleButtonClick}>
            <span>Portfolio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3.04594 12.8803L6.12574 10.0004L8.32561 12.0575L13.1653 7.53182M9.87265 7.12031H13.6059V10.6113M4.00594 17.6803C2.94555 17.6803 2.08594 16.8207 2.08594 15.7603V4.24031C2.08594 3.17993 2.94555 2.32031 4.00594 2.32031H15.5259C16.5863 2.32031 17.4459 3.17993 17.4459 4.24031V15.7603C17.4459 16.8207 16.5863 17.6803 15.5259 17.6803H4.00594Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>

        <Link to="/apikeys">
          <button id="apiKeysButton" data-path="/apikeys" onClick={handleButtonClick}>
            <span>api</span>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 34 0 C 25.179688 0 18 7.175781 18 16 C 18 17.960938 18.382813 19.824219 19.03125 21.5625 L 0.28125 40.28125 L 0 40.59375 L 0 47.40625 L 0.28125 47.71875 L 2.28125 49.71875 L 2.59375 50 L 9.40625 50 L 9.71875 49.71875 L 12.71875 46.71875 L 13 46.40625 L 13 44 L 15.40625 44 L 15.71875 43.71875 L 18.71875 40.71875 L 19 40.40625 L 19 39 L 20.40625 39 L 20.71875 38.71875 L 22.71875 36.71875 L 23 36.40625 L 23 35 L 24.40625 35 L 24.71875 34.71875 L 28.4375 30.96875 C 30.175781 31.617188 32.039063 32 34 32 C 42.820313 32 50 24.820313 50 16 C 50 7.175781 42.820313 0 34 0 Z M 34 2 C 41.738281 2 48 8.257813 48 16 C 48 23.738281 41.738281 30 34 30 C 32.078125 30 30.257813 29.636719 28.59375 28.9375 C 28.582031 28.925781 28.574219 28.917969 28.5625 28.90625 C 23.535156 26.78125 20 21.804688 20 16 C 20 8.257813 26.261719 2 34 2 Z M 34 5 C 31.183594 5 28.363281 6.074219 26.21875 8.21875 L 25.5 8.9375 L 26.21875 9.625 L 40.375 23.78125 L 41.0625 24.5 L 41.78125 23.78125 C 46.070313 19.496094 46.070313 12.503906 41.78125 8.21875 C 39.636719 6.074219 36.816406 5 34 5 Z M 34 7 C 36.300781 7 38.613281 7.863281 40.375 9.625 C 43.648438 12.898438 43.75 17.996094 40.9375 21.53125 L 28.46875 9.0625 C 30.101563 7.765625 32.023438 7 34 7 Z M 19.875 23.53125 C 21.371094 26.328125 23.671875 28.628906 26.46875 30.125 L 23.5625 33 L 21 33 L 21 35.5625 L 19.5625 37 L 17 37 L 17 39.5625 L 14.5625 42 L 11 42 L 11 45.5625 L 8.5625 48 L 3.4375 48 L 2.4375 47 L 19 30.4375 C 19.359375 30.128906 19.457031 29.613281 19.230469 29.199219 C 19.003906 28.78125 18.515625 28.582031 18.0625 28.71875 C 17.871094 28.761719 17.699219 28.859375 17.5625 29 L 2 44.59375 L 2 41.4375 Z"></path>
</svg>
          </button>
        </Link>

        <Link to="/bots">
          <button id="algoButton" data-path="/bots" onClick={handleButtonClick}>
            <span>Algo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.20984 2.32031H3.79651C2.85394 2.32031 2.08984 3.08441 2.08984 4.02698V12.5603V15.9736C2.08984 16.9162 2.85394 17.6803 3.79651 17.6803H12.3298H15.7432C16.6857 17.6803 17.4498 16.9162 17.4498 15.9736V7.44031V4.02698C17.4498 3.08441 16.6857 2.32031 15.7432 2.32031H7.36984M6.40984 7.7325V6.7965M13.1298 7.7325V6.7965M7.09197 12.8805C8.1865 13.7285 10.6409 13.7285 12.1704 12.8805M9.28984 10.5405L9.48867 10.3466C9.6687 10.1711 9.76984 9.93303 9.76984 9.68479V7.2645"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </Link>

        <Link to="/assets">
          <button id="walletButton" data-path="/assets" onClick={handleButtonClick}>
          <span>Wallet</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M200-280v80-560 480Zm24.62 120q-26.85 0-45.74-18.88Q160-197.77 160-224.62v-510.76q0-26.85 18.88-45.74Q197.77-800 224.62-800h510.76q26.85 0 45.74 18.88Q800-762.23 800-735.38v117.69h-40v-117.69q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H224.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v510.76q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h510.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-117.69h40v117.69q0 26.85-18.88 45.74Q762.23-160 735.38-160H224.62Zm320-160q-26.85 0-45.74-18.88Q480-357.77 480-384.62v-190.76q0-26.85 18.88-45.74Q517.77-640 544.62-640h230.76q26.85 0 45.74 18.88Q840-602.23 840-575.38v190.76q0 26.85-18.88 45.74Q802.23-320 775.38-320H544.62Zm230.76-40q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-190.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92H544.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7v190.76q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h230.76ZM640-420q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
            </svg>
          </button>
        </Link>

        {!isAuthenticated ? (
          <Link to="/signin">
            <button id="signinButton" data-path="/signin" onClick={handleButtonClick} aria-label="Sign In">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M15.119 7.00966C15.119 8.65648 13.725 10.1249 12.0508 10.1249C10.3766 10.1249 8.9826 8.65648 8.9826 7.00966C8.9826 5.32695 10.4106 3.75 12.0508 3.75C13.691 3.75 15.119 5.32695 15.119 7.00966ZM20.3008 16.7779C20.3008 17.5917 19.8462 18.4261 18.5564 19.0984C17.2418 19.7836 15.1289 20.2502 12.0508 20.2502C8.97264 20.2502 6.85976 19.7836 5.54517 19.0984C4.25537 18.4261 3.80078 17.5917 3.80078 16.7779C3.80078 16.0743 4.43739 15.2069 6.00536 14.4713C7.51376 13.7636 9.65033 13.3056 12.0508 13.3056C14.4512 13.3056 16.5878 13.7636 18.0962 14.4713C19.6642 15.2069 20.3008 16.0743 20.3008 16.7779Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Sign In</span>
            </button>
          </Link>
        ) : (
          <button id="logoutButton" onClick={handleLogout} aria-label="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path d="M15.119 7.00966C15.119 8.65648 13.725 10.1249 12.0508 10.1249C10.3766 10.1249 8.9826 8.65648 8.9826 7.00966C8.9826 5.32695 10.4106 3.75 12.0508 3.75C13.691 3.75 15.119 5.32695 15.119 7.00966ZM20.3008 16.7779C20.3008 17.5917 19.8462 18.4261 18.5564 19.0984C17.2418 19.7836 15.1289 20.2502 12.0508 20.2502C8.97264 20.2502 6.85976 19.7836 5.54517 19.0984C4.25537 18.4261 3.80078 17.5917 3.80078 16.7779C3.80078 16.0743 4.43739 15.2069 6.00536 14.4713C7.51376 13.7636 9.65033 13.3056 12.0508 13.3056C14.4512 13.3056 16.5878 13.7636 18.0962 14.4713C19.6642 15.2069 20.3008 16.0743 20.3008 16.7779Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Logout</span>
          </button>
        )}
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger-menu" onClick={toggleMenu} style={{ float: 'right' }}>
        <div className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;