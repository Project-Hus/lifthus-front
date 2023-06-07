import React, { useState } from "react";
import TodaysRoutine from "./TodaysRoutine/TodaysRoutine";
import { Route, Routes } from "react-router-dom";
import RoutineMenu from "./RoutineMenu";
import CreateProgram from "./CreateProgram/CreateProgram";
import DetailProgram from "./DetailProgram";
import StartProgram from "./StartPrgram";
import CreateExcercise from "./CreateProgram/CreateExcercise";

const Routine = () => {
  return (
    <Routes>
      <Route path="/" element={<TodaysRoutine />} />
      <Route path="menu" element={<RoutineMenu />} />
      <Route path="menu/createprogram" element={<CreateProgram />} />
      <Route path="menu/detail" element={<DetailProgram />} />
      <Route path="menu/start" element={<StartProgram />} />
      <Route path="menu/createexcercise" element={<CreateExcercise />} />
    </Routes>
  );
};

export default Routine;
