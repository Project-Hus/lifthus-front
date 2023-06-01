import { create } from "zustand";
import { RegisterInfo } from "./interfaces/register.interface";
import { programDB } from "../api/mocks/routineApi.mock";
//make interface for useProgramStore
interface programInfo {
    id: number;
    author: number;
    date: Date;
    created_at: Date;
    updated_at: Date;
    trainingType: string;
    images?: string[];
    description: string;
    likenum: number;
    starednum: number;
    routineName: string;
    timer?: number;
    sets?: number;
    weight?: number;
    setProgramInfo: (info: programDB) => void;

}


//현재 조회중인 프로그램에 대한 정보를 담고 있다.
const useProgramStore = create<programInfo>()((set) => ({
    id: 0,
    author: 0,
    date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    trainingType: "",
    images: [],
    description: "",
    likenum: 0,
    starednum: 0,
    routineName: "",
    timer: 0,
    setProgramInfo: (info: programDB) =>
        set((state) => ({
            ...state,
            ...info,
        })),

}));

export default useProgramStore;
