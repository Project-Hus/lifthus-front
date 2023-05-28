import React, { useState } from "react";
import TodaysRoutine from "./TodaysRoutine/TodaysRoutine";
import { Route, Routes } from "react-router-dom";
import RoutineMenu from "./RoutineMenu";

const Routine = () => {

  return (
    <div style={{ margin: "5em" }}>
      <Routes>
        <Route path="/" element={<TodaysRoutine />} />
        <Route path="menu" element={<RoutineMenu />} />
      </Routes>
    </div >


  );
};

export default Routine;
