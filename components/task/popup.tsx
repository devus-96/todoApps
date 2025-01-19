"use client"
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { Calendar } from '../calendar';
import { format } from 'date-fns';
import { Select } from '../select';
import { Spinner } from '../spinner';
import { taskContext } from "@/hooks/useTask";
import { useContext } from "react";
import clsx from "clsx";
import PopUpTags from '../PopUpTags';
import { optionsRepetition } from '@/constants/task';
import { Clock } from './clock';
import Routine from './routine';
import PopupProject from './popupProject';
import PopUpTask from './popupTask';


type task = {
    name: string
    date: Date
    startTime: string
    endTime: string
    allday: boolean
    repetition: boolean | string | any[]
    description: string
}

export const Popup = () => {
    // state call
    const [ type, setType ] = useState('start')
    const data = useRef<task | any >({})
    const {state, setDispatch, handleChange} = useContext(taskContext)

    return <>
            <PopUpTags state={state.clock}>
                <Clock type={type}/>
            </PopUpTags>
            {state.form === 'Project' && <PopupProject />}
            {state.form === 'Task' && <PopUpTask setType={setType}/>}
        </>
}

 /*
 
           
            */