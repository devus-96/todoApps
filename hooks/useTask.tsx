"use client"
import { createContext } from "react";
import { useReducer, useRef } from "react";
import { tabTask } from "@/types/task";

type choosen = {
    [key: string]: string | Date | boolean | tabTask | any
}

export const taskContext = createContext({
    state: {
        calendar: '',
        clock: '',
        typeOfCalendar: '',
        dataType: 'project',
        form: '',
        details: null,
        routine: '',
        allday: false,
        clockEnd: '00:00AM',
        repetition: "",
        clockStart: '00:00AM',
        insertHours: '00',
        date: new Date(),
        deadline: new Date(),
        isDeadline: false
    },
    setDispatch: (param: choosen) => {},
})

export default function TaskContextProvider ({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(displayPopup, {
        calendar: '',
        clock: '',
        typeOfCalendar: '',
        dataType: 'task',
        form: '',
        details: null,
        routine: '',
        allday: false,
        clockEnd: '00:00AM',
        clockStart: '00:00AM',
        repetition: "",
        date: new Date(),
        deadline: new Date(),
        isDeadline: false
    })

    let areDispalyed = useRef<choosen>({
        calendar: '',
        clock: '',
        typeOfCalendar: '',
        dataType: 'task',
        form: '',
        details: null ,
        routine: '',
        allday: false,
        clockEnd: '00:00AM',
        clockStart: '00:00AM',
        repetition: "",
        date: new Date(),
        deadline: new Date(),
        name: '',
        isDeadline: false
    })

    function displayPopup (state: any, action: any) {
        return state = action.display
    }

    function setDispatch (param: choosen) {
        areDispalyed.current = {...areDispalyed.current, ...param}
        dispatch({display: areDispalyed.current})
    }

    return <taskContext.Provider value={{state, setDispatch}}>{children}</taskContext.Provider>
}