import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./Header.css";

const Header = () => {
  // Get Firebase Authentication method 
  const { user, logOut } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container">
        <Link to="/" className="navbar-brand t-1">
          <i className='bx bx-happy bx-tada' style={{ color: '#fffdfd' }} ></i> The I<span className="text-primary">ce Point</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore">Explore</Link>
            </li>
            {
              !user?.email &&
              <>
                <li className="nav-item">
                  <NavLink className="nav-link"
                    to="/register"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#636"
                    }}>
                    Register Here
                  </NavLink>
                </li>
              </>
            }
            {
              user?.email ?
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link"
                      to="/Dashboard"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#636"
                      }}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">
                      {user?.displayName ? user.displayName : 'AnonymousUser'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink onClick={logOut} className="nav-link"
                      to="/home"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#636"
                      }}>
                      SignOut
                    </NavLink>
                  </li>
                </> : ''
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
