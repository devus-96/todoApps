"use client"
import { taskContext } from "@/hooks/useTask";
import clsx from "clsx";
import { useContext } from "react";
interface Props {
    pastVerify: boolean
    futureVerify: boolean
    handleClick: (time: number) => void
    time: number,
    isCurrentDate?:boolean
  }

const Cell:React.FC<Props> =  ({
    pastVerify,
    time,
    handleClick,
    isCurrentDate,
    futureVerify
}) =>  {
    const {setDispatch} = useContext(taskContext)
    return (
        <div
        className="flex flex-col select-none transition-colors">
        <div
          key={time}
          onClick={() => {
            !pastVerify ? handleClick(time) : alert("vous ne pouvez pas programmer un date dans le passe")
            setDispatch({ calendar: ''})
          }}
          className={clsx(
            "h-[90px] pt-1 pb-1 text-textcolor text-left px-2",
            {
              "bg-terciary text-white" : isCurrentDate && !pastVerify ,
              "bg-gray-200 text-gray-300" : pastVerify,
              "bg-gray-200 text-gray-900 hover:bg-white cursor-pointer" : futureVerify
            }
          )}
        >
          <p className="text-left text-sm font-medium">{time}</p>
        </div>
      </div>
    )
}

export default Cell