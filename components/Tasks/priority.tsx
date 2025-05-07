"use client"
import React from "react"
import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { useContext } from "react"
import { Menu } from "../global/Menu"

const priorityState = [
    {name: 'low', color: '#a1a1aa'},
    {name: 'medium', color: '#a78bfa'},
    {name: 'high', color: '#f87171'},
]

export const Priority = ({position}:{position:{x: number, top: number}}) => {
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {setGroups} = useContext(connectContext)
    //DOM
    return (
        <>
            {state.priority && 
            <Menu active={state.priority} dispatch='priority'>
            <div className="fixed w-[244px] h-[200px] z-50 text-sidebarText bg-primary rounded"
                style={{
                    left: position.x + 'px',
                    top: position.top + 'px',
                }}
                >
                <div className={`flex flex-col text-sidebarText bg-primary rounded`}>
                    <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
                    <div className="space-y-4">
                        {priorityState.map((item, index) => (
                            <div key={index} onClick={() => {
                                setGroups({priority: item.name.toLowerCase()})
                                setDispatch({priority: false})
                                document.body.style.overflow = 'auto'
                            }} className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer">
                                <div className="px-4 w-fit text-sm text-gray-800 rounded-full" style={{
                                    background: `${item.color}`
                                }}>
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
              </div>
            </div>
            </Menu>
            }
        </>
        
    )
}