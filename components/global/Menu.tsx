"use client"

import { popupContext } from "@/hooks/usePopup"
import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react"

export const Menu = ({
    active,
    setActive,
    children,
    dispatch
}:{
    active: boolean,
    dispatch?: string,
    setActive?: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
}) => {
     //useRef
    const menuRef = useRef<HTMLDivElement>(null)
    const {setDispatch, state} = useContext(popupContext)
    //useEffect
    useEffect (() => {
            const handlerClick = (e: MouseEvent) => {
                const target = e.target as Document
                if (!menuRef?.current?.contains(target)) {
                    setActive && setActive(false)
                    if (dispatch) {
                        const newValue = {} as {[key: string]: boolean}
                        newValue[`${dispatch}`] = false
                        setDispatch({...state, ...newValue})
                    }
                }
              }
              document.addEventListener("mousedown", handlerClick)
              return () => {
                document.removeEventListener("mousedown", handlerClick)
              }
    }, [active])
    return (
        <div ref={menuRef}>
            {children}
        </div>
    )
}