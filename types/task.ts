export type task = {
    [key: string] : tabTask[]
}

export type tabTask = {
  name: string,
  project: string;
  assign: string[],
  priority: string,
  state: string,
  start_date: Date,
  deadline: Date,
  start_time: string,
  end_time: string,
}

export type separeType = [string, tabTask[]]