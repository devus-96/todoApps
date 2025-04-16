"use client"
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import { sortListProps } from "./sortTasks"
import { popupContext } from "@/hooks/usePopup"

export const OptionsComponent = (
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
     const [table, setTable] = useState(tab)
     //useRef
    const menuRef = useRef<HTMLDivElement>(null)
    const store = useRef(tab)
    //useContext
    const {setDispatch} = useContext(popupContext)
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
                            setDispatch({sortTask: false})
                            document.body.style.overflow = 'auto'
                        }} key={index} className="text-xs p-1 mb-1 text-sidebarText cursor-pointer hover:bg-sidebarText hover:text-gray-800 rounded"><p>{item}</p></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}