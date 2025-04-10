import { usePathname } from "next/navigation";
import { linkProps } from "./sidebarSection";
import clsx from "clsx";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import { popupContext } from "@/hooks/usePopup";
import { Spinner } from "../ui/spinner";
import Link from "next/link";

const companies = [
    {name: "symphony social"},
    {name: "axe digital"},
    {name: "OPEP CAPITAL"},
    {name: "Music Groupcasascakjbkjbj"},
    {name: "symphony social"},
    {name: "axe digital"},
    {name: "OPEP CAPITAL"},
    {name: "Music Groupcasascakjbkjbjkb"},
    {name: "symphony social"},
    {name: "axe digital"},
    {name: "OPEP CAPITAL"},
    {name: "Music Groupcasascakjbkjbjkb"}]

export const SidebarLink:React.FC<linkProps> = ({item}) => {
    const pathname = usePathname()
    const {setDispatch} = useContext(popupContext)
    const [active, setActive] = useState<boolean>(false);
    const [projectIcon, setProjectIcons] = useState(true);
    return (
        <div>
            <div key={item.name}
                onClick={(e)=> {
                    e.stopPropagation()
                    window.location.assign(item.route)
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
                <div className="flex items-center space-x-4 h-full  pl-4" style={{
                    paddingLeft: item.name !== 'Tasks' ? 16 + 'px' : "0"
                }}>
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
                            window.location.assign('/teams/project/new')
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
                        {false && <Spinner className="w-[18px] p-0" bg="#fff" fill="#171515" />}
                        {companies.map((company, index) => {
                            return <div key={index}>
                                {index < 3 && <div className="rounded text-sm mt-4 text-sidebarText  hover:bg-sidebarText hover:text-gray-800">
                                <Link 
                                href={item.route} 
                                className="block  py-2 rounded "
                                onClick={() => localStorage.setItem('workspace', company.name)}>
                                    <ul className="w-full list-disc pl-12 overflow-hidden text-ellipsis whitespace-nowrap">
                                        <li><p className="text-xs">{company.name}</p></li>
                                    </ul>
                                </Link>
                            </div>}
                            </div>
                        })}
                        {companies.length > 3  && <div onClick={()=> setDispatch({projectList: true})
                        } className="py-1 mt-4 pl-12 cursor-pointer rounded text-xs text-sidebarText hover:underline">
                             <p>See More</p>
                        </div>}
                </div>
            }
        </div>
    )
}