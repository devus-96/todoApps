export type taskProject = {
    id: number,
    name: string,
    creation: string,
    start_date: string,
    deadline: string,
    schedule: schedule[]
    status: string,
    assignment: string[]
}

type schedule = {
    date:string,
    start_time: string,
    end_time: string
}

type menbers = {
    name: string,
    role: string,
    email: string
}

export type ProjectType = {
      name: string,
      objectifs: string[],
      start_date: Date,
      deadline: Date,
      repeat: string,
      image: string,
}