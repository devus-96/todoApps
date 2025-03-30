"use client"

import { useContext, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { UserRoundPlus } from 'lucide-react';
import { popupContext } from "@/hooks/usePopup";
import { clock, connectContext } from "@/hooks/useConnect";
import { IoMdClose } from "react-icons/io";

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
    const menuRef = useRef<HTMLDivElement>(null)
    const assign = useRef<string[]>([])
    const store = useRef(items)
    //useContext
    const {formTask, setFormTask} = useContext(connectContext)
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
    })
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
    return (
        <div className="flex-justify relative">
            <div className="flex items-center space-x-4">
                <Icons /><p>{name}</p>
            </div>
            <div className="selectTaskValue" onClick={(e) => {
                e.stopPropagation()
                setActive(true)
            }}>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {name !== 'assign' ? <p>{formTask[name]}</p>:
                    <div>
                        {formTask.assign[0] === '' ? <p>Empty</p> :
                        <div>
                            {formTask.assign.map((item, index) => (
                            <div key={index} className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                <p className="text-xs">{item}</p>
                                <IoMdClose size={12} className="cursor-pointer" onClick={() => {
                                    assign.current = formTask.assign.filter((substract) => substract !== item)
                                    let newvalue = {"assign" : assign.current}
                                    console.log(newvalue)
                                    setFormTask({...formTask, ...newvalue})
                                }}/>
                            </div>
                        ))}
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
                name='name'
                className="popupinput bg-primary text-gray-300" 
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        let target = e.target as HTMLInputElement;
                        setActive(false);
                        let newvalue = {[name]: target.value}
                        setFormTask({...formTask, ...newvalue})
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
                                        assign.current = [...assign.current, item]
                                        let newvalue = {[name]: assign.current}
                                        setFormTask({...formTask, ...newvalue})
                                    } else {
                                        let newvalue = {[name]: item}
                                        setFormTask({...formTask, ...newvalue})
                                    }
                                    setActive(false);
                                }} key={index} className="text-xs p-1 mb-1 cursor-pointer hover:bg-sidebarText hover:text-gray-800 rounded"><p>{item}</p></div>
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
            <p className="text-xs">more</p>
            <div className="flex items-center py-1 px-4 space-x-2 cursor-pointer bg-sidebarText rounded text-gray-800"
                 onClick={() => setDispatch({invitation: true})}>
                    <UserRoundPlus />
                    <p>Invite Menber</p>
            </div>
        </div>
    )
}
