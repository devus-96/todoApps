"use client"

import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import clsx from "clsx"
import { format } from "date-fns"
import { MoreVertical } from "lucide-react"
import { useContext, useEffect, useState } from "react"

export const CardTasks = ({
    item,
    occ,
    setPosition
}:{
    item: Tasks, 
    occ: number,
    setPosition: React.Dispatch<React.SetStateAction<{
        x: number;
        top: number;
    }>>;
}) => {
    const [more, setMore] = useState(false)
    //hooks
    const positonState = usePosition()
    const priorityPosition = usePosition()
    const actionPosition = usePosition()
    //useContext
    const {setDispatch} = useContext(popupContext)
    const {setIndexes}= useContext(connectContext)
    //useEFfect
    useEffect(() => {
        setPosition(actionPosition.position)
    }, [actionPosition.position])
    useEffect(() => {
        setPosition(positonState.position)
    }, [positonState.position])
    useEffect(() => {
        setPosition(priorityPosition.position)
    }, [priorityPosition.position])
    return (
        <div className="w-full flex flex-col bg-primary rounded text-sidebarText my-1">
            <div className="flex flex-col w-full p-4 bg-gray-800 rounded">
            <div className="flex justify-between item-center w-full capitalize">
                <div className="w-[75%]">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
                </div>
                <MoreVertical onClick={(e) => {
                        setDispatch({taskAction: true})
                        actionPosition.handlerBoundingClientLeft(e, 150, 244)
                }} size={16} />
            </div>
            {item.description &&
            <div className="w-full h-[50px] overflow-hidden">
                <p className="text-xs text-ellipsis text-gray-500">{item.description}</p>
            </div>
            }
            <div className="flex items-center space-x-2">
                <div onClick={(e) => {
                    setDispatch({states: false})
                    setDispatch({priority: true})
                    setIndexes(occ)
                    priorityPosition.handlerBoundingClientRight(e, 200)
                }} className={clsx("w-fit flex-center px-4 text-sm my-2 text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.priority.toLowerCase() === 'low',
                    "bg-[#a78bfa]" : item.priority.toLowerCase() === 'medium',
                    "bg-[#f87171]" : item.priority.toLowerCase() === 'high',
                })}>
                    <p>{item.priority}</p>
                </div>
                <div onClick={(e) => {
                    priorityPosition.handlerBoundingClientRight(e, 280)
                    setDispatch({states: true})
                    setDispatch({priority: false})
                    setIndexes(occ)
                }} className={clsx("flex-center px-2 text-sm text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.state.toLowerCase() === 'canceled',
                    "bg-[#34d399]" : item.state.toLowerCase() === 'done',
                    "bg-[#fbbf24]" : item.state.toLowerCase() === 'in progress',
                    "bg-[#60a5fa]" : item.state.toLowerCase() === 'planning',
                    'bg-[#d782ff]' : item.state.toLowerCase() === 'paused'
                })}>
                    <p>{item.state}</p>
                </div>
            </div>
            <div>
                <div className="flex items-center text-xs"><p>{format(item.deadline, 'dd/MM/yyy')}</p>-<p>{format(item.deadline, 'dd/MM/yyy')}</p></div>
            </div>
            {item.start_time &&
                <div className="flex items-center text-xs">
                    <p>{item.start_time}</p>-<p>{item.end_time}</p>
                </div>
            }
            <div className="flex items-center justify-between w-full mt-2">
                <div className="flex flex-col gap-2">
                <p className="text-xs" onClick={() => {more ? setMore(false) : setMore(true)}}>{Object.entries(JSON.parse(item.assign)).length} {Object.entries(JSON.parse(item.assign)).length > 1 ? 'Participants': 'Participant'}</p>
                {more &&
                    <>
                    {Object.entries(item.assign).map((value, i) => {
                        return (
                        <div key={i}>
                            <div className="text-xs flex items-center bg-gray-800 capitalize">
                                <div className=" bg-sidebarText rounded-full w-[20px] h-[20px] flex-center mr-2">
                                    <p className="text-gray-800">{value[1].slice(0, 1)}</p>
                                </div>
                                <p>{value[1]}</p>
                            </div>
                        </div>
                        )
                    })}
                    </>
                }
                </div>
            </div>
        </div>
        {!item.name &&
            <div className="">
                <p>no task yet</p>
            </div>
        }
        </div>
    )
}