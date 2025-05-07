"use client"
import React from "react"
import { defaultValue, tasksRow, userstasksRow } from "@/constants/task"
import { ProjectTable } from "../project/projectTable"
import { format } from "date-fns"
import { ProjectType, Tasks } from "@/types/global"
import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { Status } from "./state"
import { Priority } from "./priority"
import { Menbers } from "./menbers"
import { Plus } from "lucide-react"
import { Menu } from "../global/Menu"
import { usePathname } from "next/navigation"

interface TaskProps {
    task: Tasks[],
    setTask: Dispatch<SetStateAction<Tasks[]>>,
    error: string,
    setError: (value: (prev: unknown[]) => unknown[]) => void
}

export const TaskForm:FC<TaskProps> = ({
    task,
    setTask,
    error,
    setError
}) => {
    const pathname = usePathname()
    //useREf
    const storeTasks = useRef(defaultValue)
    // useState
    const [position, setPosition] = useState({x:0, top:0})
    //useContext
    const {groups, indexes}= useContext(connectContext)
    const {state} = useContext(popupContext)
     //useEffect
     useEffect(() => {
        if (indexes !== null) {
            try {
                setTask((value: Tasks[]) => {
                    const newTab = [...value];
                    newTab[indexes] = {...newTab[indexes], ...groups};
                    return newTab
                })
                storeTasks.current[indexes] = {...storeTasks.current[indexes], ...groups}
            } catch(error) {
                setError((prev) => [...prev, error])
            }
        }
    }, [groups, indexes])
    useEffect(() => console.log(task), [task])
    console.log(pathname.split('/'))
    return (
    <div>
        <Status position={position} />
        <Priority position={position}/>
        {((indexes !== null && task) && state.menberList) && 
            <Menu active={state.menberList} dispatch='menberList'>
                <Menbers position={position} value={task[indexes]} />
            </Menu>
        }
        <div className="mt-12">
            <div className="w-full scrollbar-hide">
                <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    {pathname.split('/')[1] === 'teams' && 
                    <thead>
                        <tr>
                            {tasksRow.map((item, index) => (
                            <td key={index} className="border-l border-r border-b border-primary pl-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <item.icon size={16} className="block"/><p>{item.name}</p>
                                </div>
                            </td>
                            ))}
                        </tr>
                    </thead>
                    }
                    {pathname.split('/')[1] === 'users' && 
                    <thead>
                        <tr>
                            {userstasksRow.map((item, index) => (
                            <td key={index} className="border-l border-r border-b border-primary pl-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <item.icon size={16} className="block"/><p>{item.name}</p>
                                </div>
                            </td>
                            ))}
                        </tr>
                    </thead>
                    }
                    <tbody>
                        {task.map((item: Tasks , index: number) => (
                            <ProjectTable 
                            key={index} 
                            index={index} 
                            setPosition={setPosition}
                            priority={item.priority}
                            states={item.state}
                            start_date={item.start_date}
                            deadline={item.deadline}
                            start_time={item.start_time}
                            end_time={item.end_time}
                            value={task}
                            error={error}
                            setTasks={setTask}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                setTask([...task, {
                    name: '',
                    assign: '',
                    priority: 'Empty',
                    state: 'not started',
                    start_date: format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
                    deadline: format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
                }])
            }}>
                <Plus size={24} />
                <p>New Task</p>
            </div>
        </div>
    </div>
    )
}