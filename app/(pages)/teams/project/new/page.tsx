"use client"
import { useRef, useState } from "react"
import React from "react"
import { Plus, SquareCheck } from 'lucide-react';
import { projectRow } from "@/constants/task";
import { ProjectTable } from "@/components/global/projectTable";
import { Status } from "@/components/global/status";

function List () {
    const [values, setValues] = useState({name: ''});
    const handleChange = (e: React.FormEvent): void => {
        const target = e.target as HTMLInputElement;
        const valueChanged: Record<string, string> = {
          [target.name]: target.value,
        };
        setValues((values: any) => ({ ...values, ...valueChanged }));
    };
    return (
        <div className="flex items-center text-btnColor">
            <SquareCheck size={24}/>
            <input 
                onChange={(e) => handleChange(e)}
                value={values.name}
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
    let [numberTask, setNumberTask] = useState(1)
    let [position, setPosition] = useState({x: 0, top: 0})
    //useRef
    let numberRef = useRef<number>(1)
    let numberTaskRef = useRef<number>(1)
    return (
        <div className="w-[calc(100%-200px)] bg-secondary min-h-screen pb-12">
            <Status left={position.x} top={position.top} />
            <div className="w-full flex items-start justify-end px-4 h-[200px] bg-gradient-to-t from-secondary to-btnColor">

            </div>
            <div>
                <input 
                    type="text" 
                    name='name'
                    className="popupinput text-3xl bg-inherit text-gray-300 mt-8 ml-12" 
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
            <div className="ml-12 mt-8">
            <p className="text-base text-sidebarText mb-8">Create task</p>
            <div className="w-full overflow-x-auto scrollbar-hide">
                <table className=" border-primary text-sidebarText w-[1460px] overflow-y-visible text-start">
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
                        {Array.from({length: numberTask}).map((_, index) => (
                            <ProjectTable key={index} setPosition={setPosition}/>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                numberTaskRef.current++
                setNumberTask(numberTaskRef.current)
            }}>
                <Plus size={24} />
                <p>New Task</p>
            </div>
            </div>
        </div>
    )
}