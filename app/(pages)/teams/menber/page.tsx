"use client"

import { HeaderProject } from "@/components/global/header"
import { MenberCard } from "@/components/global/moreMenberCard"
import { popupContext } from "@/hooks/usePopup"
import clsx from "clsx"
import { Plus, Search, MoreVertical } from "lucide-react"
import Image from "next/image"
import { useContext, useState } from "react"

const Menbers = [
    {
      "member": "Alice Dupont",
      "Email": "alice.dupont@example.com",
      "Role": "Développeur Front-end",
      "status": "accept"
    },
    {
      "member": "Bob Martin",
      "Email": "bob.martin@example.com",
      "Role": "Développeur Back-end",
      "status": "pending"
    },
    {
      "member": "Charlie Durand",
      "Email": "charlie.durand@example.com",
      "Role": "Designer UX/UI",
      "status": "refused"
    },
      {
      "member": "David Smith",
      "Email": "david.smith@example.com",
      "Role": "Chef de projet",
      "status": "cancel"
    },
    {
      "member": "Eve Garcia",
      "Email": "eve.garcia@example.com",
      "Role": "Testeur QA",
      "status": "accept"
    },
    {
        "member": "Alice Dupont",
        "Email": "alice.dupont@example.com",
        "Role": "Développeur Front-end",
        "status": "accept"
      },
      {
        "member": "Bob Martin",
        "Email": "bob.martin@example.com",
        "Role": "Développeur Back-end",
        "status": "pending"
      },
      {
        "member": "Charlie Durand",
        "Email": "charlie.durand@example.com",
        "Role": "Designer UX/UI",
        "status": "refused"
      },
        {
        "member": "David Smith",
        "Email": "david.smith@example.com",
        "Role": "Chef de projet",
        "status": "cancel"
      },
      {
        "member": "Eve Garcia",
        "Email": "eve.garcia@example.com",
        "Role": "Testeur QA",
        "status": "accept"
      }
  ]

const MenberPage = () => {
    const [position, setPosition] = useState({x:0, top:0})
    const {setDispatch, state} = useContext(popupContext)
    function handlerBoundingClientRect (event: React.MouseEvent, element: number) {
        let target = event.target as HTMLDivElement
        // Récupérer les coordonnées du clic
        const y = event.clientY;
        let upordown = y  + element > window.innerHeight
        const boutonRect = target.getBoundingClientRect();
        let height = boutonRect.bottom - boutonRect.top
        if (upordown) {
            setPosition({x: (boutonRect.left - 180) + height ,top: (boutonRect.top - element) + height})
        } else {
            setPosition({x: boutonRect.right - 180,top: boutonRect.top})
        }
    }
    return (
        <div className="bg-secondary w-[calc(100%-200px)] min-h-screen pb-8">
            <HeaderProject />
            {state.menberAction &&
            <>
                <div className="absolute top-0 left-0 right-0 h-screen" onClick={() => setDispatch({menberAction: false})}></div>
                <div className="fixed w-[180px] h-[245px]" style={{
                    left: position.x + 'px',
                    top: position.top + 'px',
                }}>
                    <MenberCard />
                </div>
            </>
            }   
            <div className="w-full flex justify-between items-center text-sidebarText px-8 mt-8">
                <div>
                    <p className="text-2xl">Members</p>
                    <p className="text-xs">You have n menbers in you team</p>
                </div>
                <div className="flex items-center space-x-5">
                    <div className="py-2 px-4 flex items-center justify-between bg-primary space-x-2 rounded-full text-sidebarText">
                        <Search size={12} />
                        <input 
                            type="text" 
                            className="w-[90%] bg-primary outline-none"
                            placeholder="search a menber"
                        />
                    </div>
                    <div className="flex items-center space-x-2 rounded bg-primary p-2 text-sidebarText">
                        <Plus />
                    </div>
                </div>
            </div>
            <div className="px-8 mt-4">
                <table className="bg-primary rounded border-secondary text-sidebarText w-full overflow-y-visible text-start">
                    <thead>
                        <tr>
                            <th className="pl-4 py-4 text-start">Team menber</th>
                            <th className="pl-4 py-4 text-start">Email</th>
                            <th className="pl-4 py-4 text-start">Role</th>
                            <th className="pl-4 py-4 text-start">status</th>
                            <th className="pl-4 py-4 text-start"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Menbers.map((item, index) => (
                            <tr key={index} className="border-t border-b border-secondary text-sm">
                                <td className="flex items-center p-4 space-x-4">
                                    <Image src='/Rectangle.svg' alt="Me" width={32} height={32}></Image>
                                    <p>{item.member}</p>
                                </td>
                                <td className="p-4">{item.Email}</td>
                                <td className="p-4">{item.Role}</td>
                                <td className="p-4">
                                    <div className={clsx("p-2 rounded-full flex flex-center text-xs", {
                                        "text-emerald-600 bg-emerald-200" : item.status === 'accept',
                                        "text-red-600 bg-red-200" : item.status === 'refused',
                                        "text-gray-600 bg-gray-200" : item.status === 'cancel',
                                        "text-sky-600 bg-sky-200" : item.status === 'pending',
                                    })}>
                                        {item.status}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div onClick={(e) => {
                                        setDispatch({menberAction: true})
                                        handlerBoundingClientRect(e, 245)
                                    }} className="w-6 h-6 rounded flex flex-center text-xs space-x-2 cursor-pointer">
                                        <MoreVertical size={16}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MenberPage