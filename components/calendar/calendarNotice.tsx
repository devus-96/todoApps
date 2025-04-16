import { popupContext } from "@/hooks/usePopup"
import { usePosition } from "@/hooks/usePosition"
import { Tasks } from "@/types/global"
import clsx from "clsx"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import React, { useContext} from "react"
import { Dispatch, SetStateAction } from "react"
import { connectContext } from "@/hooks/useConnect"

export const CalendarNotice = ({
    item,
    currentDate,
    index,
    tab,
  }: {
    item: Tasks,
    currentDate: Date,
    index: number,
    tab: Tasks[],
  }) => {
    const {handlerBoundingClientLeft, position} = usePosition()
    const {setDispatch} = useContext(popupContext)
    const { setCurrTaskDetails } = useContext(connectContext)

    return  (
      <div>
        
        {(format(currentDate, 'dd,MM,yyyy') === format(item.start_date, 'dd,MM,yyyy') && format(item.start_date, 'dd,MM,yyyy') !== format(item.deadline, 'dd,MM,yyyy')) &&
          <div onAuxClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setDispatch({calendarNotice : true})
            handlerBoundingClientLeft(e, 244, 150)
          }
          } onClick={(e) => {
            e.stopPropagation()
            const newTab = {data: tab[index]}
            setCurrTaskDetails((prev: Tasks) => {
              const newValue = {...prev, ...newTab}
              console.log(newValue)
              return newValue
            })
            setDispatch({taskdetails: true})
            //setCurrentDate && setCurrentDate(item.deadline)
            /*
            if (item.deadline.getDate() < 15) {
              window.scroll({left: 0, top: 200})
            } else {
              window.scroll({left: 0, top: 800})
            }*/
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
            const newTab = {data: tab[index]}
            setCurrTaskDetails((prev: Tasks) => {
              const newValue = {...prev, ...newTab}
              console.log(newValue)
              return newValue
            })
            setDispatch({taskdetails: true})
            //setDispatch({taskdetails: true})
            /*setCurrentDate && setCurrentDate(item.start_date)
            if (item.start_date.getDate() < 15) {
              window.scroll({left: 0, top: 200})
            } else {
              window.scroll({left: 0, top: 800})
            }*/
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
            const newTab = {data: tab[index]}
            setCurrTaskDetails((prev: Tasks) => {
              const newValue = {...prev, ...newTab}
              console.log(newValue)
              return newValue
            })
            setDispatch({taskdetails: true})
            //setDispatch({taskdetails: true})
            //setCurrentDate && setCurrentDate(item.start_date)
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