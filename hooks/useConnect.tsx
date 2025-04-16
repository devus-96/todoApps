"use client"
import { Tasks } from "@/types/global";
import { createContext, useEffect, useState } from "react";

const defaultTask = {
    name: '',
    project: '' ,
    assign: {} as Record<string,any>,
    priority: '',
    state: '',
    start_date: new Date(),
    deadline: new Date(),
    start_time: '',
    end_time: '',
}

const defaultValue = {
    name: '',
    assign: {},
    priority: 'Empty',
    state: 'Plan',
    start_date: new Date(),
    deadline: new Date(),
    start_time: '00:00AM',
    end_time: '00:00AM',
}

export const projectDefaultValue = {
    name: '',
    objectifs: {'0': ''},
    start_date: new Date(),
    deadline: new Date(),
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
    currTaskDetails: {data: undefined} as {data: Tasks | undefined},
    setCurrTaskDetails: (data: any) => {},
    groups: {},
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
    const [currTaskDetails, setCurrTaskDetails] = useState<{data: Tasks | undefined}>({data: undefined})

    useEffect(() => {
        console.log(groupFormTask)
    }, [groupFormTask])

    useEffect(() => {
        console.log(formProject)
    }, [formProject])

    useEffect(() => {console.log(groups)}, [groups])

    return <connectContext.Provider value={{
        currTaskDetails,
        setCurrTaskDetails,
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