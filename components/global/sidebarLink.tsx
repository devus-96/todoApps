import React from "react";
import { usePathname } from "next/navigation";
import { linkItemsType } from "./sidebarSection";
import clsx from "clsx";
import { FaChevronDown, FaChevronRight, FaPlus, FaTasks } from "react-icons/fa";
import { useContext, useState } from "react";
import { popupContext } from "@/hooks/usePopup";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { messageContext } from "@/hooks/useMessage";

export interface linkProps {
    item: linkItemsType,
    projects: any
    fetchProjects: () => void,
    loading: boolean
}


export const SidebarLink:React.FC<linkProps> = ({item, fetchProjects,loading, projects }) => {
    //usePathname
    const pathname = usePathname()
    //useContext
    const {setDispatch} = useContext(popupContext)
    const {setGetter} = useContext(messageContext)
    //useState
    const [active, setActive] = useState<boolean>(false);
    const [projectIcon, setProjectIcons] = useState(true);
    //DOM
    return (
        <div>
            <div key={item.name}
                onClick={(e)=> {
                    e.stopPropagation()
                    window.location.assign(item.route)
                    setGetter(() => [])
                }}
                onMouseOver={() => {
                    setProjectIcons(false)
                }}
                onMouseOut={() =>{
                    setProjectIcons(true)
                }}
            >
            <div className={clsx("mt-4 h-[44px] rounded transition duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800",{
        
                "bg-btnColor text-gray-800": pathname === item.route,
                'text-sidebarText' :  pathname !== item.route,
                'group' : item.name === 'Tasks' || item.name === 'Menbers' || item.name === 'Projects' || item.name === 'Meetings'
            })}>
                <div onClick={() => {
                        
                    }}  className={clsx("flex items-center h-full", {
                    'space-x-4 pl-4' : item.name !== 'Tasks'
                })}>
                    {item.name !== 'Tasks' ? <item.icons size={16} /> :
                        <>
                        {projectIcon ?
                        <div
                        className="flex-center h-full px-4"
                        ><item.icons size={16} /></div>: 
                        <div className="flex-center h-full duration-150 cursor-pointer hover:bg-gray-800 hover:text-sidebarText">
                            {active ? 
                            <div onClick={(e) => {
                                e.stopPropagation();
                                setActive(false)
                            }} className="w-full h-full flex-center px-4">
                                <FaChevronDown size={12} title={`${item.name}`}/>
                            </div>
                                : 
                                <div onClick={(e) => {
                                e.stopPropagation();
                                setActive(true)
                                !projects && fetchProjects()
                            }} className="w-full h-full flex-center px-4 ">
                                <FaChevronRight size={12} title={`${item.name}`}/>
                            </div>}
                        </div>
                        }
                        </>
                    }
                    <p className="text-sm flex-1">{item.name}</p>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        if (item.name === 'Menbers') {
                            setDispatch({invitation: true})
                        } else if (item.name === 'Tasks') {
                            setDispatch({task: true})
                        }
                        else if (item.name === 'Projects') {
                            const teamId = localStorage.getItem('teamId')
                            let part = pathname.split('/')[1]
                            if (part === 'teams') {
                                window.location.assign(`/teams/${teamId}/project/new`)
                            } else {
                                window.location.assign(`/users/project/new`)
                            }
                        }
                    }} className="flex-center w-8 h-full duration-150 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-gray-800 hover:text-sidebarText">
                        {(item.name === 'Tasks' || item.name === 'Menbers' || item.name === 'Projects' || item.name === 'Meetings') && 
                            <FaPlus size={12} title={`new ${item.name}`}/>
                        }
                    </div>
                </div>
            </div>
            </div>
            {item.name === 'Tasks' &&
                <div className={clsx('', {
                        "hidden": !active
                    })}>
                    <div className="mt-2 ml-6">
                        <div className="">
                            <p className="text-sidebarText text-xs">Team tasks</p>
                            <div className="flex items-center space-x-2 rounded text-xs cursor-pointer my-2 text-sidebarText/50  hover:bg-sidebarText hover:text-gray-800 py-2 px-2">
                                <FaTasks /> <p>All tasks</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-sidebarText">Project tasks</p>
                            {loading && <Spinner className="w-[18px] p-0 ml-4 mt-2" bg="#fff" fill="#171515" />}
                            {projects?.data ? projects.data.reverse().map((project: any, index: number) => {
                                return <div key={index}>
                                    {index < 3 && <div className="rounded text-sm mt-4 text-sidebarText/50  hover:bg-sidebarText hover:text-gray-800">
                                    <div 
                                    className="block  py-2 rounded"
                                    onClick={() => {
                                        const teamId = localStorage.getItem('teamId')
                                        window.location.assign(`/teams/${teamId}/project/${project.id}`)
                                    }}>
                                        <ul className="w-full list-disc px-6 cursor-pointer">
                                            <li><p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{project.name}</p></li>
                                        </ul>
                                    </div>
                                </div>}
                                </div>
                            }): <p className="mt-4 ml-2 text-xs text-sidebarText/50">not project !</p>}
                            {projects?.data && projects.data?.length > 3  && <div onClick={()=> setDispatch({projectList: true})
                            } className="py-1 mt-4 ml-4 cursor-pointer rounded text-xs text-sidebarText hover:underline">
                                    <p>See More</p>
                            </div>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}