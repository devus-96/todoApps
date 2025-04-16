"use client"

import { Tasks } from "@/types/global"
import Popup from "./popup"
import clsx from "clsx"
import { IoMdClose } from "react-icons/io"
import { useContext } from "react"
import { popupContext } from "@/hooks/usePopup"
import { ArrowRight } from "lucide-react"
import { format } from "date-fns"


export const TaskDetails = ({task}:{task:{data: Tasks | undefined}}) => {
    //useContext
    const {state} = useContext(popupContext)
    console.log(task)
    return (
        <>
        {state.taskdetails &&
        <Popup width="400px" height="auto" popup='taskdetails' className="rounded-lg">
            <div className="text-sidebarText p-4 space-y-4">
                <h1 className="text-gray-300 text-center">Task Details</h1>
                <p className="text-xs text-center">task form {format(task.data?.start_date, 'dd/MM/yyyy')} to {format(task.data?.deadline, 'dd/MM/yyyy')}</p>
                <div className="text-sm space-y-4">
                    <p className="text-start">Name: {task.data?.name}</p>
                    {task.data?.project && <p>Project: {task.data?.project}</p>}
                    <div className="flex items-center space-x-2">
                        <p>priority</p>
                        <div onClick={(e) => {
                        }} className={clsx("w-fit flex-center px-2 text-sm text-gray-800 rounded-full", {
                            "bg-[#a1a1aa]" : task.data?.priority.toLowerCase() === 'low',
                            "bg-[#a78bfa]" : task.data?.priority.toLowerCase() === 'medium',
                            "bg-[#f87171]" : task.data?.priority.toLowerCase() === 'high',
                        })}>
                            <p>{task.data?.priority}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p>status</p>
                        <div onClick={(e) => {
                        }} className={clsx("w-fit flex-center px-2 text-sm text-gray-800 rounded-full", {
                            "bg-[#a1a1aa]" : task.data?.state.toLowerCase() === 'canceled',
                            "bg-[#34d399]" : task.data?.state.toLowerCase() === 'done',
                            "bg-[#fbbf24]" : task.data?.state.toLowerCase() === 'in progress',
                            "bg-[#60a5fa]" : task.data?.state.toLowerCase() === 'planning',
                            'bg-[#d782ff]' : task.data?.state.toLowerCase() === 'paused'
                        })}>
                            <p>{task.data?.state}</p>
                        </div>
                    </div>
                    {task.data?.start_time &&
                    <div className="flex items-center">
                        <p>{task.data?.start_time}</p>
                        <ArrowRight size={10}/>
                        <p>{task.data?.end_time}</p>
                    </div>
                    }
                    <div>
                        <p>Assign to :</p>
                        {task.data &&
                         <>
                         {Object.entries(task.data.assign).map((menber, i) => {
                            return (
                                <div key={i}>
                                    <div className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                        <p>{menber[1]}</p>
                                        <IoMdClose onClick={() => {
                                        
                                        }} size={12} className="cursor-pointer"/>
                                    </div>
                                </div>
                            )
                        })}
                         </>
                        }
                        
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
        </Popup>
        }
        </>
        
        
        
    )
}