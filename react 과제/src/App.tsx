import "./App.css";
import "normalize.css";
import React from "react";
import Home from "./pages/home";
import Write from "./pages/write";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<Write />} />
    </Routes>
  );
}

export default App;
