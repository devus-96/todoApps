"use client"

import {Trash2 } from "lucide-react"
import { GoArrowDownRight } from "react-icons/go"
import { MdDetails } from "react-icons/md"

const taskOptions = [
    {name: 'Go to deadline', icon: GoArrowDownRight},
    {name: 'Details', icon: MdDetails},
    {name: 'Delete task', icon: Trash2}
]

export const MoreCalendarTaskAction = () => {
    return (
        <div className="">
            {taskOptions.map((item, index) => (
                <div key={index} className="w-full px-4">
                    <div className="w-full flex items-center space-x-2 rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-xs">
                        <item.icon size={16} />
                        <p>{item.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}