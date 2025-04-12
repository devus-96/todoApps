import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import clsx from "clsx"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import React, { useContext, useEffect } from "react"
import { Dispatch, SetStateAction } from "react"

export const CalendarNotice = ({
    setCurrentDate,
    item,
    currentDate,
    setPosition
  }: {
    setCurrentDate?: Dispatch<SetStateAction<Date>>
    item: Tasks,
    currentDate: Date,
    setPosition: React.Dispatch<SetStateAction<{
        x: number;
        top: number;
    }>>
  }) => {
    const {handlerBoundingClientLeft, position} = usePosition()
    const {setDispatch} = useContext(popupContext)
    useEffect(() => {
        setPosition(position)
    }, [position])
    return  (
      <div>
        {(format(currentDate, 'dd,MM,yyyy') === format (item.start_date, 'dd,MM,yyyy') && format(item.start_date, 'dd,MM,yyyy') !== format(item.deadline, 'dd,MM,yyyy')) &&
          <div onAuxClick={(e) => {
            e.preventDefault()
            setDispatch({calendarNotice : true})
            handlerBoundingClientLeft(e, 244, 150)
          }
          } onClick={(e) => {
            e.stopPropagation()
            setCurrentDate && setCurrentDate(item.deadline)
          }}
           className={clsx("flex items-center text-xs text-start mb-2 cursor-pointer bg-btnColor text-gray-800 overflow-hidden")}>
            <div>
              <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p> 
              <div className="flex items-center">
                <p>{format (item.start_date, 'dd/MM/yyyy')}</p>
                <ArrowRight size={10}/>
                <p>{format (item.deadline, 'dd/MM/yyyy')}</p>
              </div>
            </div>
          </div>}
          {(format(currentDate, 'dd,MM,yyyy') === format (item.deadline, 'dd,MM,yyyy') && format(item.start_date, 'dd,MM,yyyy') !== format(item.deadline, 'dd,MM,yyyy')) &&
          <div onClick={(e) => {
            e.stopPropagation()
            setCurrentDate && setCurrentDate(item.start_date)
          }}
           className={clsx("flex items-center text-xs text-start mb-2 cursor-pointer bg-red-400 text-gray-800 overflow-hidden")}>
            <div>
              <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p> 
              <div className="flex items-center">
                <p>{format (item.start_date, 'dd/MM/yyyy')}</p>
                <ArrowRight size={10}/>
                <p>{format (item.deadline, 'dd/MM/yyyy')}</p>
              </div>
            </div>
          </div>}
          {(format(currentDate, 'dd,MM,yyyy') === format (item.deadline, 'dd,MM,yyyy') && format(item.start_date, 'dd,MM,yyyy') === format(item.deadline, 'dd,MM,yyyy')) &&
          <div onClick={(e) => {
            e.stopPropagation()
            setCurrentDate && setCurrentDate(item.start_date)
          }}
           className={clsx("flex items-center text-xs text-start mb-2 cursor-pointer bg-orange-400 text-gray-800 overflow-hidden")}>
            <div>
              <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p> 
              <div className="flex items-center">
                <p>{item.start_time}</p>
                <ArrowRight size={10}/>
                <p>{item.end_time}</p>
              </div>
            </div>
          </div>}
      </div>
      
    )
  }