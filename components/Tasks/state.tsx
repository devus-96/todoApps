"use client"
import React from "react"
import { statusState } from "@/constants/task"
import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { useContext } from "react"
import { Menu } from "../global/Menu"

export const Status = ({position}:{position:{x: number, top: number}}) => {
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {setGroups} = useContext(connectContext)
    //DOM
    return (
        <>
        {state.states &&
        <Menu active={state.states} dispatch='states'>
        <div className="fixed w-[234px] h-[280px] z-50 text-sidebarText bg-primary rounded border-borderCard"
            style={{
                left: position.x + 'px',
                top: position.top + 'px',
            }}>
            <div className={`flex flex-col`}>
                <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
                <div className="space-y-4">
                    {statusState.map((item, index) => (
                        <div key={index} onClick={() => {
                            setGroups({state: item.name.toLowerCase()})
                            setDispatch({states: false})
                            document.body.style.overflow = 'auto'
                        }} className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
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