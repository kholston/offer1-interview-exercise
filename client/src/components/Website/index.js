import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "./LandingPage";

function index() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default index;
