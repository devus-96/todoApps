"use client"
import React from "react"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { taskContext } from "@/hooks/useTask";
import { useContext } from "react";
import clsx from "clsx";
import { tabTask } from "@/types/task";

interface tagsPros {
  state: string
  children: React.ReactNode
}

function PopUpTags ({state, children}: {state: string | tabTask | null, children: React.ReactNode}) {
    const {setDispatch} = useContext(taskContext)

    return <section onClick={() => {
    }} className={clsx({
                        'hidden' : !state,
                        'popup' : state
                })}>
            <IoIosCloseCircleOutline 
              size={50} color='#fff' 
              className='closePopup' 
              onClick={() => setDispatch({ calendar: '',clock: '', custom: '', routine: '', details: null})}
            />
              {children}
            </section>
}

export default PopUpTags