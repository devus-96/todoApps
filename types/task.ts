export type task = {
    [key: string] : tabTask[]
}

export type tabTask = {
        "id": string,
          "name": string,
          "creation": string,
          "start_time": string,
          "end_time": string,
          "start_date":string,
          "status": string,
         
}

export type separeType = [string, tabTask[]]