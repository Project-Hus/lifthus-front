import React, { useState } from "react";
import TodaysRoutine from "./TodaysRoutine/TodaysRoutine";
import { Route, Routes } from "react-router-dom";
import RoutineMenu from "./RoutineMenu";
import CreateProgramm from "./CreateProgramm";

const Routine = () => {

  return (
    <div style={{ margin: "5em" }}>
      <Routes>
        <Route path="/" element={<TodaysRoutine />} />
        <Route path="menu" element={<RoutineMenu />} />
        <Route path="menu/createprogramm" element={<CreateProgramm />} />
      </Routes>
    </div >


  );
};

export default Routine;
