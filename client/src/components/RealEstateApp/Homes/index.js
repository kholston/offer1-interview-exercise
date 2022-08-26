import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeList from "../../HomeList";
import HomeView from "../../HomeView";

function Homes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomeList />} />
    </Routes>
  );
}

export default Homes;
