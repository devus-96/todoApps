"use client"

import React, { Dispatch, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { emailSchema } from "@/types/schema";
import { useForm } from "@/hooks/useForm";
import clsx from "clsx";

interface InputLinkProps {
    name: string;
    Icons: IconType;
    placeholder: string
    items: string[]
    setValue: Dispatch<any>,
    values: any
}

export const InputList:React.FC<InputLinkProps> = ({
    name,
    Icons,
    placeholder,
    items,
    setValue,
    values
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
                    <p>{(values[name]) ? values[name] : 'Empty' }</p>
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
                        let newvalue = {[name]: target.value}
                        setValue({...values, ...newvalue})
                        setActive(false);
                    }
                }}
                />
                {tab[0] !== undefined ?
                <div className="px-4">
                    <div className="p-2">
                        <div>
                            <p className="text-xs mb-4 text-sidebarText">create one or choose one</p>
                            {tab.map((item, index) => (
                                <div onClick={() => {
                                    let newvalue = {[name]: item}
                                    setValue({...values, ...newvalue})
                                    setActive(false);
                                }} key={index} className="text-xs p-1 mb-1 cursor-pointer text-sidebarText hover:text-gray-800 hover:bg-sidebarText"><p>{item}</p></div>
                            ))}
                        </div>
                    </div>
                </div>
                : name === 'project' ? <Project newValue={newValue}/> :
                (name === 'priority')  ? <><p className="text-xs px-4">sorry you can only use the propose</p></> : 
                name === 'state' ? <><p className="text-xs px-4">sorry you can only use the propose</p></> : <></>
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