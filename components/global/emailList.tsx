"use client"

import { connectContext } from "@/hooks/useConnect"
import { useForm } from "@/hooks/useForm"
import { useContext, useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io"

export function EmailList ({
    numberEmailRef,
    emailsRef,
    setNumberEmail
}:{
    numberEmailRef: React.RefObject<number>,
    emailsRef: React.RefObject<string[]>,
    setNumberEmail: React.Dispatch<React.SetStateAction<number>>
}) {
    // constante
    const defaultCalue = {
        email: undefined
    }
    //useRef
    const closeRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    //useContext
    const {formTask, setFormTask} = useContext(connectContext)
    //hook
    const {handleEmail, error, setError, value} = useForm(defaultCalue)
    //useEffect
    useEffect(() => {
        function handleClose () {
            menuRef.current?.remove();
        }
        closeRef.current?.addEventListener('click', handleClose)
        return () => {
            closeRef.current?.removeEventListener('click', handleClose)
        }
    })
    //DOM
    return (
        <div ref={menuRef} className="flex items-center">
            <input 
                type="email" 
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                name="email" 
                className="px-4 py-2 bg-secondary text-sidebarText w-full outline-none placeholder:text-gray-500 text-sm" 
                placeholder="Enter Email Adress"
                value={value.email} 
                onKeyUp={(e) => {
                    try {
                        handleEmail(e)
                    } catch (err) {
                        setError(err)
                    }
                    if (e.key === "Enter") {
                        numberEmailRef.current++
                        setNumberEmail(numberEmailRef.current)
                        let newValue = {assign: [...emailsRef.current, value?.email]}
                        setFormTask({...formTask, ...newValue})
                    }
                }}
            />
            <div ref={closeRef}>
                <IoMdClose size={14} className="cursor-pointer" onClick={() => {}}/>
            </div>
        </div>
    )
}
