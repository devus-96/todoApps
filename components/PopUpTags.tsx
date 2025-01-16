"use client"
import React from "react"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { taskContext } from "@/hooks/useTask";
import { useContext } from "react";
import clsx from "clsx";

function PopUpTags ({state, children}: {state: string, children: React.ReactNode}) {
    const {setDispatch} = useContext(taskContext)
    return <section onClick={() => {
    }} className={clsx({
                        'hidden' : state === '',
                        'popup' : state !== ''
                })}>
            <IoIosCloseCircleOutline 
              size={50} color='#fff' 
              className='closePopup' 
              onClick={() => setDispatch({ calendar: '',clock: '', custom: '',})}
            />
              {children}
            </section>
}

export default PopUpTags