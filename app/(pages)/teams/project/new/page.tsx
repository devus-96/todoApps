"use client"
import { useContext, useRef, useState } from "react"
import React from "react"
import { Plus, SquareCheck, MessageSquareText, Calendar } from 'lucide-react';
import { projectRow } from "@/constants/task";
import { ProjectTable } from "@/components/global/projectTable";
import { useForm } from "@/hooks/useForm";
import { connectContext, projectDefaultValue } from "@/hooks/useConnect";
import { format } from "date-fns";
import { HeaderProject } from "@/components/global/header";
import { popupContext } from "@/hooks/usePopup";

function List () {
    const {handleChange, value, valueRef} = useForm({name: ''})
    const {setObjectif, objectif}= useContext(connectContext)
    return (
        <div className="flex items-center text-btnColor">
            <SquareCheck size={24}/>
            <input 
                onChange={(e) => {
                    handleChange(e)
                    setObjectif([...objectif, valueRef.current])
                }}
                value={value.name}
                type="text" 
                name='name'
                className="popupinput text-base bg-inherit text-gray-300" 
                placeholder="Write project's objectif then click Enter for record"
            />
        </div>
    )
}

export default function NewProject () {
    // useState
    let [number, setNumber] = useState(1)
    let [showDescription, setShowDescriptio] = useState<boolean>(false)
    //useRef
    let numberRef = useRef<number>(1)
    //useContext
    const {setGroupFormTask, groupFormTask, setDateValue, setAction, formProject, setFormProject}= useContext(connectContext)
    const {state, setDispatch} = useContext(popupContext)
    //hook
    const {handleChange, value, valueRef} = useForm(projectDefaultValue)
    //Dom
    return (
        <div className="w-[calc(100%-200px)] bg-secondary min-h-screen pb-12">
            <div className="w-full h-[200px] bg-gradient-to-t from-secondary to-btnColor">
                <HeaderProject />
            </div>
            <div>
            <input 
                type="text" 
                name='name'
                value={value.name}
                className="popupinput text-3xl bg-inherit text-gray-300 mt-12 ml-12" 
                placeholder='Give a name to your project'
                onChange={(e) => {
                    handleChange(e)
                    let newValue = {name: valueRef.current}
                    setFormProject({...formProject, ...newValue})
                }}
            />
            <div className="ml-14 pr-12 mt-8 cursor-pointer" onClick={() => {setShowDescriptio(true)}}>
                <div className="flex items-center space-x-2 text-[#444] p-1 duration-300 hover:bg-primary hover:text-gray-300">
                    <MessageSquareText size={24} />
                    <p className="">add comment</p>
                </div>
                {showDescription && <textarea 
                placeholder='add description'
                name='description'
                value={value.description}
                onChange={(e) => {
                    handleChange(e)
                    let newValue = {description: valueRef.current}
                    setFormProject({...formProject, ...newValue})
                }}
                className="w-full bg-primary text-sidebarText border-b scrollbar-hide border-sidebarText outline-none p-3 text-sm max-lg:mb-5"
                ></textarea>}
            </div>
            <div className="ml-14 pr-12 mt-8">
                <div className="flex items-center w-full space-x-4">
                    <div className="w-1/2">
                        <div className="flex items-center space-x-2 text-[#444] mb-4">
                            <Calendar size={24} />
                            <p className="">startdate</p>
                        </div>
                        <div onClick={() => {
                            setDispatch({calendar: true})
                            setDateValue("startdate")
                            setAction('fill project value')
                        }} className="w-full bg-primary cursor-pointer text-sidebarText border-sidebarText outline-none p-3 text-sm">
                            <p>{format(formProject.start_date, 'dd/MM/yyy')}</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center space-x-2 text-[#444] mb-4">
                            <Calendar size={24} />
                            <p className="">deadline</p>
                        </div>
                        <div onClick={()=>{
                            setDispatch({calendar: true})
                            setDateValue("deadline")
                            setAction('fill project value')
                        }} className="w-full bg-primary cursor-pointer text-sidebarText border-sidebarText outline-none p-3 text-sm">
                            <p>{format(formProject.deadline, 'dd/MM/yyy')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-12 mt-8" onClick={() => {
                numberRef.current++
                setNumber(numberRef.current)
            }}>
                    <div className="group flex items-center cursor-pointer">
                        <Plus size={24} className="text-sidebarText opacity-0 group-hover:opacity-85" />
                        <p className="text-3xl text-btnColor ">Objectif</p>
                    </div>
                </div>
                <div>
                    <div className="ml-24 mt-4">
                        {Array.from({ length: number }).map((_,index) => (
                            <List key={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="ml-12 mt-12">
            <div className="w-full scrollbar-hide">
                <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr>
                            {projectRow.map((item, index) => (
                            <td key={index} className="border-l border-r border-b border-primary pl-4">
                                <div className="flex gap-2">
                                    <item.icon className="block"/>{item.name}
                                </div>
                            </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {groupFormTask.map((item, index) => (
                            <ProjectTable 
                            key={index} 
                            index={index} 
                            priority={item.priority}
                            states={item.state}
                            start_date={format(item.start_date, 'dd/MM/yyy')}
                            deadline={format(item.deadline, 'dd/MM/yyy')}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                setGroupFormTask([...groupFormTask, {
                    name: '',
                    project: 'Empty',
                    assign: [''],
                    priority: 'Empty',
                    state: 'Empty',
                    start_date: new Date(),
                    deadline: new Date(),
                    start_time: '00:00AM',
                    end_time: '00:00AM',
                }])
            }}>
                <Plus size={24} />
                <p>New Task</p>
            </div>
            </div>
        </div>
    )
}