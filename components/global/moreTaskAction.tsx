"use client"

import { MessageCircleDashed, Trash2 } from "lucide-react"
import { GoDuplicate } from "react-icons/go"

const taskOptions = [
    {name: 'duplicate', icon: GoDuplicate},
    {name: 'add comment', icon: MessageCircleDashed},
    {name: 'delete task', icon: Trash2}
]

export const MoreTaskAction = () => {
    return (
        <div className="fixed top-0 right-0 py-4 px-2 rounded bg-secondary text-sidebarText text-sm border border-borderCard">
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