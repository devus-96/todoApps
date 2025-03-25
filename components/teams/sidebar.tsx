"use client"
import { teamsRoutes } from "@/constants/sidebar";
import clsx from "clsx"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { UserPlus } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { StepBack } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { InvitationPopUp } from "../popup/invitationPopup";
import { useState } from "react";

const SideBar = () => {
    const pathname = usePathname()
    const [invitation, setInvitation] = useState<boolean>(false);
    return (
        <div className={
            clsx("sidebar", {
                "hidden" : pathname === '/auth/login' || 
                           pathname === '/auth/register' || 
                           pathname === '/auth/callback'
            })
        }>
            <InvitationPopUp active={invitation} setSendInvitation={setInvitation} />
            <div className="w-full h-full absolute flex flex-col">
                <div className="text-sidebarText flex justify-between items-center space-x-4 px-4">
                    <div className="flex-justify w-[150px]">
                        <div className=" bg-sidebarText rounded w-[20px] h-[20px] flex-center"><p className="text-gray-800">A</p></div>
                        <div className="w-[80px]">
                            <p className="text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap">{sessionStorage.getItem('workspace')}</p>
                        </div>
                        <div className="flex-center w-6 h-6 rounded duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800"><ChevronDown size={16}/></div>
                    </div>
                    <Link href='/users' className="flex-center w-6 h-6 rounded duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800"><StepBack size={16}/></Link>
                </div>
                <div className="h-auto mt-4 flex-1">
                    <div className="px-4">
                        {teamsRoutes.map((item, index) => {
                            return  <div key={index}>
                                    <div key={item.name}
                                        onClick={(e)=> {
                                            e.stopPropagation()
                                            window.location.assign(item.route)
                                        }}
                                    >
                                        <div className={clsx("mt-4 py-2 px-4 rounded transition duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800",{
                                            "bg-btnColor text-gray-800": pathname === item.route,
                                            'text-sidebarText' :  pathname !== item.route,
                                            'group' : item.name === 'Tasks' || item.name === 'Menbers' || item.name === 'Projects' || item.name === 'Meetings'
                                        })}>
                                            <div className="flex items-center space-x-4">
                                                <item.icons size={16} />
                                                <p className="text-sm flex-1">{item.name}</p>
                                                <div className="flex-center w-6 h-6 rounded duration-150 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-gray-800 hover:text-sidebarText">
                                                    {(item.name === 'Tasks' || item.name === 'Menbers' || item.name === 'Projects' || item.name === 'Meetings') && 
                                                    <FaPlus 
                                                        size={12} 
                                                        title={`new ${item.name}`} 
                                                        className=""
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (item.name === 'Menbers') {
                                                                setInvitation(true);
                                                            }
                                                        }}
                                                    />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        })}
                    </div>
                </div>
                <div className="absolute bottom-8 w-full">
                    <div className="absolute bottom-8 w-full px-4">
                        <div 
                        className="flex items-center space-x-4 mt-4 p-2 rounded transition duration-300 cursor-pointer text-sidebarText hover:bg-sidebarText hover:text-gray-800"
                        onClick={() => setInvitation(true)}
                        >
                            <div>
                                <UserPlus className="flex items-center space-x-4"/>
                            </div>
                            <p className="text-sm"> Invite menbers</p>
                        </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar