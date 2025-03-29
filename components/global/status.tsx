"use client"

import { popupContext } from "@/hooks/usePopup"
import { useContext, useEffect, useRef } from "react"

export const Status = ({left, top}:{left: number, top: number}) => {
    //useRef
    const menuRef = useRef<HTMLDivElement>(null)
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    //useEffect
    useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            const target = e.target as Document
            if (!menuRef?.current?.contains(target)) {
                setDispatch({status: false})
            }
        }
        document.addEventListener("mousedown", handlerClick)
            return () => {
                document.removeEventListener("mousedown", handlerClick)
            }
        })
    //DOM
    return (
        <>
            {state.status &&
                <div ref={menuRef} className={`w-[250px] h-[300px] flex flex-col text-sidebarText bg-primary fixed z-50 rounded`} 
                    style={{
                        left: left + 'px',
                        top: top + 'px'
                    }}
                >
                    <p className="text-xs mb-4 ml-4 mt-4">select one option below</p>
                    <div className="space-y-4">
                        <div className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
                            <div className="px-2 py-1 bg-zinc-300 text-gray-800 rounded-full">
                                <p>Cancel</p>
                            </div>
                        </div>
                        <div className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
                            <div className="px-2 py-1 bg-emerald-300 text-gray-800 rounded-full">
                                <p>Done</p>
                            </div>
                        </div>
                        <div className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
                            <div className="px-2 py-1 bg-amber-300 text-gray-800 rounded-full">
                                <p>In Progress</p>
                            </div>
                        </div>
                        <div className="bg-inherit hover:bg-gray-800 px-4 cursor-pointer py-1">
                            <div className="px-2 py-1 bg-sky-300 text-gray-800 rounded-full">
                                <p>Plan</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
        
    )
}