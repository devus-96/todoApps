import { usePathname } from "next/navigation";
import { linkProps } from "./sidebarSection";
import clsx from "clsx";
import { FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { popupContext } from "@/hooks/usePopup";

export const SidebarLink:React.FC<linkProps> = ({item}) => {
    const pathname = usePathname()
    const {setDispatch} = useContext(popupContext)
    return (
        <div>
            <div key={item.name}
                onClick={(e)=> {
                    e.stopPropagation()
                    window.location.assign(item.route)
            }}>
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
                            onClick={(e) => {
                            e.stopPropagation();
                            if (item.name === 'Menbers') {
                                setDispatch({invitation: true})
                            } else if (item.name === 'Tasks') {
                                setDispatch({task: true})
                            }
                            }}
                        />}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}