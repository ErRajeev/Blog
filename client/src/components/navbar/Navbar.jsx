import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaUserTie } from "react-icons/fa";
import { IoSearch, IoLogIn } from "react-icons/io5";
import { AuthContext } from "../auth/AuthProvider";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid ">
        {/* Left Section - Social Media Icons */}
        <div className="d-flex">
          <Link to="/" className="navbar-brand">
            <FaFacebook />
          </Link>
          <Link to="/" className="navbar-brand">
            <FaInstagram />
          </Link>
          <Link to="/" className="navbar-brand">
            <FaTwitter />
          </Link>
        </div>

        {/* Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Center Section - Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/write">
                Write
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">
                Blogs
              </Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
            {/* Icons for small screens in the toggle menu */}
            {user && (
              <>
                <li className="nav-item d-lg-none">
                  <Link className="nav-link" to="/search">
                    <IoSearch />
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link className="nav-link" to="/profile">
                    <FaUserTie />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Section - Search and User Icons for larger screens */}
        <div className="d-none d-lg-flex">
          {user ? (
            <>
              <Link to="/search" className="navbar-brand">
                <IoSearch />
              </Link>
              <Link to="/profile" className="navbar-brand">
                <FaUserTie />
              </Link>
            </>
          ) : (
            <Link className="navbar-brand" to="/login">
              <IoLogIn />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
