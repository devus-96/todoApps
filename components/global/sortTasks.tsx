"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { emails, priority, states } from "@/constants/task";

export type sortListProps = {
    assign: string,
    priority: string,
    state: string
}

const OptionsComponent = (
    {
        tab, 
        child,
        setChild,
        sortList,
        setSortList
    }: 
    {
        tab: string[], 
        child: string,
        sortList: sortListProps,
        setChild: Dispatch<SetStateAction<string>>
        setSortList: Dispatch<SetStateAction<sortListProps>>
    }) => {
     //useState
     const [newValue, setNewValue] = useState('')
     const [table, setTable] = useState(tab)
     //useRef
    const menuRef = useRef<HTMLDivElement>(null)
    const store = useRef(tab)
    
    //useEffect
    useEffect (() => {
        const handlerClick = (e: MouseEvent) => {
            const target = e.target as Document
            if (!menuRef?.current?.contains(target)) {
                setChild('')
            }
          }
          document.addEventListener("click", handlerClick)
          return () => {
            document.removeEventListener("click", handlerClick)
          }
    }, [child])

    function handleChange (e: React.ChangeEvent) {
        let target = e.target as HTMLInputElement;
        setNewValue(target.value)
        const newTab = store.current.filter((item) => {
            return target.value.toLowerCase() === item.slice(0, target.value.length).toLowerCase()
        })
        if (target.value === '') {
            setTable(store.current)
        } else {
            setTable(newTab)
        }
    }
    return (
        <>
            <div ref={menuRef} className="bg-primary border border-[#494949] h-[250px] overflow-auto">
            <input 
                type="text" 
                name='name'
                className="popupinput bg-primary text-gray-300" 
                placeholder='hey'
                onChange={(e) =>{handleChange(e)}}
                />
                <div className="px-4">
                    <div className="p-2">
                        <div>
                            <p className="text-xs mb-4 text-sidebarText">create one or choose one</p>
                            {table.map((item, index) => (
                                <div onClick={() => {
                                    if (child === 'Menbers') {
                                        const newValue = {assign: item}
                                        setSortList({...sortList, ...newValue})
                                    } else if (child === 'Priority') {
                                        const newValue = {priority: item}
                                        setSortList({...sortList, ...newValue})
                                    } else if (child === 'States') {
                                        const newValue = {state: item}
                                        setSortList({...sortList, ...newValue})
                                    }
                                    setChild('')
                                }} key={index} className="text-xs p-1 mb-1 text-sidebarText cursor-pointer hover:bg-sidebarText hover:text-gray-800 rounded"><p>{item}</p></div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
        </>
        
    )
}

export const SortTask = ({
    setSortList,
    sortList,
    taskOptions,
    type
}: {
    setSortList: Dispatch<SetStateAction<sortListProps>>,
    sortList: sortListProps
    taskOptions: any[]
    type: string
}) => {
    const [child, setChild] = useState('')
    return (
        <div className="fixed flex items-center">
            <div className="absolute left-[-280px]">
                {child === 'Menbers' && <OptionsComponent tab={emails} setSortList={setSortList} sortList={sortList} setChild={setChild} child={child} />}
                {child === 'Priority' && <OptionsComponent tab={priority} setSortList={setSortList} sortList={sortList} setChild={setChild} child={child} />}
                {child === 'States' && <OptionsComponent tab={states} setSortList={setSortList} sortList={sortList} setChild={setChild} child={child} />}
            </div>
            <div onMouseOver={(e) => {
                const target = e.target as HTMLParagraphElement
                setChild(target.innerText)
            }} style={{
                height: type === 'sort' ? 250 + 'px' : 150 + 'px'
            }} className="w-[244px] h-[250px] text-sidebarText bg-secondary border border-borderCard rounded">
                <div className="my-4 ml-4">
                    <p>option</p>
                </div>
                <div className="space-y-2">
                    {type === 'sort' ? 
                        <>
                            {taskOptions.map((item, index) => (
                                <div key={index} className="w-full px-4">
                                    <div className="w-full rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-xs">
                                        <p>{item}</p>
                                    </div>
                                </div>
                            ))}
                        </> :
                        <div>
                            {taskOptions.map((item, index) => (
                                <div key={index} className="w-full px-4">
                                    <div className="w-full flex items-center space-x-2 rounded p-1 text-sidebarText hover:bg-primary cursor-pointer text-xs">
                                        <item.icon size={16} />
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
        
    )
}
