"use client"
import React from "react";
import { ProjectType } from "@/types/global";
import { useContext, useEffect, useState } from "react"
import { Menu } from "../global/Menu"
import clsx from "clsx"
import { connectContext } from "@/hooks/useConnect"
import { usePosition } from "@/hooks/usePosition"
import { popupContext } from "@/hooks/usePopup"
import { useForm } from "@/hooks/useForm"
import { BookOpen, MoreVertical } from "lucide-react"
import { patchTeamsProject } from "@/api/project";
import { changeDateFormat } from "@/lib/action";

export const ProjectRow = (
    {
        item, 
        occ,
        value,
        setPosition,
        setProjects,
        teamId,
    }:{
            item: ProjectType, 
            occ: number,
            value: ProjectType[],
            setPosition: React.Dispatch<React.SetStateAction<{
                x: number;
                top: number;
            }>>;
            setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>,
            teamId: string | undefined,
        }
) => {
    //useState
        const [index, setIndex] = useState(0)
        const [updateName, setUpdateName] = useState(false)
        //hooks
        const positonState = usePosition()
        const priorityPosition = usePosition()
        const actionPosition = usePosition()
        const menberPosition = usePosition()
        const {setDispatch} = useContext(popupContext)
        const nameTasks = useForm({name: ''})
        const {setIndexes, setDateValue}= useContext(connectContext)
        //useEffect
        useEffect(() => {
            setPosition(positonState.position)
        }, [positonState.position])
        useEffect(() => {
            setPosition(priorityPosition.position)
        }, [priorityPosition.position])
        useEffect(() => {
            setPosition(actionPosition.position)
        }, [actionPosition.position])
        useEffect(() => {
            setPosition(menberPosition.position)
        }, [menberPosition.position])
    function time () {
        const date =  item.start_date.split('-')
        const str_startdate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]))
        const deadline =  item.start_date.split('-')
        const str_deadline = new Date(parseInt(deadline[0]), parseInt(deadline[1]), parseInt(deadline[2]))
        const now = new Date()
        const percent = (now.getTime() - str_startdate.getTime()) / (str_deadline.getTime() - str_startdate.getTime())
        return percent * 100
    }
    return (
        <>
        <tr key={index} className="py-2">
            <td className="border-r border-t border-primary flex-wrap w-[250px]">
                <div className="relative">
                    <div className="w-full flex justify-between items-center px-4 group">
                        <div className=" text-sidebarText rounded flex-center cursor-pointer">
                            <MoreVertical size={16} onClick={(e) => {
                                setIndexes(occ)
                                setDispatch({taskAction: true})
                                actionPosition.handlerBoundingClientRight(e, 150)
                            }} />
                        </div>
                        <div className="flex items-center justify-between w-[200px]">
                            <p onClick={() => {
                            setUpdateName(true)
                            setIndex(occ)
                            }} className="ml-4 text-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
                            <div onClick={() => {
                                if (teamId) {
                                    window.location.assign(`/teams/${teamId}/project/${item.id}`)
                                } else {
                                    window.location.assign(`/users/project/${item.id}`)
                                }
                            }} className="opacity-0 cursor-pointer group-hover:opacity-100 h-5 w-5 flex-center rounded hover:bg-sidebarText hover:text-gray-800">
                            <BookOpen size={16} />
                        </div>
                        </div>
                    </div>
                    {(updateName && index === occ) &&
                    <Menu active={updateName} setActive={setUpdateName}>
                    <div className="absolute top-0 z-30 bg-secondary border border-borderCard">
                        <input 
                        type="text" 
                        name='name'
                        placeholder="write the new name" 
                        onChange={(e) => nameTasks.handleChange(e)}
                        onClick={() => {
                            setIndexes(occ)
                            setIndex(occ)
                        }}
                        value={nameTasks.value.name}
                        className="popupinput bg-secondary text-sm text-gray-300" />
                        <div className="flex items-center text-xs py-1 px-4 space-x-2 cursor-pointer bg-secondary rounded text-sidebarText duration-300 hover:bg-sidebarText hover:text-gray-800"
                            onClick={() => {
                                setProjects((prevValue: ProjectType[]) => {
                                    const nouveauTableau = [...prevValue];
                                    nouveauTableau[index].name = nameTasks.value.name
                                    return nouveauTableau
                                })
                                setUpdateName(false)
                            }}>
                            <p> Update name</p>
                        </div>
                    </div>
                    </Menu>
                    }
                </div>
            </td>
            <td className="border-l border-r border-t border-primary cursor-pointer text-xs">
                <div onClick={(e) => {
                    priorityPosition.handlerBoundingClientRight(e, 280)
                    setDispatch({
                        states: true,
                        priority: false,
                        menberList: false
                    })
                    setIndexes(occ)
                    if (item.id) {
                        //patchTeamsProject({state: item.state}, item.id, teamId)
                    }
                }} className={clsx("flex-center px-2 text-xs text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.state.toLowerCase() === 'not started',
                    "bg-[#34d399]" : item.state.toLowerCase() === 'done',
                    "bg-[#fbbf24]" : item.state.toLowerCase() === 'in progress',
                    "bg-[#fa6074]" : item.state.toLowerCase() === 'canceled',
                    'bg-[#d782ff]' : item.state.toLowerCase() === 'paused'
                })}>
                    <p>{item.state}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary cursor-pointer">
                <div onClick={(e) => {
                    setDispatch({
                        states: false,
                        priority: true,
                        menberList: false
                    })
                    setIndexes(occ)
                    priorityPosition.handlerBoundingClientRight(e, 250)
                }} className={clsx("flex-center px-2 text-xs text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.priority.toLowerCase() === 'low',
                    "bg-[#a78bfa]" : item.priority.toLowerCase() === 'medium',
                    "bg-[#f87171]" : item.priority.toLowerCase() === 'high',
                })}>
                    <p>{item.priority}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-xs">
                <div onClick={(e) => {
                    setDateValue('start_date')
                    setIndexes(occ)
                    setDispatch({calendar: true})
                }}>
                    <p>{changeDateFormat(item.start_date)}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-xs">
                <div onClick={(e) => {
                    setDispatch({calendar: true})
                    setDateValue('deadline')
                    setIndexes(occ)
                }}>
                    <p>{changeDateFormat(item.deadline)}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-xs">
                <div className="flex items-center" onClick={(e) => {setDispatch({clock: true})}}>
                    <div className="w-[80%] rounded-full h-1 bg-red-500">
                        <div className="bg-blue-500 rounded-full h-1" style={{
                           // width: time().toFixed(2) + '%'
                        }}>

                        </div>
                    </div>
                    <p className="text-xs">{}%</p>
                </div>
            </td>
        </tr>
        </>
    )
}