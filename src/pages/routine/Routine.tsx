import React, { useState } from "react";
import TodaysRoutine from "./TodaysRoutine/TodaysRoutine";
import { Route, Routes } from "react-router-dom";
import RoutineMenu from "./RoutineMenu";
import CreateProgram from "./CreateProgram/CreateProgram";
import DetailProgram from "./DetailProgram";
import StartProgram from "./StartPrgram";
import CreateExcercise from "./CreateProgram/CreateExcercise";
import { Img } from "@chakra-ui/react";

const Routine = () => {
  if (false)
    return (
      <Routes>
        <Route path="/" element={<TodaysRoutine />} />
        <Route path="menu" element={<RoutineMenu />} />
        <Route path="menu/createprogram" element={<CreateProgram />} />
        <Route path="menu/detail/:slug" element={<DetailProgram />} />
        <Route path="menu/start/:slug" element={<StartProgram />} />
        <Route path="menu/createexcercise" element={<CreateExcercise />} />
      </Routes>
    );
  return (
    <Img
      objectFit="cover"
      src="https://media.tenor.com/t3buP-QoO9oAAAAM/jim-carrey-work.gif"
    />
  );
};

export default Routine;
