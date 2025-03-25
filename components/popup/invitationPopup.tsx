"use client"

import { Dispatch, SetStateAction, useRef, useState } from "react";
import Popup from "./popup"
import { Spinner } from "../ui/spinner";
import { Select } from "../ui/select";
import { IoMdClose } from "react-icons/io";
import { HTTPClient } from "@/lib/https";

export const InvitationPopUp = ({
    active = true, 
    setSendInvitation
}:{
    active: boolean,
    setSendInvitation: Dispatch<SetStateAction<boolean>>
}) => {
    const [role, setRole] = useState<string>('Menber');
    const [isLoading, setLoading] = useState<boolean>(false);
    const emails = useRef<string[]>([]);
    const [value, setValue] = useState<Record<string,unknown>>({});
    const roles = [
        'administrator: Can view stats, change site settings, invite people, approve tasks, Can view stats,submit tasks and create new task',
        'Menbers: Can view stats,submit tasks and create new task'
    ];

    const handleEmail = (e: React.KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (e.key === "Enter") {
            emails.current.forEach(email => {
                if (email === target.value) {
                    alert("already enter this emails ||| ");
                    return;
                }
            });
            if (regex.test(target.value)) {
                emails.current =  [...emails.current, target.value];
                const valueChanged: Record<string, string> = {
                    [target.name]: target.value,
                };
                setValue({...value, ...valueChanged});
            } else {
                alert("email you're just entered is invalid");
            }
            target.value = '';
        }
     }

     const handleClick = (item: string) => {
        emails.current = emails.current.filter((email) => email !== item);
        const valueChanged: Record<string, string[]> = {
            email: emails.current,
        };
        setValue({...value, ...valueChanged});
     }
    return (
        <>
            {active && 
            <Popup width="400px" height="auto" modeNight={true} setActive={setSendInvitation}>
                <div className="text-sidebarText p-4 space-y-4">
                    <h1 className="text-center text-gray-300">Invite Menbers</h1>
                    <p className="text-xs">Write emails in field bellow and click Enter</p>
                    <div>
                        <label className="text-sm">Enter Email Adress</label>
                        <input 
                            type="email" 
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            name="email" 
                            className="px-4 py-2 bg-sidebarText text-gray-800 w-full rounded-full outline-none placeholder:text-gray-500 text-sm" 
                            placeholder="Enter Email Adress" 
                            onKeyUp={(e) => handleEmail(e)}
                            required
                        />
                    </div>
                    
                    {emails.current.length !== 0 &&
                       <div className="grid grid-cols-1 gap-4 border-gray-800 border bg-sidebarText p-4">
                            {emails.current.map((item: string, index) => (
                                <div key={index} className="text-sm flex items-center bg-gray-800 text-sidebarText justify-between p-1">
                                    <p className="text-xs">{item}</p>
                                    <IoMdClose size={12} className="cursor-pointer" onClick={() => handleClick(item)}/>
                                </div>
                            ))}
                        </div>
                    }
                    <div>
                        <label className="text-sm">Role</label>
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