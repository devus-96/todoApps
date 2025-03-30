"use client"
import { popupContext } from '@/hooks/usePopup';
import { SquareChartGantt } from 'lucide-react';
import { Cog } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import { useContext, useEffect, useRef } from 'react';

const teams = [
    "communication",
    "JONG",
    "symphoni social"
]
export const TeamDetails = () => {
    const {state, setDispatch} = useContext(popupContext)
    const menuRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            const target = e.target as Document
            if (!menuRef?.current?.contains(target)) {
                setDispatch({teamDetails: false})
            }
        }
        document.addEventListener("mousedown", handlerClick)
        return () => {
            document.removeEventListener("mousedown", handlerClick)
        }
    }, [state.teamDetails])

    return (
        <>
        {state.teamDetails &&
        <div ref={menuRef} className="w-[350px] text-sidebarText bg-primary fixed top-12 left-4 border border-[#494949] z-50 py-4 rounded space-y-4">
            <div className='flex px-4 overflow-hidden text-ellipsis whitespace-nowrap'>
                <SquareChartGantt size={48} />
                <div className='block'>
                    <p>{localStorage.getItem('workspace')}</p>
                    <span className='flex text-xs'><p>free plan</p>.<p>4 Menbers</p></span>
                </div>
            </div>
            <div className='flex items-center space-x-2 my-4 border-b py-4 px-4'>
                <div className='p-1 border rounded flex items-center text-xs space-x-2 cursor-pointer'><Cog size={12}/> <p>Settings</p></div>
                <div className='p-1 border rounded flex items-center text-xs space-x-2 cursor-pointer'
                     onClick={() => {
                        setDispatch({invitation: true})
                        setDispatch({teamDetails: false})
                     }}
                ><UserRoundPlus size={12}/> <p>invite menbers</p></div>
            </div>
            <div className='px-4'>
                <p className=''>Role</p>
                <p className='text-xs mb-1'>marcdevus@gmail.com</p><p className='text-xs'>administrator</p>
            </div>
            <div className='px-4 border-b py-2'>
                <p>Groups</p>
                {teams.map((item, index) => (
                    <div key={index} className='flex items-center rounded hover:bg-gray-800 px-2 cursor-pointer'>
                        <div className=" bg-sidebarText rounded w-[20px] h-[20px] flex-center">
                            <p className="text-gray-800">{item.slice(0, 1)}</p>
                        </div>
                        <p key={index} className='text-xs p-1 mb-1'>{item}</p>
                    </div>
                ))}
            </div>
            <div className='px-4'><p className='text-sm p-2 mb-1 cursor-pointer hover:bg-gray-800 rounded'>Log out</p></div>
        </div>
        }
        </>
    )
}