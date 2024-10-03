import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp"
import Products from "./components/products";

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/products" element={<Products />}/>
      </Routes>
    </>
  );
}

export default App;