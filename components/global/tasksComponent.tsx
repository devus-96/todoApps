"use client"
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
import { format } from "date-fns"
import { MoreVertical } from "lucide-react"

export const TaskTableComponent = ({
    item, 
    occ,
    value,
    handler,
    setPosition,
    setProjects
}:{
        item: Tasks, 
        occ: number,
        value: Tasks[],
        handler: (e: React.FormEvent) => void,
        setPosition: React.Dispatch<React.SetStateAction<{
            x: number;
            top: number;
        }>>;
        setProjects: React.Dispatch<React.SetStateAction<Tasks[]>>
    }) => {
    //useRef
    const indentique = useRef(false)
    //useState
    const [index, setIndex] = useState(0)
    const [updateName, setUpdateName] = useState(false)
    //hooks
    const positonState = usePosition()
    const priorityPosition = usePosition()
    const actionPosition = usePosition()
    const {setDispatch} = useContext(popupContext)
    const nameTasks = useForm({name: ''})
    const emails = useForm({email: ''}, emailSchema)
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
    //function
    function handleKeyUp (occurence: number, value: string, index: number) {
           
    }
    return (
        <>
        <tr key={index} className="py-2">
            <td className="border-r border-t border-primary flex-wrap w-[250px]">
                <div className="relative">
                    <div className="w-full flex items-center px-4 group">
                        <div className=" text-sidebarText rounded flex-center cursor-pointer">
                            <MoreVertical size={16} onClick={(e) => {
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
                            type="email" 
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            name="email" 
                            value={emails.value.email}
                            className="px-4 bg-secondary text-sidebarText w-full rounded-full outline-none placeholder:text-gray-500 text-sm" 
                            placeholder="Enter Email Adress" 
                            onChange={(e) => {
                                emails.setError('')
                                setIndex(occ)
                                emails.handleChange(e)
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    if (!emails.error) {
                                       for (const [_, email] of Object.entries(value[index].assign)) {
                                            if (email === emails.value.email) {
                                                indentique.current = true
                                            }
                                        }
                                        const numbElement = Object.keys(value[index].assign).length 
                                        let objectifValue = {[`${numbElement + 1}`]: emails.value.email}
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
                    {emails.error !== '' && <p className="text-center text-xs text-red-400">{emails.error}</p>}
                    </div>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary cursor-pointer">
                <div onClick={(e) => {
                    priorityPosition.handlerBoundingClientRight(e, 250)
                    setDispatch({states: true})
                    setDispatch({priority: false})
                    setIndexes(occ)
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
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.start_time}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-primary text-center cursor-pointer text-sm">
                <div onClick={(e) => {setDispatch({clock: true})}}>
                    <p>{item.end_time}</p>
                </div>
            </td>
        </tr>
        </>
    )
}