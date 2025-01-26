"use client"
import { createContext } from "react";
import { useReducer, useRef } from "react";

type choosen = {
    [key: string]: string | Date | boolean
}

export const taskContext = createContext({
    state: {
        calendar: '',
        clock: '',
        typeOfCalendar: '',
        form: '',
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
        form: '',
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
        form: '',
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