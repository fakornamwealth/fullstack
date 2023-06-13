import React from "react";
import "./navbar.css";
import Logo from "../../images/logo.jpg";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  // check for user and admin
  const user = JSON.parse(localStorage.getItem("user"));

  const admin = user?.isAdmin;

  // clear the user data and reload the page
  const logout = () => {
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.pathname = "/";
    }, 300);
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="left">
            <img className="img" src={Logo} alt="Logo" />
          </div>
          <div className="middle">Alberta's Online Shop</div>
          <div className="right">
            {!user ? (
              <>
                <div className="btnGet" onClick={() => navigate("/register")}>
                  Register
                </div>
                <div className="btnGet" onClick={() => navigate("/login")}>
                  Login
                </div>
              </>
            ) : (
              <>
                <div className="btnHome" onClick={() => navigate("/")}>
                  Home
                </div>
                <div className="btnOut" onClick={logout}>
                  Logout
                </div>
              </>
            )}

            {user && admin && (
              <div className="btnGet" onClick={() => navigate("/admin")}>
                Admin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
