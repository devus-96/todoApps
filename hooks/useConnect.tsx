"use client"
import { ProjectType, Tasks } from "@/types/global";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const defaultTask = {
    name: '',
    assign: '',
    priority: '',
    state: '',
    start_date: new Date().toLocaleDateString(),
    deadline: new Date().toLocaleDateString(),
    start_time: '',
    end_time: '',
}

type taskdetailType = {
    type: string,
    name: string,
    submit: (formTask: Tasks, group?: any) => Promise<never> | undefined
}

const defaultValue = {
    name: '',
    assign: '',
    priority: 'Empty',
    state: 'Plan',
    start_date: new Date().toLocaleDateString(),
    deadline: new Date().toLocaleDateString(),
    start_time: '00:00AM',
    end_time: '00:00AM',
}

export const projectDefaultValue = {
    name: '',
    objectifs: {'0': ''},
    start_date: new Date().toLocaleDateString(),
    deadline: new Date().toLocaleDateString(),
    repeat: '',
    image: '',
}

type group = ((prevElements: Tasks[]) => Tasks[]) | Tasks[]
type formTask = ((prevElements: Tasks) => Tasks) | Tasks

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
    createtask: null as taskdetailType | null,
    setCreatetask: (data: taskdetailType) => {},
    currTaskDetails: {data: undefined} as {data: Tasks | undefined},
    setCurrTaskDetails: (data: any) => {},
    date: {},
    setDate: (date: any) => {},
    groups: {} as any,
    setGroups: (action:any) => {},
    formProject: projectDefaultValue,
    setFormProject: (action:any) => {},
    action: '',
    setAction: (action: string) => {},
    groupFormTask: [defaultValue] as Tasks[],
    setGroupFormTask: (value: group) => {},
    indexes: null as number | null,
    setIndexes: (index: number) => {},
    dateValue: '',
    setDateValue: (date: string) => {},
    typeTime: '',
    setTypeTime: (time: string) => {},
    formTask: defaultTask as Tasks,
    setFormTask: (value: formTask) => {},
})

export function ConnectContextProvider ({children}: {children: React.ReactNode}) {
    const [formProject, setFormProject] = useState(projectDefaultValue)
    const [dateValue, setDateValue] = useState<string>('')
    const [typeTime,setTypeTime] = useState<string>('')
    const [formTask, setFormTask] = useState<Tasks>(defaultTask)
    const [indexes, setIndexes] = useState<number | null>(null)
    const [groupFormTask, setGroupFormTask] = useState<Tasks[]>([defaultValue])
    const [action, setAction] = useState<string>('')

    const [groups, setGroups] = useState<Record<string, any>>({})
    const [date, setDate] = useState<Record<string, any>>({})
    const [currTaskDetails, setCurrTaskDetails] = useState<{data: Tasks | undefined}>({data: undefined})
    const [createtask, setCreatetask] = useState<taskdetailType | null>(null)

    return <connectContext.Provider value={{
        createtask,
        setCreatetask,
        currTaskDetails,
        setCurrTaskDetails,
        date,
        setDate,
        groups,
        setGroups,
        formProject,
        setFormProject,
        action,
        setAction,
        groupFormTask,
        setGroupFormTask,
        indexes,
        setIndexes,
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