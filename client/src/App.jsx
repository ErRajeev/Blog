import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home.jsx";
import Signup from "./components/auth/signup/Signup.jsx";
import Login from "./components/auth/login/Login.jsx";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";
import Write from "./components/write/Write.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AuthProvider from "./components/auth/AuthProvider.jsx";
import Blogs from "./components/blogs/Blogs.jsx";
import Profile from "./components/profile/Profile.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/write" element={<Write />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
