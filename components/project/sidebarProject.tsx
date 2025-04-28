"use client"
import { popupContext } from '@/hooks/usePopup';
import { Target } from 'lucide-react';
import { useContext, useEffect, useRef } from 'react';

const SidebarProject = ({data}:{data: unknown}) => {
    const sidProjectRef = useRef<HTMLDivElement>(null)
    const {state, setDispatch} = useContext(popupContext)
    useEffect(() => {
        const handlerClic = (e: MouseEvent) => {
            const target = e.target as Document
            if (!sidProjectRef?.current?.contains(target)) {
                setDispatch({projectList: false})
            }
        }
        document.addEventListener("mousedown", handlerClic)
        return () => {
            document.removeEventListener("mousedown", handlerClic)
        }
    }, [state.projectList])
    return (
        <div ref={sidProjectRef} style={{
            left: state.projectList === true ? 220 + 'px' : -400 + 'px'
        }} className="fixed top-0 bottom-0 w-[250px] bg-secondary duration-300 z-0 border border-borderCard">
            <div className="w-full text-xs text-sidebarText flex items-center justify-between px-4 py-4">
                <div className='flex items-center space-x-4'><Target /><p>project</p></div>
            </div>
            <div className="space-y-4 px-4 truncate overflow-hidden text-ellipsis whitespace-nowrap mt-4">
                {Array.isArray(data) &&
                <div>
                    {data.map((item, index) => (
                        <div key={index} className="p-1 rounded text-sidebarText bg-primary cursor-pointer text-xs">
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    )
}

export default SidebarProject