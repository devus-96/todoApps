"use client"
import React from "react";
import { useEffect, useRef, useState } from 'react';
import { taskContext } from "@/hooks/useTask";
import { useContext } from "react";
import PopUpTags from '../PopUpTags';
import { Clock } from '../ui/clock';
import PopupProject from './popupProject';
import PopUpTask from './popupTask';
import Routine from './routine';

export const Popup = () => {
    // state call
    const [ type, setType ] = useState('start')
    const menuRef = useRef<HTMLDivElement>(null)
    const {state, setDispatch} = useContext(taskContext)
    const [output, setOutput] = useState<unknown>(null)

    useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            const target = e.target as Document
            if (!menuRef?.current?.contains(target)) {
                setDispatch({form: ''})
            }
          }
          document.addEventListener("mousedown", handlerClick)
          return () => {
            document.removeEventListener("mousedown", handlerClick)
          }
    })

    return <div ref={menuRef}>
            <PopUpTags state={state.clock}>
                <Clock type={type}/>
            </PopUpTags>
            <PopUpTags state={state.routine}>
                <Routine  setOutput={setOutput}  />
            </PopUpTags>

            {state.form === 'Project' && <PopupProject />}
            {state.form === 'Task' && <PopUpTask setType={setType} output={output}/>}
        </div>
}

 /*
 
           
            */