"use client"
import React, { useContext, useState } from "react";
import { userRoute } from "@/constants/sidebar";
import clsx from "clsx"
import Image from "next/image";
import { usePathname } from "next/navigation"
import { SideBarSectionExtends } from "../global/sidebarSection";
import { SidebarLink } from "../global/sidebarLink"
import { popupContext } from "@/hooks/usePopup";
import { messageContext } from "@/hooks/useMessage";
import { fetchTeamsProjects } from "@/api/project";

const SideBar = () => {
    const pathname = usePathname()
    const [projects, setProjects] = useState<any>()
    const {setGetter} = useContext(messageContext)
    const [isLoading, setLoading] = useState<boolean>(false)
    
    function fetchProjects () {
        const teamId = localStorage.getItem('teamId')
        setGetter(() => [{}])
        setLoading(true)
        fetchTeamsProjects().then((res) => {
            setProjects(res)
        }).catch((err) => {
            setGetter(prev => [...prev, err])
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className={
            clsx("sidebar", {
                "hidden" : pathname === '/auth/login' || 
                pathname === '/auth/register' || 
                pathname === '/auth/callback'
            })
        }>
            <div className="w-full h-auto absolute">
                <div className="text-sidebarText flex items-center px-4 space-x-4">
                    <Image src='/logo.svg' alt="logo" width={40} height={40} /><p className="text-white">TODOAPPS</p>
                </div>
                <div className="mt-8 border-sidebarText">
                    <p className="uppercase ml-4 text-xs my-4 text-sidebarText">workspace</p>
                    {userRoute.map((item) => {
                        if (item.name === 'Company') {
                            return (
                                <SideBarSectionExtends item={item}  key={item.name} />
                            )
                        } else if (item.name === 'Teams') {
                            return (
                                <SideBarSectionExtends item={item}  key={item.name} />
                            )
                        }
                    })}
                </div>
                <div className="h-2/3">
                    <div className="mb-4 border-sidebarText px-4">
                        {userRoute.map((item, index) => {
                            if (item.name !== 'Company' && item.name !== 'Teams') {
                                return  <SidebarLink 
                                key={index} 
                                item={item} 
                                projects={projects}
                                fetchProjects={fetchProjects}
                                loading={isLoading}
                                />
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar