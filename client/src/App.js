import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Products from "./components/products/Products";
import Admin from "./pages/admin/Admin";
import Cart from "./pages/cart/Cart";

const App = () => {
  // check for user and admin

  const user = JSON.parse(localStorage.getItem("user"));

  const admin = user?.isAdmin;
  return (
    <>
      {/* Routes rendered dynamically and protected */}
      <Routes>
        <Route
          path="/register"
          element={user ? <Navigate exact to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate exact to="/" /> : <Login />}
        />
        <Route
          path="/products"
          element={!user ? <Navigate exact to="/login" /> : <Products />}
        />
        <Route
          path="/cart"
          element={!user ? <Navigate exact to="/login" /> : <Cart />}
        />
        <Route
          path="/"
          element={!user ? <Navigate exact to="/login" /> : <Home />}
        />
        <Route
          path="/admin"
          element={!admin ? <Navigate exact to="/login" /> : <Admin />}
        />
      </Routes>
    </>
  );
};

export default App;
