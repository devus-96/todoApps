"use client"
import React from "react"
import { HeaderProject } from "@/components/global/header"
import { Priority } from "@/components/Tasks/priority"
import { SortTask } from "@/components/Tasks/sortTasks"
import { Status } from "@/components/Tasks/state"
import { Select } from "@/components/ui/select"
import { taskOptions } from "@/constants/popup"
import { projectsRow } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Filter, Plus, Search, Target } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { fetchTeamsProjects } from "@/api/project"
import { messageContext } from "@/hooks/useMessage"
import { ProjectType } from "@/types/global"
import { ProjectRow } from "./projectRow"


export const ProjectComponent = ({teamId}:{teamId?: string}) => {
    const [select, setSelect] = useState('')
    const [position, setPosition] = useState({x:0, top:0})
    const sortPositon = usePosition()
    const projects = useForm(null)
    const {setGetter} = useContext(messageContext)
    const {setDispatch} = useContext(popupContext)
    const [sortList, setSortList] = useState({priority: '',  state: ''})
    const {groups, indexes} = useContext(connectContext)
    const storeTasks = useRef<unknown[] | null>(null)

    useEffect(() => {
        function handleFetch () {
            fetchTeamsProjects(teamId).then((res) => {
                projects.setValue(res.data)
                storeTasks.current = res.data as ProjectType[]
            }).catch((error) => {
                setGetter((prev) => [...prev, error])
            })
        }
        window.addEventListener('load', handleFetch)
        return () => {
            window.removeEventListener('load', handleFetch)
        }
    })

    useEffect(() => {
        if (indexes !== null) {
            projects.setValue((value: any) => {
                const newTab = [...value];
                newTab[indexes] = {...newTab[indexes], ...groups};
                return newTab
            })
            if (storeTasks.current)
            if (typeof storeTasks.current[indexes] === 'object') {
                storeTasks.current[indexes] = {...storeTasks.current[indexes], ...groups}
            }
        }
    }, [groups, indexes])
    return (
        <section>
            <HeaderProject />
            <Status position={position} />
            <Priority position={position} />
            <SortTask 
            taskOptions={taskOptions}
            setSortList={setSortList} 
            sortList={sortList} 
            position={sortPositon.position}
            />
            <section>
                <div className="flex items-center text-3xl text-sidebarText space-x-4 px-4 my-4">
                    <Target /><p>Projects</p>
                </div>
                <div className="w-full flex justify-between border-b border-borderCard px-4 py-2">
                    <div></div>
                    <div className="flex items-center text-sidebarText space-x-4">
                        <div>
                            <div onClick={(e) => {
                                setDispatch({sortTask: true})
                                sortPositon.handlerBoundingClientLeft(e, 250, 244)
                            }} className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                                <Filter size={16} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-secondary space-x-2 rounded-full text-sidebarText">
                            <Search size={16} />
                            <input 
                                type="text" 
                                className="w-[90%] bg-secondary outline-none"
                                placeholder="search a task"
                                onChange={(e) => projects.handleFilter(e, storeTasks.current)}
                            />
                        </div>
                        <Select 
                        name="Daily" 
                        options={['All Tasks', 'Board', 'Daily tasks', 'Weekly tasks', 'Monthly tasks']} 
                        handler={setSelect}
                        inputClass="flex items-center cursor-pointer justify-between text-gray-300" 
                        className="w-[200px] relative rounded bg-secondary hover:bg-primary p-1 text-sm border border-borderCard"
                        seclectClass="absolute w-[250px] top-[45px] rounded p-5 mb-2 bg-primary shadow text-sidebarText"
                        />
                    </div>
                </div>
                 <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr>
                        {projectsRow.map((item, index) => (
                                <td key={index} className="border-l border-r border-b border-primary pl-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <item.icon size={16} className="block"/><p>{item.name}</p>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>
                        <tbody>
                            {projects.value ? projects.value.map((item: ProjectType , index: number) => (
                                <ProjectRow 
                                key={index} 
                                setPosition={setPosition} 
                                item={item} 
                                occ={index} 
                                value={projects.value}
                                setProjects={projects.setValue}
                                teamId={teamId}
                                />
                            )) : <tr>
                                    <td className="text-sm text-sidebarText"><p className="ml-8">Not datas here yet !</p></td>
                                </tr>}
                        </tbody>
                </table>
                <div  className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                    window.location.assign('/teams/project/new')
                }}>
                <Plus size={24} />
                <p>New Project</p>
            </div>
            </section>
        </section>
    )
}