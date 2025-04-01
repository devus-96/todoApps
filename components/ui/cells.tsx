"use client"
import React  from "react";
import { tabTask, task } from "@/types/task";
import { ProjectType } from "@/types/project";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import { connectContext } from "@/hooks/useConnect";
import { popupContext } from "@/hooks/usePopup";
interface Props {
    pastVerify: boolean
    time: number,
    handleClick: (time: number) => void
    isCurrentDate?:boolean
    futureVerify: boolean
    data?: task
    project?: ProjectType[]
    currentDate: Date,
    setCurrentDate?: Dispatch<SetStateAction<Date>>
    className?: string
    cellsClass? : string
  }

const Cell:React.FC<Props> =  ({
    pastVerify,
    time,
    handleClick,
    isCurrentDate,
    futureVerify,
    data,
    project,
    currentDate,
    setCurrentDate,
    className = 'flex flex-col select-none transition-colors h-[80px] ', 
    cellsClass = clsx(
      "pt-1 pb-1 px-5 w-full h-full",
      {
        "bg-btnColor" : isCurrentDate,
        "text-[#6b6b6b]" : pastVerify,
        "text-gray-200 hover:bg-[#6b6b6b] cursor-pointer" : futureVerify
      }
    )
}) =>  {
    const {setDispatch} = useContext(popupContext)
    const {dateValue, setFormTask, formTask} = useContext(connectContext)
    const {indexes, setGroupFormTask, action, setFormProject, formProject} = useContext(connectContext)
    function handleAction (action: string) {
        switch (action) {
          case "task": 
              if (dateValue === 'startdate') {
                let newvalue = {'start_date': currentDate}
                setFormTask({...formTask, ...newvalue})
              } else if (dateValue === 'deadline') {
                let newvalue = {'deadline': currentDate}
                setFormTask({...formTask, ...newvalue})
              }
              setDispatch({calendar: false}) 
              break;
          case "project":
              if (dateValue === 'startdate') {
                setGroupFormTask((prevElements: tabTask[]) => {
                  // Créer une copie du tableau pour éviter de modifier l'état directement
                  const nouveauTableau = [...prevElements];
                  // Modifier la valeur de x du premier élément
                  nouveauTableau[indexes].start_date = currentDate;
                  return nouveauTableau;
                });
              } else if (dateValue === 'deadline') {
                setGroupFormTask((prevElements: tabTask[]) => {
                  // Créer une copie du tableau pour éviter de modifier l'état directement
                  const nouveauTableau = [...prevElements];
                  // Modifier la valeur de x du premier élément
                  nouveauTableau[indexes].deadline = currentDate;
                  return nouveauTableau;
                });
              }
              setDispatch({calendar: false}) 
              break;
          case "fill project value":
            if (dateValue === 'startdate') {
              let newvalue = {'start_date': currentDate}
              setFormProject({...formProject, ...newvalue})
            } else if (dateValue === 'deadline') {
              let newvalue = {'deadline': currentDate}
              setFormProject({...formProject, ...newvalue})
            }
            setDispatch({calendar: false}) 
            break;
        }
    }
    return (
        <div
        className={className}>
        <div
          key={time}
          onClick={() => {
            !pastVerify ? handleClick(time) : alert("vous ne pouvez pas programmer un date dans le passe")
            handleAction(action)
            setCurrentDate && setCurrentDate(currentDate)
          }}
          className={cellsClass}
        >
          <p className="text-left text-sm font-medium">{time}</p>
        </div>
      </div>
    )
}

export default Cell