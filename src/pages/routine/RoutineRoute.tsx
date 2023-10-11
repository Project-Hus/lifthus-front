import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProgram from "./CreateProgram";
import RecordRoutine from "./RecordRoutine";
import Routine from "./Routine";
import RoutineAddNav from "./RoutineAddNav";
import SearchProgram from "./SearchProgram";
import TmpRoutine from "./TmpRoutine";

const RoutineRoute = () => {
  return (
    <Routes>
      <Route index element={<Routine />} />
      <Route path={"add"} element={<RoutineAddNav />} />
      <Route path={"program/search"} element={<SearchProgram />} />
      <Route path={"tmp"} element={<TmpRoutine />} />
      <Route path={"record"} element={<RecordRoutine />} />
      <Route path={"program/create"} element={<CreateProgram />} />
    </Routes>
  );
};

export default RoutineRoute;
