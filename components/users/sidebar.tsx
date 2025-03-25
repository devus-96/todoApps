"use client"
import { userRoute } from "@/constants/sidebar";
import clsx from "clsx"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { SideBarSectionExtends } from "../global/sidebarSection";
import { FaPlus } from "react-icons/fa";

const SideBar = () => {
    const pathname = usePathname()
    
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
                <div className="h-2/3 mt-8">
                    <div className="mb-4 border-t border-sidebarText px-4">
                        {userRoute.map((item, index) => {
                            if (item.name !== 'Company' && item.name !== 'Teams') {
                                return  <div key={index}>
                                    <Link href={item.route} key={item.name}>
                                        <div className={clsx("mt-4 py-2 px-4 rounded transition duration-300 cursor-pointer hover:bg-sidebarText hover:text-gray-800",{
                                            "bg-btnColor text-gray-800": pathname === item.route,
                                            'text-sidebarText' :  pathname !== item.route,
                                             'group' : item.name === 'Tasks' || item.name === 'Menbers' || item.name === 'Projects'
                                        })}>
                                            <div className="flex items-center space-x-4">
                                                <item.icons size={16} />
                                                <p className="text-sm flex-1">{item.name}</p>
                                                <div className="flex-center w-6 h-6 rounded duration-150 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-gray-800 hover:text-sidebarText">
                                                    {(item.name === 'Tasks' || item.name === 'Menbers' || item.name === 'Projects') && <FaPlus size={12} title={`new ${item.name}`} className=""/>}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            }
                        })}
                    </div>
                    <div className="mb-4 border-t border-sidebarText">
                        <p className="uppercase ml-2 text-sm my-4 text-btnColor">workspace</p>
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
                    
                </div>
            </div>
        </div>
    )
}

export default SideBar