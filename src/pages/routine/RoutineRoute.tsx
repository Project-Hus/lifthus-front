import React from "react";
import { Route, Routes } from "react-router-dom";
import Routine from "./Routine";
import RoutineAddNav from "./RoutineAddNav";

const RoutineRoute = () => {
  return (
    <Routes>
      <Route index element={<Routine />} />
      <Route path="add" element={<RoutineAddNav />} />
    </Routes>
  );
};

export default RoutineRoute;
