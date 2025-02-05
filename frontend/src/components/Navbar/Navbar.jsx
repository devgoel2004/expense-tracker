import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import { useAlert } from "react-alert";
const Navbar = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const Logo =
    "https://p7.hiclipart.com/preview/911/267/631/web-development-computer-icons-website.jpg";
  const [handler, setHandler] = useState(false);
  const handleSlideIn = () => {
    setHandler(!handler);
  };
  const [token, setToken] = useState(null);
  const authUser = () => {
    const x = localStorage.getItem("token");
    setToken(x);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    authUser();
  }, [token]);
  return (
    <>
      <nav className={`main-nav`}>
        <div className="navbar">
          <button
            className="slide-in-icon"
            onClick={() => {
              handleSlideIn();
            }}>
            <FaBars />
          </button>
          <Link to="/" className="nav-item nav-logo">
            <img src={Logo} alt="logo" />
            <span className="queryhub-logo-1">Expense</span>
            <span className="queryhub-logo-2">Tracker</span>
          </Link>
          <div className={handler ? "navbar-1" : "navbar-1-1"}>
            <Link
              to="/create-expense"
              className="nav-items nav-item nav-btn res-nav">
              Create
            </Link>
            <Link
              to="/create-expense"
              className="nav-items nav-item nav-btn res-nav">
              Create
            </Link>
            <Link
              to="/dashboard"
              className="nav-items nav-item nav-btn res-nav">
              Dashboard
            </Link>
            <Link to="/users" className="nav-items nav-item nav-btn res-nav">
              Users
            </Link>
          </div>
          <div className={`navbar-2`}>
            {!token ? (
              <Link to="/login" className="nav-item nav-links ">
                Login
              </Link>
            ) : (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="nav-item nav-links">
                  Profile
                </button>
                <button className="nav-item nav-links" onClick={logoutHandler}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
