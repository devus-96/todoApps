"use client"
import React from "react";
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { emails, priority, states } from "@/constants/task";
import { keySortTask } from "@/types/global";
import { popupContext } from "@/hooks/usePopup";
import { OptionsComponent } from "./optionSortTask";
import { Menu } from "../global/Menu";

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
    position
}: {
    setSortList: Dispatch<SetStateAction<sortListProps>>,
    sortList: sortListProps
    taskOptions: any[]
    position: {x: number, top: number}
}) => {
    const [child, setChild] = useState('')
    const {setDispatch, state} = useContext(popupContext)
    return (
        <>
            {state.sortTask && 
            <Menu active={state.sortTask} dispatch='sortTask'>
                <div className='fixed z-30' style={{
                    left: position.x + 'px',
                    top: position.top + 'px',
                }}>
                    <div className="fixed flex items-center">
                        <div className="absolute left-[-250px]">
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
                            height: 250 + 'px'
                        }} className="w-[244px] h-[250px] text-sidebarText bg-secondary border border-borderCard rounded">
                            <div className="my-4 ml-4">
                                <p>option</p>
                            </div>
                            <div className="space-y-2">
                                {taskOptions.map((item, index) => (
                                    <div key={index} className="w-full px-4">
                                        <div className="w-full rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-xs">
                                            <p>{item}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Menu>
            }
        </>
    )
}