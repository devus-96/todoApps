"use client"
import { userRoute } from "@/constants/sidebar";
import clsx from "clsx"
import Image from "next/image";
import { usePathname } from "next/navigation"
import { SideBarSectionExtends } from "../global/sidebarSection";
import { SidebarLink } from "../global/sidebarLink";

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
                                return  <SidebarLink key={index} item={item} />
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