"use client"
import { ChangeEvent, createContext } from "react";
import { useReducer, useRef } from "react";

type choosen = {
    [key: string]: string | Date | boolean
}

export const taskContext = createContext({
    state: {
        calendar: '',
        clock: '',
        custom: {time: 0, each: '', occWeek: '', occMonth: '', ends: ''},
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
    handleChange: (e: ChangeEvent) => {}
})

export default function TaskContextProvider ({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(displayPopup, {
        calendar: '',
        clock: '',
        custom: '',
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
        custom: '',
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

    function handleChange (e: ChangeEvent) {
        let target = e.target as HTMLInputElement
        const key = target.name as 'name' | 'description'
        if ((target.type === "text" || target.type === 'textarea')) {
            areDispalyed.current[key] = target.value
        } else {
            areDispalyed.current[key] = target.checked
        }
        dispatch({display: areDispalyed.current})
    }

    return <taskContext.Provider value={{state, setDispatch, handleChange}}>{children}</taskContext.Provider>
}