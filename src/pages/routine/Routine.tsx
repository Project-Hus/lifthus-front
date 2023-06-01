import React, { useState } from "react";
import TodaysRoutine from "./TodaysRoutine/TodaysRoutine";
import { Route, Routes } from "react-router-dom";
import RoutineMenu from "./RoutineMenu";
import DetailProgram from "./DetailProgram";

const Routine = () => {

  return (
    <div style={{ margin: "5em" }}>
      <Routes>
        <Route path="/" element={<TodaysRoutine />} />
        <Route path="menu/*" element={<RoutineMenu />} />
        <Route path="menu/detail" element={<DetailProgram />} />
      </Routes>
    </div >


  );
};

export default Routine;
