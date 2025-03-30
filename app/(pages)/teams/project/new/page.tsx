"use client"
import { useContext, useRef, useState } from "react"
import React from "react"
import { Plus, SquareCheck, Bell, MessageSquare } from 'lucide-react';
import { projectRow } from "@/constants/task";
import { ProjectTable } from "@/components/global/projectTable";
import { Status } from "@/components/global/state";
import { Priority } from "@/components/global/priority";
import { useForm } from "@/hooks/useForm";
import { connectContext } from "@/hooks/useConnect";
import { format } from "date-fns";
import Image from "next/image";

function List () {
    const {handleChange, value} = useForm({name: ''})
    return (
        <div className="flex items-center text-btnColor">
            <SquareCheck size={24}/>
            <input 
                onChange={(e) => handleChange(e)}
                value={value.name}
                type="text" 
                name='name'
                className="popupinput text-base bg-inherit text-gray-300" 
                placeholder="Write project's objectif"
            />
        </div>
    )
}

export default function Project () {
    // useState
    let [number, setNumber] = useState(1)
    let [position, setPosition] = useState({x: 0, top: 0})
    //useRef
    let numberRef = useRef<number>(1)
    const {setGroupFormTask, groupFormTask}= useContext(connectContext)
    return (
        <div className="w-[calc(100%-200px)] bg-secondary min-h-screen pb-12">
            <Status left={position.x} top={position.top} />
            <Priority left={position.x} top={position.top} />
            <div className="w-full relative flex items-start justify-end px-4 h-[200px] bg-gradient-to-t from-secondary to-btnColor">
                 <div className="flex item-center mt-4">
                    <div className="flex items-center text-secondary mr-4 space-x-4">
                        <MessageSquare size={24} />
                        <Bell size={24} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-sidebarText flex-center">
                        <Image src='/Rectangle.svg' alt="Me" width={32} height={32}></Image>
                    </div>
                    <div className="flex flex-col text-xs text-secondary">
                        <p>marcdevus@gmail.com</p>
                        <p>Administrator</p>
                    </div>
                 </div>
            </div>
            <div>
                <input 
                    type="text" 
                    name='name'
                    className="popupinput text-3xl bg-inherit text-gray-300 mt-12 ml-12" 
                    placeholder='Give a name to your project'
                />
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
            <div className="w-full overflow-x-auto scrollbar-hide">
                <table className=" border-primary text-sidebarText w-full overflow-y-visible text-start">
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
                            setPosition={setPosition} 
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