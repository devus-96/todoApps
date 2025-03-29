"use client"
import { createContext, useState } from "react";

export type clock = {
    name: string,
    project: string,
    assign: string[],
    priority: string,
    status: string,
    start_date: Date,
    deadline: Date,
    start_time:string,
    end_time: string,
}

const defaultValue = {
    name: '',
    project: 'Empty',
    assign: [''],
    priority: 'Empty',
    status: 'Empty',
    start_date: new Date(),
    deadline: new Date(),
    start_time: '00:00AM',
    end_time: '00:00AM',
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