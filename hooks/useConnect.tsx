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


export type ProjectType = {
    name: string;
    objectifs: string[];
    start_date: DateConstructor;
    deadline: DateConstructor;
    repeat: string;
    image: string;
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

export const projectDefaultValue = {
    name: '',
    objectifs: [''],
    start_date: new Date(),
    deadline: new Date(),
    repeat: '',
    image: '',
}

type group = ((prevElements: tabTask[]) => tabTask[]) | tabTask[]

/**
 * groupFormTask: sert a conserver sous forme d'object tout les taches de la partit projet
 * indexes: sert a indexer les taches de la table projet de facon unique
 * objectif: collecter les objectifs
 * dateValue: savoir au calendier pour savoir ou appliquer les valeurs
 * typeTime: sert a l'horloge pour savoir ou appliquer les valeurs
 * formTask: recupere les attribut de la partie tache.
 * action: permet au calendier de savoir quelle la fonction a executer lorsque on click sur un jour
 */

export const connectContext = createContext({
    formProject: projectDefaultValue,
    setFormProject: (action: typeof projectDefaultValue) => {},
    action: '',
    setAction: (action: string) => {},
    groupFormTask: [defaultValue],
    setGroupFormTask: (value: group) => {},
    indexes: 0,
    setIndexes: (index: number) => {},
    objectif:[''],
    setObjectif: (email: string[]) => {},
    dateValue: '',
    setDateValue: (date: string) => {},
    typeTime: '',
    setTypeTime: (time: string) => {},
    formTask: defaultValue,
    setFormTask: (value: clock) => {},
})

export function ConnectContextProvider ({children}: {children: React.ReactNode}) {
    const [formProject, setFormProject] = useState(projectDefaultValue)
    const [dateValue, setDateValue] = useState<string>('')
    const [typeTime,setTypeTime] = useState<string>('')
    const [formTask, setFormTask] = useState(defaultValue)
    const [indexes, setIndexes] = useState<number>(0)
    const [groupFormTask, setGroupFormTask] = useState([defaultValue])
    const [objectif, setObjectif] = useState<string[]>([''])
    const [action, setAction] = useState<string>('')

    useEffect(() => {
        console.log(groupFormTask)
    }, [groupFormTask])

    useEffect(() => {
        console.log(formProject)
    }, [formProject])

    useEffect(() => {
        const newValue = {objectifs: objectif}
        setFormProject({...formProject, ...newValue})
    }, [objectif])

    return <connectContext.Provider value={{
        formProject,
        setFormProject,
        action,
        setAction,
        groupFormTask,
        setGroupFormTask,
        indexes,
        setIndexes,
        objectif,
        setObjectif,
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