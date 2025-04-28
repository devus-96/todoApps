"use client"

import { Bell, MessageSquareText } from "lucide-react"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Spinner } from "../ui/spinner";

export const HeaderProject = ({submit, loading}:{submit?: () => void, loading?: boolean}) => {

    const pathname = usePathname()
    const teamId = localStorage.getItem('teamId')

    return <div className="flex items-center justify-between px-4 bg-secondary py-2">
    <div></div>
    <div className="flex item-center px-4">
        {(pathname === '/users/project/new' || pathname === `/teams/${teamId}/project/new`) ?
            <div onClick={() => {
                submit && submit()
            }} className="flex items-center text-sidebarText px-2 py-1 text-sm border border-borderCard rounded mr-4 cursor-pointer">
                {loading && <Spinner className="w-[15px] p-0 mr-4" bg="#a6a6a8" fill="#171515" />}
                <div className="">
                    <p>Create new project</p>
                </div>
        </div>
        : <div></div>}
        <div className="flex items-center text-gray-400 mr-4 space-x-4">
            <div className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                <MessageSquareText size={16} />
            </div>
            <div  className="rounded w-[35px] h-[35px] flex-center bg-primary cursor-pointer">
                <Bell size={16} />
            </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-300 text-sidebarText flex-center">
            <Image src='/Rectangle.svg' alt="Me" width={32} height={32}></Image>
        </div>
        <div className="flex flex-col text-xs text-gray-300">
            <p>marcdevus@gmail.com</p>
            <p>Administrator</p>
        </div>
    </div>
</div>
}