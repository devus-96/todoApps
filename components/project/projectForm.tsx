"use client"
import React from "react"
import { defaultValue, priority, projectDefaultValue, states } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { popupContext } from "@/hooks/usePopup"
import { ProjectType, Tasks } from "@/types/global"
import { Calendar, CircleDashed, Flag, MessageSquareText, Plus, SquareCheck } from "lucide-react"
import {  useContext, useEffect, useRef, useState } from "react"
import { HeaderProject } from "../global/header"
import { createTeamsProjects } from "@/api/project"
import { ProjectSchema, TaskSchema } from "@/types/schema"
import { InputList } from "../Tasks/inputList"
import { TaskForm } from "../Tasks/TaskForm"
import { HTTPClient } from "@/lib/https"
import { messageContext } from "@/hooks/useMessage"
import { ZodError } from "zod"
import { changeDateFormat } from "@/lib/action"

export const ProjectFrom = ({teamid}:{teamid?: string}) => {
     //useRef
     const numberRef = useRef<number>(1)
     //hook
     const project = useForm(projectDefaultValue, ProjectSchema)
     const tasks = useForm(defaultValue, TaskSchema)
     //useContext
     const {setDispatch} = useContext(popupContext)
     const {setDateValue, date}= useContext(connectContext)
     const {setGetter} = useContext(messageContext)
     //useState
     const [loading, setLoading] = useState(false)
     const [showDescription, setShowDescription] = useState<boolean>(false)
     const [number, setNumber] = useState(1)
     //useEffect
    useEffect(() => {
        project.setValue((value: ProjectType) => {
            let newTab = {...value};
            newTab = {...newTab, ...date};
            return newTab
        })
    }, [date])
    //function
    function sortTasks (data: Tasks[]) {
        let newTab = [] as Tasks[]
        let badTask = [] as Tasks[]
        for(let i = 0; i <= data.length - 1; i++) {
            try {
                TaskSchema.parse(data[i])
                tasks.verifyDate(tasks.value[i])
                tasks.verifyTasksDate(project.value, data[i])
                newTab = [...newTab, data[i]]
            } catch (error) {
                badTask = [...badTask, data[i]]
                sessionStorage.setItem("badtask", JSON.stringify(badTask))
                if (error instanceof ZodError) {
                    setGetter((prev) => [...prev, error.errors[0].message + `the task ${i+1} have not been submitted`])
                } else {
                    setGetter((prev) => [...prev, error+ `the task ${i+1} have not been submitted`])
                }
                continue;
            }
        }
        return newTab
    }

    function submit () {
        setLoading(true)
        setGetter(() => [])
        createTeamsProjects(project.value, teamid)
        .then((res) => {
            setGetter((prev) => [...prev, res])
            const tasksValues = sortTasks(tasks.value)
            tasksValues.forEach((item) => {
                let newTask = {...item} as unknown
                const newAssign = {assign: JSON.stringify(item.assign)}
                newTask = {...item, ...newAssign}
                HTTPClient().post(`/task/create`, newTask, {
                    params: {teamId: teamid ? teamid : undefined , projectId: res.data.data.id}
                }).then((res) => {
                    setGetter((prev) => [...prev, res])
                }).catch((error) => {
                    setGetter((prev) => [...prev, error])
                })
            })
        })
        .catch((error: any) => {
            if (error instanceof ZodError) {
                setGetter((prev) => [...prev, error.errors[0].message])
            } else {
                setGetter((prev) => [...prev, error])
            }
        })
        .finally(() => {
            setTimeout(() => {
                //window.location.reload()
                setLoading(false)
            }, 2000)
        });
    }
    return (
        <div>
            <div className="">
                <HeaderProject submit={submit} loading={loading} />
                <input 
                    type="text" 
                    name='name'
                    value={project.value.name}
                    className="popupinput text-3xl bg-inherit text-gray-300 mt-12 ml-12" 
                    placeholder='Give a name to your project'
                    onChange={(e) => project.handleChange(e)}
                />
                <div className="ml-14 pr-12 mt-8 cursor-pointer" onClick={() => {setShowDescription(true)}}>
                    <div className="flex items-center space-x-2 text-holder p-1 duration-300 hover:bg-primary hover:text-gray-300">
                        <MessageSquareText size={24} />
                        <p className="">add comment</p>
                    </div>
                    {showDescription && <textarea 
                    placeholder='add description'
                    name='description'
                    value={project.value.description}
                    onChange={(e) => {
                        project.handleChange(e)
                    }}
                    className="w-full bg-primary text-sidebarText border-b scrollbar-hide border-sidebarText outline-none p-3 text-sm max-lg:mb-5"
                    ></textarea>}
                </div>
                <div className="w-[500px] ml-14 pr-12 mt-8 text-holder">
                    <InputList 
                        name="state" 
                        Icons={CircleDashed} 
                        placeholder="can't create new status" 
                        items={states}
                        setValue={project.setValue}
                        values={project.value}
                    />
                </div>
                <div className="w-[500px] ml-14 pr-12 mt-8 text-holder">
                    <InputList 
                        name="priority" 
                        Icons={Flag} 
                        placeholder="can't create new priority" 
                        items={priority}
                        setValue={project.setValue}
                        values={project.value}
                    />
                </div>
                <div className="ml-14 pr-12 mt-8">
                    <div className="flex items-center w-full space-x-4">
                        <div className="w-1/2">
                            <div className="flex items-center space-x-2 text-holder mb-4">
                                <Calendar size={24} />
                                <p className="">startdate</p>
                            </div>
                            <div onClick={() => {
                                setDispatch({calendar: true})
                                setDateValue("start")
                            }} className="w-full bg-primary cursor-pointer text-sidebarText border-sidebarText outline-none p-3 text-sm">
                                <p>{changeDateFormat(project.value.start_date)}</p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex items-center space-x-2 text-holder mb-4">
                                <Calendar size={24} />
                                <p className="">deadline</p>
                            </div>
                            <div onClick={()=>{
                                setDispatch({calendar: true})
                                setDateValue("end")
                            }} className="w-full bg-primary cursor-pointer text-sidebarText border-sidebarText outline-none p-3 text-sm">
                                <p>{changeDateFormat(project.value.deadline)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-12 mt-8" >
                    <div className="group flex items-center cursor-pointer">
                        <Plus size={24} className="text-sidebarText" />
                        <p className="text-3xl text-btnColor ">Objectif</p>
                    </div>
                </div>
                <div>
                    <div className="ml-24 mt-4">
                        {Array.from({ length: number }).map((_,index) => (
                            <div key={index} className="flex items-center text-btnColor">
                            <SquareCheck size={24}/>
                            <input 
                                onChange={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    let objectifValue = {[`${index}`]: target.value};
                                    project.setValue((formProject: ProjectType) => {
                                        const nouveauTableau = {...formProject};
                                        nouveauTableau['objectifs'] = {...nouveauTableau['objectifs'], ...objectifValue};
                                        if (objectifValue[index] === '') {
                                            delete nouveauTableau['objectifs'][index]
                                            return nouveauTableau;
                                        }
                                        return nouveauTableau;
                                    })
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        numberRef.current++
                                        setNumber(numberRef.current)
                                    }
                                }}
                                value={undefined}
                                type="text" 
                                name={`${index}`}
                                className="popupinput text-base bg-inherit text-gray-300" 
                                placeholder="Write project's objectif then click Enter for record"
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <TaskForm 
                task={tasks.value} 
                setTask={tasks.setValue}
                error={tasks.error}
                setError={setGetter}
            />
        </div>
    )
}