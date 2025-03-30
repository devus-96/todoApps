"use client"
import { tabTask } from "@/types/task";
import { createContext, useEffect, useState } from "react";

export type clock = {
    name: string,
    project: string,
    assign: string[],
    priority: string,
    state: string,
    start_date: Date,
    deadline: Date,
    start_time:string,
    end_time: string,
}

export const defaultValue = {
    name: '',
    project: 'Empty',
    assign: [''],
    priority: 'Empty',
    state: 'Empty',
    start_date: new Date(),
    deadline: new Date(),
    start_time: '00:00AM',
    end_time: '00:00AM',
}

type group = ((prevElements: tabTask[]) => tabTask[]) | tabTask[]

/**
 * groupFormTask: sert a conserver sous forme d'object tout les taches de la partit projet
 * indexes: sert a indexer les taches de la table projet de facon unique
 * emails: collecter les emails de la tableau project
 * dateValue: savoir au calendier pour savoir ou appliquer les valeurs
 * typeTime: sert a l'horloge pour savoir ou appliquer les valeurs
 * formTask: recupere les attribut de la partie tache.
 * action: permet au calendier de savoir quelle la fonction a executer lorsque on click sur un jour
 */

export const connectContext = createContext({
    action: '',
    setAction: (action: string) => {},
    groupFormTask: [defaultValue],
    setGroupFormTask: (value: group) => {},
    indexes: 0,
    setIndexes: (index: number) => {},
    emails:[''],
    setEmail: (email: string[]) => {},
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
    const [indexes, setIndexes] = useState<number>(0)
    const [groupFormTask, setGroupFormTask] = useState<tabTask[]>([defaultValue])
    const [emails, setEmail] = useState<string[]>([''])
    const [action, setAction] = useState<string>('')
    
    useEffect(() => {
        console.log(groupFormTask)
    }, [groupFormTask])

    return <connectContext.Provider value={{
        action,
        setAction,
        groupFormTask,
        setGroupFormTask,
        indexes,
        setIndexes,
        emails,
        setEmail,
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