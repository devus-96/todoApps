"use client"
import { createContext } from "react";
import { useReducer, useRef } from "react";

type choosen = {
    [key: string]: string
}

export const taskContext = createContext({
    state: {
        calendar: '',
        clock: '',
        custom: '',
        form: '',
        clockEnd: '00:00AM',
        clockStart: '00:00AM',
        insertHours: '00',
        date: new Date()
    },
    setDispatch: (param: choosen) => {}
})

export default function TaskContextProvider ({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(displayPopup, {
        calendar: '',
        clock: '',
        custom: '',
        form: '',
        clockEnd: '00:00AM',
        clockStart: '00:00AM',
        date: new Date()
    })

    let areDispalyed = useRef({
        calendar: '',
        clock: '',
        custom: '',
        form: '',
        clockEnd: '00:00AM',
        clockStart: '00:00AM',
        date: new Date()
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