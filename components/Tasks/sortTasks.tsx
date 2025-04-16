"use client"
import React from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { emails, priority, states } from "@/constants/task";
import clsx from "clsx";
import { keySortTask, Tasks } from "@/types/global";
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
import { OptionsComponent } from "./optionSortTask";

export type sortListProps = {
    assign?: string,
    priority: string,
    state: string,
    daily?: string,
    weeky?: string,
    monthly?:string
}

export const SortTask = ({
    setSortList,
    sortList,
    taskOptions,
    type,
    value,
    setValue
}: {
    setSortList: Dispatch<SetStateAction<sortListProps>>,
    sortList: sortListProps
    taskOptions: any[]
    type: string,
    value?: any,
    setValue? : React.Dispatch<React.SetStateAction<Tasks[]>>
}) => {
    const [child, setChild] = useState('')
    const {setFormTask} = useContext(connectContext)
    const {setDispatch} = useContext(popupContext)
    return (
        <div className="fixed flex items-center">
            <div className="absolute left-[-280px]">
                {(child === 'Menbers') && 
                <OptionsComponent 
                    tab={emails} 
                    setSortList={setSortList} 
                    sortList={sortList} 
                    setChild={setChild} 
                    child={child} />}
                {child === 'Priority' && 
                <OptionsComponent 
                    tab={priority} 
                    setSortList={setSortList} 
                    sortList={sortList} 
                    setChild={setChild} 
                    child={child} />}
                {child === 'States' && 
                <OptionsComponent   
                    tab={states} 
                    setSortList={setSortList} 
                    sortList={sortList} 
                    setChild={setChild} 
                    child={child} />}
            </div>
            <div onMouseOver={(e) => {
                const target = e.target as HTMLParagraphElement
                setChild(target.innerText)
            }} 
            onClick={(e) => {
                const target = e.target as HTMLParagraphElement
                let key = target.innerText.toLocaleLowerCase() as keySortTask
                const tab = ['daily', 'weekly', 'monthly']
                if (tab.includes(key)) {
                    const newValue = {[key]: key}
                    setSortList({...sortList, ...newValue})
                    setDispatch({sortTask: false})
                    document.body.style.overflow = 'auto'
                }
            }}
            style={{
                height: type === 'sort' ? 250 + 'px' : 200 + 'px'
            }} className="w-[244px] h-[250px] text-sidebarText bg-secondary border border-borderCard rounded">
                <div className="my-4 ml-4">
                    <p>option</p>
                </div>
                <div className="space-y-2">
                    {type === 'sort' ? 
                        <>
                            {taskOptions.map((item, index) => (
                                <div key={index} className="w-full px-4">
                                    <div className="w-full rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-xs">
                                        <p>{item}</p>
                                    </div>
                                </div>
                            ))}
                        </> :
                        <div>
                            {taskOptions.map((item, index) => (
                            <div key={index} className="w-full px-4">
                                <div onClick={() => {
                                document.body.style.overflow = 'auto'
                                switch (item.name) {
                                    case 'Duplicate':
                                        value && setFormTask(value)
                                        setDispatch({task: true})
                                        setDispatch({taskAction: false})
                                        break;
                                    case 'Add comment':
                                        value && setFormTask(value)
                                        setDispatch({comment: true})
                                        setDispatch({taskAction: false})
                                        break;
                                    case 'Open':
                                        value && setFormTask(value)
                                        setDispatch({task: true})
                                        setDispatch({taskAction: false})
                                        break;
                                    case 'Delete task':
                                        setValue && setValue((prevElements: Tasks[]) => {
                                            let newTab = [...prevElements]
                                            newTab = newTab.filter((item) => item !== value)
                                            return newTab
                                        })
                                        break;
                                }
                                }} className={clsx("w-full flex items-center space-x-2 rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-sm", {
                                    'hover:text-red-400' : item.name === 'Delete task'
                                })}>
                                    <item.icon size={18} />
                                    <p>{item.name}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
        
    )
}
