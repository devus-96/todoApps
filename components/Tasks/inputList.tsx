"use client"

import { useContext, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { UserRoundPlus } from 'lucide-react';
import { popupContext } from "@/hooks/usePopup";
import { connectContext } from "@/hooks/useConnect";
import { IoMdClose } from "react-icons/io";
import { emailSchema } from "@/types/schema";
import { Tasks } from "@/types/global";
import { useForm } from "@/hooks/useForm";
import clsx from "clsx";

interface InputLinkProps {
    name: string;
    Icons: IconType;
    placeholder: string
    items: string[]
}

export const InputList:React.FC<InputLinkProps> = ({
    name,
    Icons,
    placeholder,
    items,
}) => {
    //useState
    const [active, setActive] = useState<boolean>(false)
    const [tab, setTab] = useState(items)
    const [newValue, setNewValue] = useState('')
    //useRef
    const indentique = useRef(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const assign = useRef<string[]>([])
    const store = useRef(items)
    //useContext
    const {formTask, setFormTask} = useContext(connectContext)
    //hooks
    const emailFrom = useForm({email: ''}, emailSchema)
    //useEffect
    useEffect (() => {
        const handlerClick = (e: MouseEvent) => {
            const target = e.target as Document
            if (!menuRef?.current?.contains(target)) {
                setActive(false)
            }
          }
          document.addEventListener("mousedown", handlerClick)
          return () => {
            document.removeEventListener("mousedown", handlerClick)
          }
    }, [active])
    /**
     * this function is a search's function
     * @param e React.ChangeEvent
     */
    function handleChange (e: React.ChangeEvent) {
        let target = e.target as HTMLInputElement;
        setNewValue(target.value)
        const newTab = store.current.filter((item) => {
            return target.value.toLowerCase() === item.slice(0, target.value.length).toLowerCase()
        })
        if (target.value === '') {
            setTab(store.current)
        } else {
            setTab(newTab)
        }
    }
    function handleKeyUp (userEmail: string) {
        setFormTask((prev: Tasks) => {
            let nouveauTableau = {...prev};
            nouveauTableau.assign = {...formTask.assign}
            return nouveauTableau
        })
        indentique.current = false
        if (!emailFrom.error) {
            for (const [_, email] of Object.entries(formTask.assign)) {
                    if (email === userEmail) {
                        indentique.current = true
                    }
                }
            const numbElement = Object.keys(formTask.assign).length 
            let objectifValue = {[`${numbElement + 1}`]: userEmail}
            if (!indentique.current) {
                setFormTask((prevElements: Tasks) => {
                    let nouveauTableau = {...prevElements};
                    nouveauTableau.assign = {...nouveauTableau.assign, ...objectifValue};
                    return nouveauTableau;
                })
                emailFrom.setValue({email: ''})
            } else {
                emailFrom.setError('this email is already call')
                emailFrom.setValue({email: ''})
            }
        }
    }
    return (
        <div className="flex-justify relative">
            <div className="flex items-center space-x-4">
                <Icons /><p>{name}</p>
            </div>
            <div className={clsx({
                "selectTaskValue" : name !== 'assign',
                "w-1/2 py-[4px]  text-start rounded text-sidebarText": name === 'assign'
            })} onClick={(e) => {
                e.stopPropagation()
                name !== 'assign' && setActive(true)
            }}>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                    {name !== 'assign' ? <p>{(formTask[name] !== '') ? formTask[name] : 'Empty' }</p>:
                    <div>
                        {!formTask.assign ? <p>Empty</p> :
                        <div>
                            {Object.entries(formTask.assign).map((item, index) => (
                            <div key={index} className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                <p className="text-xss">{item[1]}</p>
                                <IoMdClose size={12} className="cursor-pointer" onClick={() => {
                                   delete formTask.assign[item[0]]
                                }}/>
                            </div>
                        ))}
                        <div className="flex text-sm items-center py-1 px-4 space-x-2 cursor-pointer bg-sidebarText rounded text-gray-800"
                            onClick={() => {
                                setActive(true)
                            }}>
                            <UserRoundPlus size={16} />
                            <p>Add participants</p>
                        </div>
                        </div>
                    }
                    </div>
                    }
                </div>
            </div>
            {active &&
                <div ref={menuRef} className="bg-primary border border-[#494949] min-h-[100px] overflow-auto rounded absolute right-0 top-0 z-10 ">
                <input 
                type="text" 
                name='email'
                className="popupinput bg-primary text-gray-300" 
                placeholder={placeholder}
                value={emailFrom.value.email}
                onChange={(e) => {
                    handleChange(e)
                    emailFrom.setError('')
                    emailFrom.handleChange(e)
                }}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        let target = e.target as HTMLInputElement;
                        if ( name === 'assign') {
                            handleKeyUp(target.value)
                        } else {
                            let newvalue = {[name]: target.value}
                            setFormTask({...formTask, ...newvalue})
                        }
                        setActive(false);
                    }
                }}
                />
                {tab[0] !== undefined ?
                <div className="px-4">
                    <div className="p-2">
                        <div>
                            <p className="text-xs mb-4">create one or choose one</p>
                            {tab.map((item, index) => (
                                <div onClick={() => {
                                    if (name == 'assign') {
                                        handleKeyUp(item)
                                    } else {
                                        let newvalue = {[name]: item}
                                        setFormTask({...formTask, ...newvalue})
                                    }
                                    setActive(false);
                                }} key={index} className="text-xs p-1 mb-1 cursor-pointer hover:text-gray-800 hover:bg-sidebarText rounded"><p>{item}</p></div>
                            ))}
                        </div>
                    </div>
                </div>
                : name === 'project' ? <Project newValue={newValue}/> :
                (name === 'priority')  ? <><p className="text-xs px-4">sorry you can only use the propose</p></> : 
                name === 'state' ? <><p className="text-xs px-4">sorry you can only use the propose</p></> :
                 name === 'assign' ? <Assign /> : <></>
                }
            </div>
            }
        </div>
    )
}

const Project = ({newValue}:{newValue: string}) => {
    return (
        <div className="flex items-center space-x-2 text-sidebarText px-4">
            <p className="">create</p>
            <div className="text-xs p-1 cursor-pointer bg-sidebarText text-gray-800 rounded">
                <p>{newValue}</p>
            </div>
        </div>
    )
}

const Assign = () => {
    const {setDispatch} = useContext(popupContext)
    return (
        <div className="px-4 space-y-2 pb-2">
            <p className="text-xs">No matches in {sessionStorage.getItem('workspace')} </p>
            <div className="flex text-xs items-center py-1 px-4 space-x-2 cursor-pointer bg-sidebarText rounded text-gray-800"
                    onClick={() => setDispatch({invitation: true})}>
                    <UserRoundPlus size={16} />
                    <p>Invite Menber</p>
            </div>
        </div>
    )
}
