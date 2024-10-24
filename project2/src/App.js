import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import SignUp from "./components/SignUp/signUp"
import Products from "./components/Products/products";
import Landing from "./components/Landing/landing";
import Contact from "./components/Contact/contact";
import About from "./components/About/about";

import AddItemPage from "./components/AddItemPage/addItemPage";
import DeleteItemPage from "./components/DeleteItemPage/deleteItemPage";
import AdminProfilePage from "./components/ProfilePage/adminProfilePage";
import ProfilePage from "./components/ProfilePage/profilePage";
import ListPage from "./components/ListPage/listPage";
import CreateUserPage from "./components/CreateUserPage/createUserPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/products" element={<Products />}/>
      <Route path="/landing" element={<Landing/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      <Route path="/addItemPage" element={<AddItemPage />} />
      <Route path="/deleteItemPage" element={<DeleteItemPage />} />
      <Route path="/adminProfilePage" element={<AdminProfilePage />} />
      <Route path="/profilePage" element={<ProfilePage />} />
      <Route path="/listPage" element={<ListPage />} />
      <Route path="/createUserPage" element={<CreateUserPage />} />
    </Routes>
  );
}

export default App;