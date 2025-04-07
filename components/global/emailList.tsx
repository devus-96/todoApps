"use client"

import { useForm } from "@/hooks/useForm"
import { emailSchema } from "@/types/schema"
import { useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io"

export function EmailList ({
    index,
    handle,
    numberEmailRef,
    setNumberEmail
}:{
    index: number,
    handle: (occurence: number, value: string, index: number) => void,
    numberEmailRef: React.RefObject<number>,
    setNumberEmail: React.Dispatch<React.SetStateAction<number>>
}) {
    // constante
    const defaultCalue = {
        email: ''
    }
    //useRef
    const closeRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const childRef = useRef<HTMLDivElement>(null)
    //hook
    const {handleChange, error, value, valueRef} = useForm(defaultCalue, emailSchema)
    //useEffect
    useEffect(() => {
        function handleClose () {
            if (childRef.current) {
                if (childRef.current?.children.length > 1) {
                    menuRef.current?.remove();
                }
            }
        }
        closeRef.current?.addEventListener('click', handleClose)
        return () => {
            closeRef.current?.removeEventListener('click', handleClose)
        }
    })
    //DOM
    return (
        <div ref={menuRef} className="flex flex-col items-center justify-start">
            <div ref={childRef} className="flex items-center">
                <input 
                    type="email" 
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    name="email" 
                    className="py-2 bg-secondary text-sidebarText w-full outline-none placeholder:text-holder text-sm placeholder:text-sm" 
                    placeholder="Enter Email Adress"
                    value={value.email} 
                    onChange={(e) => {handleChange(e)}}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            if (!error) {
                                handle(numberEmailRef.current, valueRef.current, index)
                                // create nex input
                                numberEmailRef.current++
                                setNumberEmail(numberEmailRef.current)
                            }
                        }
                    }}
                />
                <div ref={closeRef}>
                    <IoMdClose size={14} className="cursor-pointer" onClick={() => {}}/>
                </div>
            </div>
            {error !== undefined && <p className="text-xs text-red-400">Email adress invalid</p>}
        </div>
    )
}
