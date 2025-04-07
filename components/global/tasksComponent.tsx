import { useContext, useEffect, useRef, useState } from "react"
import { Menu } from "./Menu"
import { IoMdClose } from "react-icons/io"
import clsx from "clsx"
import { connectContext } from "@/hooks/useConnect"
import { usePosition } from "@/hooks/usePosition"
import { popupContext } from "@/hooks/usePopup"
import { useForm } from "@/hooks/useForm"
import { emailSchema } from "@/types/schema"
import { Tasks } from "@/types/global"

export const TaskTableComponent = ({
    item, 
    occ,
    setPosition,
    projects,
    setProjects
}:{
        item: Tasks, 
        occ: number,
        setPosition: React.Dispatch<React.SetStateAction<{
            x: number;
            top: number;
        }>>;
        projects: Tasks[]
        setProjects: React.Dispatch<React.SetStateAction<typeof projects>>
    }) => {
    //useRef
    const [updateName, setUpdateName] = useState(false)
    const indentique  = useRef(false)
    //useState
    const [index, setIndex] = useState(0)
    //hook
    const positonState = usePosition()
    const priorityPosition = usePosition()
    const {state, setDispatch} = useContext(popupContext)
    const nameTasks = useForm({name: ''})
    const emails = useForm({email: ''}, emailSchema)
    const {setGroupFormTask, groupFormTask}= useContext(connectContext)
    //useEffect
    useEffect(() => {
            setPosition(positonState.position)
        }, [positonState.position])
    useEffect(() => {
        setPosition(priorityPosition.position)
    }, [priorityPosition.position])
    useEffect(()=>{console.log(projects)}, [projects])
    //function
    function handleKeyUp (occurence: number, value: string, index: number) {
           
    }
    return (
        <>
        <tr key={index} className="py-2">
            <td className="border-r border-t border-primary flex-wrap">
                <div className="relative">
                    <p onClick={() => {
                    setUpdateName(true)
                    setIndex(occ)
                }} className="ml-4">{item.name}</p>
                    {(updateName && index === occ) &&
                    <Menu active={updateName} setActive={setUpdateName}>
                    <div className="absolute top-0 bg-secondary border border-borderCard">
                        <input 
                        type="text" 
                        placeholder="write the new name" 
                        onChange={(e) => nameTasks.handleChange(e)}
                        onClick={() => {setIndex(occ)}}
                        name={nameTasks.value.name}
                        className="popupinput bg-secondary text-sm text-gray-300" />
                        <div className="flex items-center text-xs py-1 px-4 space-x-2 cursor-pointer bg-secondary rounded text-sidebarText duration-300 hover:bg-sidebarText hover:text-gray-800"
                            onClick={() => {
                                setProjects((prevValue: Tasks[]) => {
                                    const nouveauTableau = [...prevValue];
                                    nouveauTableau[index].name = nameTasks.valueRef.current
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
            <td className="border-l border-r border-t border-primary py-2">
                <div>
                {Object.entries(item.assign).map((value, i) => {
                    return (
                        <div key={i}>
                            <div className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                <p>{value[1]}</p>
                                <IoMdClose onClick={() => {
                                    setIndex(occ)
                                    delete projects[index].assign[value[0]]
                                }} size={12} className="cursor-pointer"/>
                            </div>
                        </div>
                    )
                })}
                    <div className="full py-1 px-1">
                    <input 
                            type="email" 
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            name="email" 
                            value={emails.value.email}
                            className="px-4 bg-secondary text-sidebarText w-full rounded-full outline-none placeholder:text-gray-500 text-sm" 
                            placeholder="Enter Email Adress" 
                            onChange={(e) => {
                                setIndex(occ)
                                emails.handleChange(e)
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    if (!emails.error) {
                                        for (const [_, value] of Object.entries(projects[index].assign)) {
                                            if (value === emails.valueRef.current) {
                                                indentique.current = true
                                            }
                                        }
                                        const numbElement = Object.keys(projects[index].assign).length 
                                        let objectifValue = {[`${numbElement + 1}`]: emails.valueRef.current}
                                        if (!indentique.current) {
                                            setProjects((prevElements: Tasks[]) => {
                                                const nouveauTableau = [...prevElements];
                                                nouveauTableau[index].assign = {...nouveauTableau[index].assign, ...objectifValue};
                                                return nouveauTableau;
                                            })
                                            emails.setValue({email: ''})
                                        } else {
                                            emails.setError('this email is already call')
                                            emails.setValue({email: ''})
                                        }
                                    }
                                }
                            }}
                        />
                    {emails.error !== undefined && <p className="text-center text-xs text-red-400">{emails.error}</p>}
                    </div>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary cursor-pointer">
                <div onClick={(e) => {
                    priorityPosition.handlerBoundingClientRight(e, 250)
                    setDispatch({states: true})
                    setDispatch({priority: false})
                    setProjects((prevValue: Tasks[]) => {
                        const nouveauTableau = [...prevValue];
                        nouveauTableau[index].state = groupFormTask[0].state
                        return nouveauTableau
                    })
                }} className={clsx("flex-center px-2 text-sm text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.state.toLowerCase() === 'cancel',
                    "bg-[#34d399]" : item.state.toLowerCase() === 'done',
                    "bg-[#fbbf24]" : item.state.toLowerCase() === 'in progress',
                    "bg-[#60a5fa]" : item.state.toLowerCase() === 'plan'
                })}>
                    <p>{item.state}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary cursor-pointer">
                <div onClick={(e) => {
                    setDispatch({states: false})
                    setDispatch({priority: true})
                    priorityPosition.handlerBoundingClientRight(e, 250)
                    setProjects((prevValue: Tasks[]) => {
                        const nouveauTableau = [...prevValue];
                        nouveauTableau[index].priority = groupFormTask[0].priority
                        return nouveauTableau
                    })
                }} className={clsx("flex-center px-2 text-sm text-gray-800 rounded-full", {
                    "bg-[#a1a1aa]" : item.priority.toLowerCase() === 'low',
                    "bg-[#a78bfa]" : item.priority.toLowerCase() === 'medium',
                    "bg-[#f87171]" : item.priority.toLowerCase() === 'high',
                })}>
                    <p>{item.priority}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer">
                <div onClick={(e) => {setDispatch({calendar: true})}}>
                    <p>{item.start_date}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer">
                <div onClick={(e) => {setDispatch({calendar: true})}}>
                    <p>{item.deadline}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.start_time}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.end_time}</p>
                </div>
            </td>
        </tr>
        </>
    )
}