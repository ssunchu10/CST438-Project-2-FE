import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp"

const App = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signUp" element={<SignUp />}/>
      </Routes>
    </>
  );
}

export default App;