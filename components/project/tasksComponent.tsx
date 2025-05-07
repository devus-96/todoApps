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
import { BookOpen, MoreVertical } from "lucide-react"
import { patchTeamsProjectTasks } from "@/api/tasks"
import { changeDateFormat } from "@/lib/action"
import { usePathname } from "next/navigation"

export const TaskTableComponent = ({
    item, 
    occ,
    value,
    setPosition,
    setTasks,
    teamId,
}:{
        item: Tasks, 
        occ: number,
        value: Tasks[],
        setPosition: React.Dispatch<React.SetStateAction<{
            x: number;
            top: number;
        }>>;
        setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>,
        teamId?: string,
    }) => {
    const pathname = usePathname()
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
    const {setIndexes, setDateValue, setTypeTime}= useContext(connectContext)
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
    useEffect(() => console.log(value), [value])
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
                                window.location.assign('/teams/project/params=0')
                                }} className=" opacity-0 cursor-pointer group-hover:opacity-100 h-5 w-5 flex-center rounded durarion-300 hover:bg-sidebarText/30 hover:text-gray-800">
                                <BookOpen color="rgb(166 166 168 / 0.9)" size={16} />
                            </div>
                        </div>
                    </div>
                    {(updateName && index === occ) &&
                    <Menu active={updateName} setActive={setUpdateName}>
                    <form className="w-full absolute top-0 z-30 bg-secondary border border-borderCard p-4">
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
                        <button className="flex items-center text-xs py-1 px-4 ml-4 space-x-2 cursor-pointer bg-secondary rounded text-sidebarText duration-300 hover:bg-sidebarText hover:text-gray-800"
                            onClick={() => {
                                setTasks((prevValue: Tasks[]) => {
                                    const nouveauTableau = [...prevValue];
                                    nouveauTableau[index].name = nameTasks.value.name
                                    return nouveauTableau
                                })
                                if (teamId && item.id) {
                                    patchTeamsProjectTasks({name: nameTasks.value.name}, item.id, teamId)
                                } else {
                                    patchTeamsProjectTasks({name: nameTasks.value.name}, item.id)
                                }
                                setUpdateName(false)
                            }}>
                            <p> Update name</p>
                        </button>
                    </form>
                    </Menu>
                    }
                </div>
            </td>
            {pathname.split('/')[1] === 'teams' &&
            <td className="border-l border-r border-t border-primary">
                <div>
                    {item.assign !== '' &&
                    <div>
                        {Object.entries(JSON.parse(item.assign)).map((menber, i) => {
                        const val = menber[1] as string
                        const key = menber[0] 
                        return (
                            <div key={i}>
                                <div className="text-xs flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                    <p>{val}</p>
                                    <IoMdClose onClick={() => {
                                        setIndex(occ)
                                        let newAssign = JSON.parse(value[i].assign)
                                        delete newAssign[key]
                                        newAssign = JSON.stringify(newAssign)
                                        setTasks((prev: Tasks[]) => {
                                            let newValue = [...prev]
                                            newValue[occ]['assign'] = newAssign
                                            return newValue
                                        })
                                        value[occ].id && patchTeamsProjectTasks({assign: newAssign}, teamId, value[occ].id)
                                    }} size={12} className="cursor-pointer"/>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    }
                    <div className="full">
                    <button onClick={(e) => {
                        menberPosition.handlerBoundingClientRight(e, 250)
                        setDispatch({
                            states: false,
                            priority: false,
                            menberList: true
                        })
                        setIndexes(occ)
                    }} className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 text-center text-xs">
                        <p>Add Participants</p>
                    </button>
                    </div>
                </div>
            </td>
            }
            <td className="border-l border-r border-t border-primary cursor-pointer text-xs">
                <div onClick={(e) => {
                    priorityPosition.handlerBoundingClientRight(e, 280)
                    setDispatch({
                        states: true,
                        priority: false,
                        menberList: false
                    })
                    setIndexes(occ)
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
            {Object.keys(item).includes('start_time') &&
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-xs">
                <div onClick={(e) => {
                    setDispatch({clock: true})
                    setTypeTime('start')
                    setDispatch({
                        states: false,
                        priority: false,
                        menberList: false,
                    })
                    setIndexes(occ)
                }}>
                    {item.start_time ? <p>{item.start_time}</p> : 
                    <div>
                    <button className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 text-center text-xs">
                    {   item.end_time ? '00:00AM' : 'Add start_time'}
                    </button>
                    </div>}
                </div>
            </td>
            }
            {Object.keys(item).includes('end_time') &&
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-xs">
                <div onClick={(e) => {
                    setDispatch({clock: true})
                    setTypeTime('start')
                    setIndexes(occ)
                    setDispatch({
                        states: false,
                        priority: false,
                        menberList: false,
                        clock: true
                    })
                }}>
                    {item.end_time ? <p>{item.end_time}</p> : 
                    <div>
                    <button className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 text-center text-xs">
                        {item.start_time ? '00:00AM' : 'Add end_time'}
                    </button>
                    </div>}
                </div>
            </td>
            }
        </tr>
        </>
    )
}