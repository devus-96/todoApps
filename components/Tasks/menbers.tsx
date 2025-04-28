"use client"
import React from "react"
import { connectContext } from "@/hooks/useConnect"
import { popupContext } from "@/hooks/usePopup"
import { useContext, useRef, useState } from "react"
import { Menu } from "../global/Menu"
import { Tasks } from "@/types/global"
import { emails } from "@/constants/task"
import { useForm } from "@/hooks/useForm"
import { emailSchema } from "@/types/schema"
import { UserRoundPlus } from "lucide-react"

export const Menbers = ({value}: {value: Tasks}) => {
    //useRef
    const indentique = useRef(false)
    const store = useRef(emails)
    //useState
    const [tab, setTab] = useState(emails)
    //useContext
    const {state, setDispatch} = useContext(popupContext)
    const {setGroups} = useContext(connectContext)
    //hooks
    const emailFrom = useForm({email: ''}, emailSchema)
    //function
    function handleChange (e: React.ChangeEvent) {
        let target = e.target as HTMLInputElement;
        const newTab = store.current.filter((item) => {
            return target.value.toLowerCase() === item.slice(0, target.value.length).toLowerCase()
        })
        if (target.value === '') {
            setTab(store.current)
        } else {
            setTab(newTab)
        }
    }
    function handleKeyUp (userEmail: string) {
            setGroups((prev: Record<string,any>) => {
                let nouveauTableau = {...prev};
                nouveauTableau.assign = {...value.assign}
                return nouveauTableau
            })
            indentique.current = false
            if (!emailFrom.error) {
                for (const [_, email] of Object.entries(value.assign)) {
                        if (email === userEmail) {
                            indentique.current = true
                        }
                    }
                const numbElement = Object.keys(value.assign).length 
                let objectifValue = {[`${numbElement + 1}`]: userEmail}
                if (!indentique.current) {
                    setGroups((prevElements: Record<string,any>) => {
                        let nouveauTableau = {...prevElements};
                        nouveauTableau.assign = {...nouveauTableau.assign, ...objectifValue};
                        return nouveauTableau;
                    })
                    emailFrom.setValue({email: ''})
                } else {
                    emailFrom.setError('this email is already call')
                    emailFrom.setValue({email: ''})
                }
            }
    }
    //DOM
    return (
        <Menu active={state.priority} dispatch='priority'>
            <div className={`flex flex-col relative w-[250px] text-sidebarText h-[250px] overflow-y-auto bg-primary rounded border border-borderCard`}>
                {emailFrom.error !== '' && 
                <div className="w-full absolute top-0 text-center">
                    <p className="text-center text-xs text-red-400">{emailFrom.error}</p>
                </div>
                }
                <div className="w-full sticky top-0">
                    <input 
                            type="email" 
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            name="email" 
                            value={emailFrom.value.email}
                            className="px-4 py-2 bg-secondary text-sidebarText w-full rounded outline-none placeholder:text-gray-500 text-sm" 
                            placeholder="Enter Email Adress" 
                            onChange={(e) => {
                                emailFrom.setError('')
                                emailFrom.handleChange(e)
                                handleChange(e)
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleKeyUp(emailFrom.value.email)
                                    setDispatch({menberList: false})
                                    document.body.style.overflow = 'auto'
                                }
                            }}
                        />
                    </div>
                <div className="mt-4 px-2">
                    {tab.map((item, index) => (
                        <div onClick={() => {
                            handleKeyUp(item)
                            setDispatch({menberList: false})
                            document.body.style.overflow = 'auto'
                        }} key={index} className="p-1 rounded text-sidebarText hover:bg-secondary cursor-pointer text-xs">
                        <p>{item}</p>
                    </div>
                    ))}
                    {tab.length === 0 &&
                    <div className="px-4 space-y-2 pb-2">
                        <p className="text-xs">No matches in {localStorage.getItem('workspace')} </p>
                        <div className="flex text-xs items-center py-1 px-4 space-x-2 cursor-pointer bg-sidebarText rounded text-gray-800"
                             onClick={() => setDispatch({invitation: true})}>
                                <UserRoundPlus size={16} />
                                <p>Invite Menber</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Menu>
    )
}