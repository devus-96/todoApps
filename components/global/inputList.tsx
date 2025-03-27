"use client"

import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { UserRoundPlus } from 'lucide-react';
import { popupContext } from "@/hooks/usePopup";

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
    const menuRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState<boolean>(false)
    const [empty, setEmpty] = useState('Empty')
    const [tab, setTab] = useState(items)
    const [newValue, setNewValue] = useState('')
    const store = useRef(items)
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
        function handleChange (e: React.ChangeEvent) {
            let target = e.target as HTMLInputElement;
            setNewValue(target.value)
            const newTab = store.current.filter((item) => {
                return target.value === item.slice(0, target.value.length)
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
            <div className="selectTaskValue" onClick={() => {setActive(true)}}>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{empty}</p>
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
                        console.log("asdasdsas", target.value)
                        setEmpty(target.value)
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
                                    setEmpty(item)
                                    setActive(false);
                                }} key={index} className="text-xs p-1 mb-1 cursor-pointer hover:bg-sidebarText hover:text-gray-800 rounded"><p>{item}</p></div>
                            ))}
                        </div>
                    </div>
                </div>
                : name === 'Project' ? <Project newValue={newValue}/> :
                (name === 'priority')  ? <><p className="text-xs px-4">sorry you can only use the propose</p></> : 
                name === 'status' ? <><p className="text-xs px-4">sorry you can only use the propose</p></> :
                 name === 'Assign' ? <Assign /> : <></>
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
                 onClick={() => setDispatch({invitation: true})}
            >
                    <UserRoundPlus />
                    <p>Invite Menber</p>
            </div>
        </div>
    )
}
