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
      id: number,
      name: string,
      creation: string,
      start_date: string,
      deadline: string,
      status: string,
      tasks: taskProject[],
      menbers: menbers[]
}