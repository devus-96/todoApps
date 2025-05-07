import React from "react"
import clsx from "clsx"
import { useContext, useState } from "react"
import { IconType } from "react-icons"
import { FaChevronRight, FaPlus } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { Spinner } from "../ui/spinner"
import { popupContext } from "@/hooks/usePopup"
import { getTeams } from "@/api/teams"

export type linkItemsType = {
    name: string;
    icons: IconType;
    route: string;
}

export interface linkProps {
    item: linkItemsType
}

export const SideBarSectionExtends:React.FC<linkProps> = ({
    item
}) => {
    //useState
    const [loading, setLoading] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [error, setError] = useState<any>()
    const [team, setTeam] = useState<any[]>()
    //useContext
    const {setDispatch} = useContext(popupContext)
    //function
    function fetchUserCompany () {
        setLoading(true);
        setActive(true);
        getTeams().then((res: any) => {
            setTeam(res.data)
            console.log(res)
        }).catch((error)=> {
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
    }
    //Dom
    return (
        <>
        <div>
            <div className="py-2 px-8 transition duration-300 cursor-pointer text-sidebarText">
                <div className={`flex items-center ${active ? 'text-btnColor' : 'text-sidebarText'}`}>
                    <div 
                        className="w-5 h-5 mr-4 rounded flex-center hover:text-sidebarText hover:bg-[#333]"
                        onClick={() => {
                            if (active) {
                                setActive(false)
                            }
                        }}
                    >
                    {active ? <FaChevronDown size={12} title={`${item.name}`}/> : <FaChevronRight 
                    onClick={() => {
                        fetchUserCompany()
                    }}
                    size={12} title={`${item.name}`}/>}
                    </div>
                    <div className="w-1/2">
                        <p className="text-sm">{item.name}</p>
                    </div>
                    <div className="flex itens-center space-x-2">
                        <div className="w-8 h-8 rounded flex-center ml-4 hover:text-sidebarText hover:bg-gray-800"
                               onClick={() => {item.name === 'Teams' && setDispatch({team: true})}}>
                            <FaPlus size={12} title={`new ${item.name}`}/>
                        </div>
                    </div>
                </div>
                <div className={clsx('', {
                    "hidden": !active
                })}>
                    {loading && <Spinner className="w-[18px] p-0" bg="#fff" fill="#171515" />}
                    {team?.map((company, index) => (
                    <div onClick={() => {
                        if (company.id) {
                            localStorage.setItem('teamId', company.team_id)
                            window.location.assign(`/teams/${company.team_id}`)
                        }
                    }} key={index} className="rounded text-sm mt-4 hover:bg-sidebarText hover:text-gray-800">
                        <div 
                        className="block  py-2 rounded "
                        onClick={() => localStorage.setItem('workspace', company.name)}>
                            <ul className="w-full list-disc pl-12 overflow-hidden text-ellipsis whitespace-nowrap">
                                <li><p className="text-xs">{company.name}</p></li>
                            </ul>
                        </div>
                    </div>
                    ))}
            </div>
            </div>
        </div>
        </>
    )
}