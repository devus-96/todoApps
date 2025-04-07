"use client"

import { useContext, useRef, useState } from "react";
import Popup from "./popup"
import { Spinner } from "../ui/spinner";
import { Select } from "../ui/select";
import { IoMdClose } from "react-icons/io";
import { HTTPClient } from "@/lib/https";
import { Message } from "../ui/message";
import { popupContext } from "@/hooks/usePopup";
import { useForm } from "@/hooks/useForm";

const roles = [
    'administrator: Can view stats, change site settings, invite people, approve tasks, Can view stats,submit tasks and create new task',
    'Menbers: Can view stats,submit tasks and create new task'
];

export const InvitationPopUp = () => {
    //variable
    const defaultCalue = {
        email: null
    }
    //useState
    const [role, setRole] = useState<string>('Menber');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [more, setMore] = useState<boolean>(false)
    //useContext
    const {state} = useContext(popupContext)
    //hook
    const {handleClick, handleEmail, error, setError, emails} = useForm(defaultCalue)

    return (
        <>
            {state.invitation && 
            <Popup width="400px" height="auto" modeNight={true} popup='invitation' className="rounded-lg">
                <Message message={error} />
                <div className="text-sidebarText p-4 space-y-4">
                    <h1 className="text-gray-300 text-center">Invite Menbers</h1>
                    <p className="text-xs text-center">Write emails in field bellow and click Enter</p>
                    <div>
                        <label className="text-xs">Enter Email Adress</label>
                        <input 
                            type="email" 
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            name="email" 
                            className="px-4 py-2 bg-sidebarText text-gray-800 w-full rounded-full outline-none placeholder:text-gray-500 text-sm" 
                            placeholder="Enter Email Adress" 
                            onKeyUp={(e) => {
                                handleEmail(e)
                            }}
                            required
                        />
                    </div>
                    {emails.current.length !== 0 &&
                       <div className="grid grid-cols-1 gap-4 border-gray-800 border bg-sidebarText p-4">
                            {emails.current.map((item: string, index) => {
                                if (more === false) {
                                    return (
                                        <div key={index}>
                                        <div className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                            <p className="text-xs">{item}</p>
                                            <IoMdClose size={12} className="cursor-pointer" onClick={() => handleClick(item)}/>
                                        </div>
                                        </div>
                                    )
                                }
                            })}
                            {emails.current.length > 3 && <p className="text-gray-800 text-xs hover:underline" onClick={() => {setMore(true)}}>see {emails.current.length - 3} others </p>}
                        </div>
                    }
                    <div>
                        <label className="text-xs">Role</label>
                        <Select 
                            name="role" 
                            options={roles} 
                            handler={setRole}
                            inputClass="flex items-center cursor-pointer justify-between text-gray-800" 
                            className="w-full relative rounded-lg bg-sidebarText p-2 text-sm"
                            seclectClass="absolute w-full top-[40px] rounded p-5 mb-2 bg-primary shadow text-sidebarText"
                        />
                    </div>
                    <div>
                        <button 
                            type="submit" 
                            className="btn1 flex-center gap-4 text-gray-800"
                            onClick={() => {
                            HTTPClient('marcdevus@gmail.com').get('http://127.0.0.1:8000/auth/sendEmail.php')
                            }}
                        >
                            {isLoading && <Spinner className="w-[30px] p-0" fill="#9eabe4" bg="#fff"/>}send
                        </button>
                    </div>
                </div>
            </Popup>
            }
        </>
    )
}