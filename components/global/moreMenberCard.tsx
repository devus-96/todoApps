"use client"
import { Pen, MessageCircleOff, AlarmClockCheck, SendHorizontal, Delete, Check } from "lucide-react"
import { useEffect, useRef, useState } from "react"



export const MenberCard = () => {
    const [showRole, setShowRole] = useState(false)
    const assignRef = useRef<HTMLDivElement>(null)
    useEffect (() => {
        assignRef.current?.addEventListener('mouseover', () => {
            setShowRole(true)
        })
        assignRef.current?.addEventListener('mouseout', () => {
            setShowRole(false)
        })
        return () => {
            assignRef.current?.removeEventListener('mouseout', () => {
                setShowRole(true)
            })
            assignRef.current?.removeEventListener('mouseleave', () => {
                setShowRole(false)
            })
        }
    })
    return (
        <div className="absolute w-full h-full">
            <div className="absolute py-4 px-2 rounded bg-primary text-sidebarText text-sm border border-borderCard">
                <p className="mb-2">options</p>
                <div className="">
                    <div ref={assignRef} className="flex items-center space-x-4 hover:bg-secondary cursor-pointer rounded-lg p-2">
                        <Pen size={16} />
                        <p>Update Role</p>
                        {showRole && 
                        <div className="absolute right-40 top-12 p-2 rounded bg-primary text-sidebarText text-sm border border-borderCard">
                            <p className="mb-2 ml-4 text-xs">All role</p>
                            <div className="flex items-center justify-between px-4 space-x-8 hover:bg-secondary cursor-pointer rounded-lg py-1">
                                <p>Menbers</p>
                                <Check size={16} />
                            </div>
                            <div className="flex items-center justify-between px-4 space-x-8 hover:bg-secondary cursor-pointer rounded-lg py-1">
                                <p>Administrator</p>
                                <Check size={16} />
                            </div>
                        </div>
                        }
                    </div>
                    <div className="flex items-center space-x-4 hover:bg-secondary cursor-pointer rounded-lg p-2">
                        <AlarmClockCheck size={16} />
                        <p>Assign Task</p>
                    </div>
                    <div className="flex items-center space-x-4 hover:bg-secondary cursor-pointer rounded-lg p-2">
                        <SendHorizontal size={16} />
                        <p>Send Message</p>
                    </div>
                    <div className="flex items-center space-x-4 hover:bg-secondary cursor-pointer rounded-lg p-2">
                        <MessageCircleOff size={16} />
                        <p>Cancel Invitation</p>
                    </div>
                    <div className="flex items-center space-x-4 hover:bg-secondary cursor-pointer rounded-lg p-2 hover:text-red-500">
                        <Delete size={16} />
                        <p>Remove menbers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}