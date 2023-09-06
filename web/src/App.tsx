import { useState } from "react";
import "./App.css";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
