"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { popupContext } from "@/hooks/usePopup"
import Popup from "./popup"
import { optionsRepetition } from "@/constants/task"
import { Select } from "../ui/select"
import { Target } from 'lucide-react';
import { Users } from 'lucide-react';
import { CalendarX } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { AlarmClockPlus } from 'lucide-react';
import { AlarmClockOff } from 'lucide-react';
import { Flag } from "lucide-react"
import { Tags } from "lucide-react"
import { CircleDashed } from 'lucide-react';
import { InputList } from "../global/inputList"
import { connectContext } from "@/hooks/useConnect"
import { format } from "date-fns"
import { Spinner } from "../ui/spinner"

const project = [
    "project du mois d'octobre",
    "application de devellopement personnel",
    "formation video"
]
const priority = [
    'high',
    'low',
    'medim'
]
const status = [
    'Cancel',
    'Completed',
    'In Progress',
    'Done',
    "Plan"
]

const emails = [
    'marcdeus@gmail.com',
    "austinndjom@gmail.com",
    "fsadfdsafdf@gmail.com",
    "dsfdsfsdfsd@gmail.com",
    "irorororor@gmail",
    "sdsaooorje@gmail.com",
    "qwjjejejrrr@gmail.com",
    "eriowerjewoijr@gmail.com"
]

export const TaskPopUp = () => {
    const [error, setError] = useState<unknown>()
    const {state, setDispatch} = useContext(popupContext)
    const {setDateValue, setTypeTime, formTask, setFormTask} = useContext(connectContext)

    return (
       <>
            {state.task && 
                <Popup width="800px" height="auto" modeNight={true} popup='task' className="right-0 top-0 bottom-0 overflow-auto scrollbar-hide">
                    <div className="text-sidebarText px-16 py-4 space-y-4">
                        <input 
                            type="text" 
                            name='name'
                            className="popupinput text-3xl bg-primary text-gray-300" 
                            placeholder='Give a name to your task'
                        />
                        <InputList name="project" Icons={Target} placeholder="search or create a project" items={project}/>
                        <div className="flex-justify">
                            <div className="flex items-center space-x-4">
                                <CalendarX /><p>startdate</p>
                            </div>
                            <div className="selectTaskValue" onClick={() => {
                                setDispatch({calendar: true})
                                setDateValue('startdate')
                            }}>
                                <p>{format(formTask.start_date, "dd/MM/yyyy")}</p>
                            </div>
                        </div>
                        <div className="flex-justify">
                            <div className="flex items-center space-x-4">
                                <CalendarClock /><p>deadline</p>
                            </div>
                            <div className="selectTaskValue" onClick={() => {
                                setDispatch({calendar: true})
                                setDateValue('deadline')
                            }}>
                                <p>{format(formTask.deadline, "dd/MM/yyyy")}</p>
                            </div>
                        </div>
                        <div className="flex-justify">
                            <div className="flex items-center space-x-4">
                                <AlarmClockPlus /><p>start time</p>
                            </div>
                            <div className="selectTaskValue" onClick={() => {
                                setTypeTime('start')
                                setDispatch({clock: true})
                            }}>
                                <p>{formTask.start_time}</p>
                            </div>
                        </div>
                        <div className="flex-justify">
                            <div className="flex items-center space-x-4">
                                <AlarmClockOff /><p>end time</p>
                            </div>
                            <div className="selectTaskValue" onClick={()=> {
                                setTypeTime('end')
                                setDispatch({clock: true})
                            }}>
                                <p>{formTask.end_time}</p>
                            </div>
                        </div>
                        <InputList name="status" Icons={CircleDashed} placeholder="can't create new status" items={status}/>
                        <InputList name="priority" Icons={Flag} placeholder="can't create new priority" items={priority}/>
                        <InputList name="assign" Icons={Users} placeholder="assign to your menbers" items={emails}/>
                        <InputList name="tags" Icons={Tags} placeholder="comming soom !!!" items={project}/>
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
                                onClick={() => {
                                }}>
                                <Spinner className="w-[20px] p-0" fill="#9eabe4" bg="#fff"/>create
                            </button>
                        </div>
                    </div>
                </Popup>
            }
       </>
    )
}

/*
<Select 
    name="Does not repeat" 
    options={optionsRepetition} 
    handler={setSelect}
    inputClass="flex items-center cursor-pointer p-2 rounded justify-between border border-sidebarText text-sidebarText" 
    className="w-full relative rounded-lg p-2 text-sm"
    seclectClass="absolute w-full top-[-300px] rounded p-5 mb-2 bg-primary shadow text-sidebarText"
/>*/
