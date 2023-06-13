import React, { useState } from "react";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";
import { generalRequest } from "../../httpService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // Submit data to register function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await generalRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          window.location.pathname = "/";
        }, 300);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registerContainer">
        <div className="regTitle">Register</div>
        <div className="registerWrapper">
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          {error && <div>Invalid Parameters... username should be unique</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
