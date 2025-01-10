"use client"
import { LuLayoutDashboard } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";

const route = [
    {
        name: 'Dashboard',
        icons: LuLayoutDashboard,
        route: "/"
    },
    {
        name: 'Calendar',
        icons: LuCalendarDays,
        route: "/calendar"
    },
    {
        name: 'Project',
        icons: FaTasks,
        route: "/task"
    },
    {
        name: 'Settings',
        icons: GoGear,
        route: "/settings"
    },
]

const SideBar = () => {
    const pathname = usePathname()
    return <section className="fixed top-0 bottom-0 w-[200px] flex flex-col bg-primary justify-between font-[family-name:var(--font-jetBrains-mono)]">
                <Image src='/logo.svg' className="mt-4 mx-auto" alt="logo" width={100} height={100} />
                <div className="px-2 h-2/3 mt-12">
                    {route.map((item) => (
                        <div key={item.name} className={clsx("text-sidebarText mt-4 py-2 px-8 rounded transition duration-300 cursor-pointer hover:bg-btnColor hover:text-gray-800",{
                            "bg-btnColor text-red-800": pathname === item.route
                        })}>
                            <Link href={item.route}>
                                <div className="flex items-center space-x-4">
                                    <item.icons />
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex items-center text-sidebarText space-x-4 px-2 py-4">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-600"></div>
                    <p>{sessionStorage.getItem('firstname')} {sessionStorage.getItem('lastname')}</p>
                </div>
    </section>
}

 export default SideBar