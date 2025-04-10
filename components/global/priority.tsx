"use client"

import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { useContext, useEffect, useRef } from "react"
import { Menu } from "./Menu"
import { Tasks } from "@/types/global"

const priorityState = [
    {name: 'low', color: '#a1a1aa'},
    {name: 'medium', color: '#a78bfa'},
    {name: 'high', color: '#f87171'},
]

export const Priority = () => {
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {setGroups} = useContext(connectContext)
    //DOM
    return (
        <Menu active={state.priority} dispatch='priority'>
            <div className={`flex flex-col text-sidebarText bg-primary rounded`}>
                <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
                <div className="space-y-4">
                    {priorityState.map((item, index) => (
                        <div key={index} onClick={() => {
                            setGroups({priority: item.name})
                            setDispatch({priority: false})
                        }} className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer">
                            <div className="px-2 py-1 text-gray-800 rounded-full" style={{
                                background: `${item.color}`
                            }}>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Menu>
        
    )
}