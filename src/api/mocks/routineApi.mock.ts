export type routineDB = {
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
};

export const recState = {
    nextRid: 102,
};

export const routineList: routineDB[] = [
    {
        id: 100,
        author: 100,
        images: ["https://bit.ly/sage-adebayo"],
        date: new Date("2021-01-01"),
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
        routineName: "test",
        trainingType: "strength",
        description: "This is a description",
        likenum: 10,
        starednum: 10,
        timer: 600,



    },
    {
        id: 101,
        author: 100,
        date: new Date("2021-01-01"),
        created_at: new Date("2021-01-01"),
        updated_at: new Date("2021-01-01"),
        trainingType: "powerlifting",
        description: "This is a description",
        likenum: 10,
        starednum: 30,
        routineName: "test2",
        sets: 5,
        weight: 130,




    },
];
