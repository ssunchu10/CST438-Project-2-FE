import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signUp"
import Products from "./components/Products/products";
import Landing from "./components/Landing/landing";

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/landing" element={<Landing/>} />
      </Routes>
    </>
  );
}

export default App;