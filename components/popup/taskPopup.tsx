"use client"

import React from "react"
import { useContext, useEffect, useState } from "react"
import { popupContext } from "@/hooks/usePopup"
import Popup from "./popup"
import { Target, UserRoundPlus, Users } from 'lucide-react';
import { CalendarX } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { AlarmClockPlus } from 'lucide-react';
import { AlarmClockOff } from 'lucide-react';
import { Flag } from "lucide-react"
import { CircleDashed } from 'lucide-react';
import { InputList } from "../Tasks/inputList"
import { connectContext, defaultTask } from "@/hooks/useConnect"
import { Spinner } from "../ui/spinner"
import { priority, states } from "@/constants/task";
import { Tasks } from "@/types/global";
import { messageContext } from "@/hooks/useMessage";
import { changeDateFormat } from "@/lib/action"
import { Menbers } from "../Tasks/menbers"
import { usePosition } from "@/hooks/usePosition"
import { IoMdClose } from "react-icons/io"
import { Menu } from "../global/Menu"
import { z } from "zod"
import { usePathname } from "next/navigation"

export const TaskPopUp = () => {
    const pathname = usePathname()
    //useState
    const [loading, setLoading] = useState(false)
    //useContext
    const {setGetter} = useContext(messageContext)
    const {state, setDispatch} = useContext(popupContext)
    const {
        setDateValue, 
        setTypeTime, 
        formTask, 
        setFormTask, 
        createtask, 
        setAction, 
        groups
    } = useContext(connectContext)
    //useEffect
    useEffect(() => {
        setFormTask((value: Tasks) => {
            let newTab = {...value};
            newTab = {...newTab, ...groups};
            return newTab
        })
    }, [groups])
    //hook
    const position = usePosition()
    //function
    function submitTask () {
        setLoading(true)
        createtask?.submit(formTask, groups)?.then((res) => {
            setGetter((prev) => [res, ...prev])
            setFormTask(defaultTask)
        })
        .catch((error) => {
            if (error instanceof z.ZodError) 
            setGetter((prev) => [error.errors[0].message, ...prev])
            else
            setGetter((prev) => [error, ...prev])
        })
        .finally(() => {
            setLoading(false)
        })
    }
    useEffect (() => console.log(formTask), [formTask])
    //DOM
    return (
    <>
    {state.task && 
    <Popup width="800px" height="auto" popup='task' className="right-0 top-0 bottom-0 overflow-auto scrollbar-hide">
        {state.menberList2 && 
        <Menu active={state.menberList2} dispatch='menberList2'>
            <Menbers position={position.position} value={formTask} />
        </Menu>}
        <div className="text-sidebarText px-16 pt-4 pb-8 space-y-4">
            <input 
                type="text" 
                name='name'
                value={formTask.name}
                className="popupinput text-3xl bg-primary text-gray-300" 
                placeholder='Give a name to your task'
                onChange={(e) => {
                    const target = e.target as HTMLInputElement
                    const newValue = {name: target.value}
                    setFormTask({...formTask, ...newValue})
                }}
            />
            {createtask?.type === 'project' &&
            <div className="flex-justify">
                <div className="flex items-center space-x-4">
                    <Target /><p>Projects</p>
                </div>
                <div className="w-1/2 px-4">
                    <p>{createtask.name}</p>
                </div>
            </div>
            }
            <div className="flex-justify">
                <div className="flex items-center space-x-4">
                    <CalendarX /><p>Startdate</p>
                </div>
                <div className="selectTaskValue" onClick={() => {
                    setDispatch({calendar: true})
                    setDateValue('start_date')
                    setAction('task')
                }}>
                    <p>{changeDateFormat(formTask.start_date)}</p>
                </div>
            </div>
            <div className="flex-justify">
                <div className="flex items-center space-x-4">
                    <CalendarClock /><p>Deadline</p>
                </div>
                <div className="selectTaskValue" onClick={() => {
                    setDispatch({calendar: true})
                    setDateValue('deadline')
                    setAction('task')
                }}>
                    <p>{changeDateFormat(formTask.deadline)}</p>
                </div>
            </div>
            <div className="flex-justify">
                <div className="flex items-center space-x-4">
                    <AlarmClockPlus /><p>Start time</p>
                </div>
                <div className="selectTaskValue" onClick={() => {
                    setTypeTime('start')
                    setAction('task')
                    setDispatch({clock: true})
                }}>
                    <p>{formTask.start_time !== '' ? formTask.start_time : 'Empty'}</p>
                </div>
            </div>
            <div className="flex-justify">
                <div className="flex items-center space-x-4">
                    <AlarmClockOff /><p>End time</p>
                </div>
                <div className="selectTaskValue" onClick={()=> {
                    setAction('task')
                    setTypeTime('end')
                    setDispatch({clock: true})
                }}>
                    <p>{formTask.end_time !== '' ? formTask.end_time : 'Empty'}</p>
                </div>
            </div>
            <InputList 
                name="state" 
                Icons={CircleDashed} 
                placeholder="can't create new status" 
                items={states}
                setValue={setFormTask}
                values={formTask}
            />
            <InputList 
                name="priority" 
                Icons={Flag} 
                placeholder="can't create new priority" 
                items={priority}
                setValue={setFormTask}
                values={formTask}
            />
            {pathname.split('/')[0] === 'teams' &&
            <div className="flex-justify">
                <div className="flex items-center space-x-4">
                    <Users /><p>Assign</p>
                </div>
                <div className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                    <div>
                        {formTask.assign !== '' &&
                        <div>
                        {Object.entries(JSON.parse(formTask.assign)).map((item: any, index: number) => (
                            <div key={index} className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                <p className="text-xs">{item[1]}</p>
                                <IoMdClose size={12} className="cursor-pointer" onClick={() => {
                                }}/>
                            </div>
                        ))}
                        </div>
                        }
                        <div className="flex text-sm items-center py-1 px-4 space-x-2 cursor-pointer bg-sidebarText rounded text-gray-800"
                            onClick={(e) => {
                                position.handlerBoundingClientRight(e, 250)
                                setDispatch({
                                    menberList2: true
                                })
                            }}>
                            <UserRoundPlus size={16} />
                            <p>Add participants</p>
                        </div>
                    </div>
                </div>
            </div>
            }
            <textarea 
                placeholder='add description'
                name='description'
                onClick={(e) => {
                    let target = e.target as HTMLTextAreaElement;
                    let newvalue = {description: target.value}
                    setFormTask({...formTask, ...newvalue})
                }}
                className="w-full bg-primary text-sidebarText border-b border-sidebarText outline-none p-3 text-sm max-lg:mb-5"
            ></textarea>
                <div className="w-[30%] absolute right-16">
                <button 
                    type="submit" 
                    className="btn1 flex-center gap-4 text-gray-800"
                    onClick={() => submitTask()}>
                    {loading && <Spinner className="w-[20px] p-0" fill="#9eabe4" bg="#fff"/>}create
                </button>
            </div>
        </div>
    </Popup>
    }
    </>
    )
}