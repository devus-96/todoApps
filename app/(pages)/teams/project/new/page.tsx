"use client"
import { useRef, useState } from "react"
import React from "react"
import { AlarmClockOff, AlarmClockPlus, CalendarClock, CalendarX,CircleDashed,Flag, Plus, Users } from 'lucide-react';
import { SquareCheck } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner";

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
    const objectifRef = useRef<HTMLDivElement>(null)
    let [value, setValue] = useState(1)
    let numberRef = useRef<number>(1)
   
    return (
        <div className="absolute top-0 right-0 left-[220px] bg-[#222] min-h-screen">
            <div className="w-full flex items-start justify-end px-4 h-[200px] bg-gradient-to-t from-[#222] to-[#9eabe4]">

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
                    setValue(numberRef.current)
                }}>
                    <div className="group flex items-center cursor-pointer">
                        <Plus size={24} className="text-sidebarText opacity-0 group-hover:opacity-85" />
                        <p className="text-3xl text-btnColor ">Objectif</p>
                    </div>
                </div>
                <div>
                    <div ref={objectifRef} className="ml-24 mt-4">
                        {Array.from({ length: value }).map((_,index) => (
                            <List key={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="ml-12 mt-8">
            <p className="text-base text-sidebarText mb-8">Create task</p>
            <table className=" border-primary text-sidebarText min-w-full text-start">
                <thead>
                    <tr>
                    <td className="border-l border-r border-b border-primary w-[280px] pl-4"><div className="flex gap-2"><Users className="block"/>Assign</div></td>
                    <td className="border-l border-r border-b border-primary pl-4"><div className="flex gap-2"><Flag />Priority</div></td>
                    <td className="border-l border-r border-b border-primary pl-4"><div className="flex gap-2"><CircleDashed />Statut</div></td>
                    <td className="border-l border-r border-b border-primary pl-4"><div className="flex gap-2"><CalendarX />start date</div></td>
                    <td className="border-l border-r border-b border-primary pl-4"><div className="flex gap-2"><CalendarClock />deadline</div></td>
                    <td className="border-l border-r border-b border-primary pl-4"><div className="flex gap-2"><AlarmClockPlus />start time</div></td>
                    <td className="border-l border-r border-b border-primary pl-4"><div className="flex gap-2"><AlarmClockOff />end time</div></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    <td className="border-l border-r border-t border-primary pl-4">Empty</td>
                    </tr>
                </tbody>
                
            </table>
                <div className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2 ">
                    <Plus size={24} />
                    <p>New Task</p>
                </div>
            </div>
        </div>
    )
}