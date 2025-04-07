"use client"

import { optionsRepetition } from "@/constants/task"
import { Select } from "../ui/select"
import { Bell, MessageSquareText } from "lucide-react"
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const HeaderProject = () => {
    let [select, setSelect] = useState('')
    const pathname = usePathname()
    return <div className="flex items-center justify-between px-4 bg-secondary py-2">
    {(pathname === '/users/project/new' || pathname === '/teams/project/new') ?
        <div className="">
            <Select 
            name="Reapeat" 
            options={optionsRepetition} 
            handler={setSelect}
            inputClass="flex items-center cursor-pointer justify-between text-gray-300" 
            className="w-[300px] relative rounded bg-secondary hover:bg-primary p-1 text-sm border border-borderCard"
            seclectClass="absolute w-[250px] top-[45px] rounded p-5 mb-2 bg-primary shadow text-sidebarText"
            />
    </div>
    : <div></div>}
    <div className="flex item-center px-4">
        <div className="flex items-center text-gray-400 mr-4 space-x-4">
            <div className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                <MessageSquareText size={16} />
            </div>
            <div  className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                <Bell size={16} />
            </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-300 text-sidebarText flex-center">
            <Image src='/Rectangle.svg' alt="Me" width={32} height={32}></Image>
        </div>
        <div className="flex flex-col text-xs text-gray-300">
            <p>marcdevus@gmail.com</p>
            <p>Administrator</p>
        </div>
    </div>
</div>
}