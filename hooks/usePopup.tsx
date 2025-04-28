"use client"
import { createContext, useReducer, useRef } from "react";

type choosen = {
    [key: string]: boolean
}

const defaultValue = {
    teamDetails:false,
    states: false,
    priority: false,
    invitation: false,
    team: false,
    task: false,
    project: false,
    calendar: false,
    clock: false,
    menberAction: false,
    projectList: false,
    sortTask: false,
    taskAction: false,
    tableTask: true,
    boardTask: false,
    menberList: false,
    comment: false,
    calendarNotice: false,
    taskdetails: false,
    calendartask: false
}

export const popupContext = createContext({
    state: defaultValue,
    setDispatch: (param: choosen) => {},
})


export function PopupContextProvider ({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(displayPopup, defaultValue)

    let areDispalyed = useRef<choosen>(defaultValue)

    function displayPopup (state: any, action: any) {
        return state = action.display
    }

    function setDispatch (param: choosen) {
        areDispalyed.current = {...areDispalyed.current, ...param}
        dispatch({display: areDispalyed.current})
    }
    
    return <popupContext.Provider value={{state, setDispatch}}>{children}</popupContext.Provider>
}