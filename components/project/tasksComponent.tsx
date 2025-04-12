"use client"
import { useContext, useEffect, useState } from "react"
import { Menu } from "../global/Menu"
import { IoMdClose } from "react-icons/io"
import clsx from "clsx"
import { connectContext } from "@/hooks/useConnect"
import { usePosition } from "@/hooks/usePosition"
import { popupContext } from "@/hooks/usePopup"
import { useForm } from "@/hooks/useForm"
import { Tasks } from "@/types/global"
import { format } from "date-fns"
import { MoreVertical } from "lucide-react"

export const TaskTableComponent = ({
    item, 
    occ,
    value,
    setPosition,
    setProjects,
    completion = false,
}:{
        item: Tasks, 
        occ: number,
        value: Tasks[],
        setPosition: React.Dispatch<React.SetStateAction<{
            x: number;
            top: number;
        }>>;
        setProjects: React.Dispatch<React.SetStateAction<Tasks[]>>,
        completion?: boolean
    }) => {
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
    return (
        <>
        <tr key={index} className="py-2">
            <td className="border-r border-t border-primary flex-wrap w-[250px]">
                <div className="relative">
                    <div className="w-full flex items-center px-4 group">
                        <div className=" text-sidebarText rounded flex-center cursor-pointer">
                            <MoreVertical size={16} onClick={(e) => {
                                setIndexes(occ)
                                setDispatch({taskAction: true})
                                actionPosition.handlerBoundingClientRight(e, 150)
                            }} />
                        </div>
                        <div className="">
                            <p onClick={() => {
                            setUpdateName(true)
                            setIndex(occ)
                            }} className="ml-4 text-sm">{item.name}</p>
                        </div>
                    </div>
                    {(updateName && index === occ) &&
                    <Menu active={updateName} setActive={setUpdateName}>
                    <div className="absolute top-0 bg-secondary border border-borderCard">
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
                                setProjects((prevValue: Tasks[]) => {
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
            {item.assign &&
            <td className="border-l border-r border-t border-primary py-2">
                <div>
                {Object.entries(item.assign).map((menber, i) => {
                    return (
                        <div key={i}>
                            <div className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                <p>{menber[1]}</p>
                                <IoMdClose onClick={() => {
                                    setIndex(occ)
                                    delete value[index].assign[menber[0]]
                                }} size={12} className="cursor-pointer"/>
                            </div>
                        </div>
                    )
                })}
                    <div className="full py-1 px-1">
                    <input 
                            type="button" 
                            className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2 text-xs" 
                            placeholder="Enter Email Adress" 
                            onClick={(e) => {
                                menberPosition.handlerBoundingClientRight(e, 250)
                                setDispatch({
                                    states: false,
                                    priority: false,
                                    menberList: true
                                })
                                setIndexes(occ)
                            }}
                            value='Add Participants'
                        />
                    </div>
                </div>
            </td>
            }
            <td className="border-l border-r border-t border-primary cursor-pointer">
                <div onClick={(e) => {
                    priorityPosition.handlerBoundingClientRight(e, 280)
                    setDispatch({
                        states: true,
                        priority: false,
                        menberList: false
                    })
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
                }} className={clsx("flex-center px-2 text-sm text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.priority.toLowerCase() === 'low',
                    "bg-[#a78bfa]" : item.priority.toLowerCase() === 'medium',
                    "bg-[#f87171]" : item.priority.toLowerCase() === 'high',
                })}>
                    <p>{item.priority}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {
                    setDateValue('start_date')
                    setIndexes(occ)
                    setDispatch({calendar: true})
                }}>
                    <p>{format(item.start_date, 'dd/MM/yyy')}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {
                    setDispatch({calendar: true})
                    setDateValue('deadline')
                    setIndexes(occ)
                }}>
                    <p>{format(item.deadline, 'dd/MM/yyy')}</p>
                </div>
            </td>
            {item.start_time &&
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.start_time}</p>
                </div>
            </td>
            }
            {item.deadline &&
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.end_time}</p>
                </div>
            </td>
            }
            {completion &&
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.end_time}</p>
                </div>
            </td>
            }
        </tr>
        </>
    )
}