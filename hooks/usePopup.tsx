"use client"
import { createContext, useReducer, useRef } from "react";

type choosen = {
    [key: string]: boolean
}

const defaultValue = {
    invitation: false,
    company: false,
    task: true,
    project: false,
    calendar: false,
    clock: false
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