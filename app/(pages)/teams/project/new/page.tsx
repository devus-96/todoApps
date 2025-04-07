"use client"
import { useContext, useEffect, useRef, useState } from "react"
import React from "react"
import { Plus, SquareCheck, MessageSquareText, Calendar } from 'lucide-react';
import { projectRow } from "@/constants/task";
import { ProjectTable } from "@/components/global/projectTable";
import { useForm } from "@/hooks/useForm";
import { connectContext, projectDefaultValue } from "@/hooks/useConnect";
import { format } from "date-fns";
import { HeaderProject } from "@/components/global/header";
import { popupContext } from "@/hooks/usePopup";
import { Status } from "@/components/global/state";
import { Priority } from "@/components/global/priority";
import { ProjectType, Tasks } from "@/types/global";

function List ({index}:{index: number}) {
    let defaultValue = {[index] : ''}
    const {handleChange, value, valueRef} = useForm(defaultValue)
    let {setFormProject}= useContext(connectContext)
    return (
        <div className="flex items-center text-btnColor">
            <SquareCheck size={24}/>
            <input 
                onChange={(e) => {
                    handleChange(e);
                    let objectifValue = {[`${index}`]: valueRef.current};
                    setFormProject((formProject: ProjectType) => {
                        const nouveauTableau = {...formProject};
                        nouveauTableau['objectifs'] = {...nouveauTableau['objectifs'], ...objectifValue};
                        return nouveauTableau;
                    })
                }}
                type="text" 
                name={`${index}`}
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
    const [position, setPosition] = useState({x:0, top:0})
    //useRef
    let numberRef = useRef<number>(1)
    //useContext
    const {setGroupFormTask, groupFormTask, setDateValue, setAction, formProject, setFormProject, groups, indexes}= useContext(connectContext)
    const {setDispatch, state} = useContext(popupContext)
    //useEffect
    //useEffect
    useEffect(() => {
        tasks.setValue((value: Tasks[]) => {
            const newTab = [...value];
            newTab[indexes] = {...newTab[indexes], ...groups};
            return newTab
        })
        console.log(tasks.value)
    }, [groups])
    //hook
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
    const projectDefaultValue = {
        name: '',
        objectifs: {'0': ''},
        start_date: new Date(),
        deadline: new Date(),
        repeat: '',
        image: '',
        description: ''
    }
    const tasks = useForm<Tasks[]>([defaultValue])
    const project = useForm<ProjectType>(projectDefaultValue)
    //Dom
    return (
        <div className="w-[calc(100%-200px)] bg-secondary min-h-screen pb-12">
            <HeaderProject />
            {state.states &&
            <div className="fixed w-[234px] h-[250px] z-50 text-sidebarText bg-primary rounded border-borderCard"
                 style={{
                     left: position.x + 'px',
                     top: position.top + 'px',
                 }}
             >
                 <Status  />
            </div>
            }
            {state.priority &&
            <div className="fixed w-[244px] h-[250px] z-50 text-sidebarText bg-primary rounded"
                 style={{
                     left: position.x + 'px',
                     top: position.top + 'px',
                 }}
                 >
                 <Priority />
            </div>
            }
            <div className="w-full h-[180px] bg-gradient-to-t from-pink-400 to-btnColor">
                
            </div>
            <div>
            <input 
                type="text" 
                name='name'
                value={project.value.name}
                className="popupinput text-3xl bg-inherit text-gray-300 mt-12 ml-12" 
                placeholder='Give a name to your project'
                onChange={(e) => {
                    project.handleChange(e)
                    let newValue = {name: project.valueRef.current}
                    setFormProject({...formProject, ...newValue})
                }}
            />
            <div className="ml-14 pr-12 mt-8 cursor-pointer" onClick={() => {setShowDescriptio(true)}}>
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
                    let newValue = {description: project.valueRef.current}
                    setFormProject({...formProject, ...newValue})
                }}
                className="w-full bg-primary text-sidebarText border-b scrollbar-hide border-sidebarText outline-none p-3 text-sm max-lg:mb-5"
                ></textarea>}
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
                            setDateValue("startdate")
                            setAction('fill project value')
                        }} className="w-full bg-primary cursor-pointer text-sidebarText border-sidebarText outline-none p-3 text-sm">
                            <p>{format(formProject.start_date, 'dd/MM/yyy')}</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center space-x-2 text-holder mb-4">
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
                            <List key={index} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-12">
            <div className="w-full scrollbar-hide">
                <table className="border-primary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr>
                            {projectRow.map((item, index) => (
                            <td key={index} className="border-l border-r border-b border-primary pl-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <item.icon size={16} className="block"/><p>{item.name}</p>
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
                            setPosition={setPosition}
                            priority={item.priority}
                            states={item.state}
                            start_date={format(item.start_date, 'dd/MM/yyy')}
                            deadline={format(item.deadline, 'dd/MM/yyy')}
                            start_time={item.start_time}
                            end_time={item.end_time}
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