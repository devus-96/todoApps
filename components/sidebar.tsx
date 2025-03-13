"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Select } from "./select";
import { FaFileCirclePlus } from "react-icons/fa6";
import { taskContext } from "@/hooks/useTask";
import { useContext, useEffect, useState } from "react";
import PopUpTags from "./PopUpTags";
import { Calendar } from "./calendar";
import { route } from "@/constants/sidebar";
import { TaskDetails } from "./calendar/taskDetails";

const SideBar = () => {
    const pathname = usePathname()
    const [select, setSelect] = useState<string>("")
    const {state, setDispatch} = useContext(taskContext)
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        setDispatch({form: select})
        if (!state.isDeadline) {
            setDispatch({date: currentDate})
        } else {
            setDispatch({deadline: currentDate})
        }
    }, [select, currentDate, state.isDeadline])

    return <>
            <PopUpTags state={state.calendar}>
                <Calendar value={currentDate} onChange={setCurrentDate}/>
            </PopUpTags>
            <PopUpTags state={state.details}>
                <TaskDetails item={state.details}/>
            </PopUpTags>
            <section className={clsx("fixed top-0 bottom-0 z-50 w-[200px] flex flex-col bg-primary justify-between font-[family-name:var(--font-jetBrains-mono)]", {"hidden" : pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/auth/callback'})}>
                <Image src='/logo.svg' className="mt-4 mx-auto" alt="logo" width={100} height={100} />
                <div className="px-2 h-2/3">
                    {route.map((item) => (
                        <Link href={item.route} key={item.name}>
                        <div className={clsx("mt-4 py-2 px-8 rounded transition duration-300 cursor-pointer hover:bg-btnColor hover:text-gray-800",{
                            "bg-btnColor text-gray-800": pathname === item.route,
                            'text-sidebarText' :  pathname !== item.route
                        })}>
                            
                                <div className="flex items-center space-x-4">
                                    <item.icons size={12} />
                                    <p className="text-sm">{item.name}</p>
                                </div>
                           
                        </div>
                        </Link>
                    ))}
                    <div className="space-y-4  py-4 px-2">
                        <Select 
                            name="create" 
                            handler={setSelect} 
                            options={["Task", 'Project']}
                            Icons={FaFileCirclePlus}
                            inputClass="inputClass bg-primary"
                            className = "w-full relative border rounded text-sidebarText"
                            seclectClass = 'absolute w-full top-[60px] rounded p-5 mb-2 bg-white text-gray-800'
                            />
                    </div>
                </div>
                <div className="flex items-center text-sidebarText space-x-4 px-2 py-4">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-600"></div>
                </div>
    </section>
    
    </> 
}

 export default SideBar