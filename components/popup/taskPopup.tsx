"use client"

import { useContext, useEffect } from "react"
import { popupContext } from "@/hooks/usePopup"
import Popup from "./popup"
import { Target, Users } from 'lucide-react';
import { CalendarX } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { AlarmClockPlus } from 'lucide-react';
import { AlarmClockOff } from 'lucide-react';
import { Flag } from "lucide-react"
import { Tags } from "lucide-react"
import { CircleDashed } from 'lucide-react';
import { InputList } from "../Tasks/inputList"
import { connectContext } from "@/hooks/useConnect"
import { format } from "date-fns"
import { Spinner } from "../ui/spinner"
import { emails, priority, states } from "@/constants/task";
import { Tasks } from "@/types/global";

const project = [
    "project du mois d'octobre",
    "application de devellopement personnel",
    "formation video"
]

export const TaskPopUp = () => {
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {setDateValue, setTypeTime, formTask, setFormTask, setAction, groups} = useContext(connectContext)
    //useEffect
    useEffect(() => {
            setFormTask((value: Tasks) => {
                let newTab = {...value};
                newTab = {...newTab, ...groups};
                return newTab
            })
    }, [groups])
    //DOM
    return (
       <>
            {state.task && 
                <Popup width="800px" height="auto" popup='task' className="right-0 top-0 bottom-0 overflow-auto scrollbar-hide">
                    <div className="text-sidebarText px-16 py-4 space-y-4">
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
                        <InputList 
                            name="project" 
                            Icons={Target} 
                            placeholder="can't create new status" 
                            items={states}
                            setValue={setFormTask}
                            values={formTask}
                        />
                        <div className="flex-justify">
                            <div className="flex items-center space-x-4">
                                <CalendarX /><p>Startdate</p>
                            </div>
                            <div className="selectTaskValue" onClick={() => {
                                setDispatch({calendar: true})
                                setDateValue('startdate')
                                setAction('task')
                            }}>
                                <p>{format(formTask.start_date, "dd/MM/yyyy")}</p>
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
                                <p>{format(formTask.deadline, "dd/MM/yyyy")}</p>
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
                        <InputList 
                            name="tags" 
                            Icons={Tags} 
                            placeholder="comming soom !!!" 
                            items={project}
                            setValue={setFormTask}
                            values={formTask}
                        />
                        <InputList 
                            name="assign" 
                            Icons={Users} 
                            placeholder="assign to your menbers" 
                            items={emails}
                            setValue={setFormTask}
                            values={formTask}
                        />
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