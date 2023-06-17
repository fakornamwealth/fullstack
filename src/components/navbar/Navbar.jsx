import React from "react";
import "./navbar.css";
import Logo from "../../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { generalRequest, userRequest } from "../../httpService";

const Navbar = () => {
  const navigate = useNavigate();

  // check for user and admin
  const user = JSON.parse(localStorage.getItem("user"));

  const admin = user?.isAdmin;

  // clear the user data and reload the page
  const logout = () => {
    try {
      const res = userRequest.put("/auth/logout");
      localStorage.removeItem("user");
      window.location.pathname = "/";
    } catch (error) {
      console.log(error);
    }

    // res.status(204)
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="left">
            <img className="img" src={Logo} alt="Logo" />
          </div>
          <div className="middle">Alberta's Online Shop</div>

          <div className="btnCart" onClick={() => navigate("/cart")}>
            <AiOutlineShoppingCart style={{ fontSize: "30px" }} />{" "}
            <span style={{ fontSize: "20px" }}></span>
          </div>
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
