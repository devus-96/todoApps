"use client"
import { createContext, useState } from "react";

type clock = {
    stardate: Date,
    deadline: Date,
    starttime:string,
    endtime: string,
}

const defaultValue = {
    stardate: new Date(),
    deadline: new Date(),
    starttime: '00:00AM',
    endtime: '00:00AM',
}

export const connectContext = createContext({
    dateValue: '',
    setDateValue: (date: string) => {},
    typeTime: '',
    setTypeTime: (time: string) => {},
    formTask: defaultValue,
    setFormTask: (value: clock) => {},
})

export function ConnectContextProvider ({children}: {children: React.ReactNode}) {
    const [dateValue, setDateValue] = useState<string>('')
    const [typeTime,setTypeTime] = useState<string>('')
    const [formTask, setFormTask] = useState<clock>(defaultValue)

    return <connectContext.Provider value={{
        typeTime,
        setTypeTime,
        dateValue,
        setDateValue,
        formTask,
        setFormTask,
    }}>
    {children}
    </connectContext.Provider>
}

export default ConnectContextProvider;