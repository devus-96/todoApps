"use client"
import { teamsRoutes } from "@/constants/sidebar";
import clsx from "clsx"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { UserPlus } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { StepBack } from "lucide-react";
import { useContext } from "react";
import { popupContext } from "@/hooks/usePopup";
import { SidebarLink } from "../global/sidebarLink";
import { TeamDetails } from "./details";

const SideBar = () => {
    const pathname = usePathname()
    const {setDispatch} = useContext(popupContext)
    return (
        <div className={
            clsx("sidebar", {
                "hidden" : pathname === '/auth/login' || 
                           pathname === '/auth/register' || 
                           pathname === '/auth/callback'
            })
        }>
            <TeamDetails />
            <div className="w-full h-full absolute flex flex-col">
                <div className="text-sidebarText flex justify-between items-center space-x-4 px-4">
                    <div className="flex-justify w-[150px]">
                        <div className=" bg-sidebarText rounded w-[20px] h-[20px] flex-center">
                            <p className="text-gray-800">{localStorage.getItem('workspace')?.slice(0, 1)}</p>
                        </div>
                        <div className="w-[80px]">
                            <p className="text-white text-sm overflow-hidden text-ellipsis whitespace-nowrap">{localStorage.getItem('workspace')}</p>
                        </div>
                        <div className="flex-center w-6 h-6 rounded duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800" onClick={() => setDispatch({teamDetails: true})}>
                            <ChevronDown size={16}/>
                        </div>
                    </div>
                    <Link href='/users' className="flex-center w-6 h-6 rounded duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800">
                        <StepBack size={16}/>
                    </Link>
                </div>
                <div className="h-auto mt-4 flex-1">
                    <div className="px-4">
                        {teamsRoutes.map((item, index) => {
                            return  <SidebarLink key={index} item={item} />
                        })}
                    </div>
                </div>
                <div className="relative bottom-0 mb-8 mt-4 w-full">
                    <div className="w-full px-4">
                        <div 
                        className="flex items-center space-x-4 mt-4 p-2 rounded transition duration-300 cursor-pointer text-sidebarText hover:bg-sidebarText hover:text-gray-800"
                        onClick={() => setDispatch({invitation: true})}
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