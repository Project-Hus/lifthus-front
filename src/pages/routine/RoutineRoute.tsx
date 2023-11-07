import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateAct from "./CreateAct";
import CreateProgram from "./CreateProgram";
import ProgramDetail from "./ProgramDetail";
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
      <Route path={"search/program"} element={<SearchProgram />} />
      <Route path={"tmp"} element={<TmpRoutine />} />
      <Route path={"record"} element={<RecordRoutine />} />
      <Route path={"create/program"} element={<CreateProgram />} />
      <Route path={"program/:slug"} element={<ProgramDetail />} />

      <Route path={"act/create"} element={<CreateAct />} />
    </Routes>
  );
};

export default RoutineRoute;
