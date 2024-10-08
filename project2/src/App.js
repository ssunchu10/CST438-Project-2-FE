import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signUp"
import Products from "./components/Products/products";
import Landing from "./components/Landing/landing";
import Contact from "./components/Contact/contact";

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/landing" element={<Landing/>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;