import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../../Hook/firebaseConfig";

const auth = getAuth(app);

const Header = ({ user, setUser }) => {
  console.log(user)
  const [logout, setLogout] = useState("");

  const handleLogout = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      setUser('')
    }).catch((error) => {
      // An error happened.
    });

  }



  return (
    <div>
      <nav className="d-flex justify-content-around align-items-center bg-secondary p-3 flex-wrap">
        <div className="logo ">
          <img
            className="logo-img"
            src="https://i.ibb.co/TtRpKPP/doctor.png"
            alt=""
          />
        </div>
        <div className="menu-container d-flex flex-wrap ">
          <Link to="/home" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">Home</li>
          </Link>
          {/* <Link to="/login" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">Login</li>
          </Link> */}

          {user ? <li
            onClick={handleLogout}
            role="button"
            className="nav-link items  ms-3 text-info fw-bolder"
          >
            Logout
          </li>
            :
            <Link to="/registration" className="text-decoration-none">
              <li className="nav-link items  ms-3 text-info fw-bolder">
                Registration
              </li>
            </Link>}

          <Link to="/about" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">About</li>
          </Link>
          <li className="nav-link items  ms-3 text-info fw-bolder">
            {user ? user.displayName : "Profile"}
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Header;
