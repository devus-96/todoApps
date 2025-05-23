"use client"
import React from "react";
import { format,set,getYear,getMonth,
} from "date-fns";
import Cell from "./cells";
import { useCalendar } from "@/hooks/useCalendar";
import { weeksMin } from "@/constants/task";
import clsx from "clsx";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Dispatch, SetStateAction } from "react";
import { ProjectType, Tasks } from "@/types/global";
  
  type Props = {
    className?: string
    divClass?: string
    labelClass?: string
    divClassCells?: string
    btnClass?: string
    headerClass?: string
    textColor?: string
    cellsClass?: string
    data?: Tasks[]
    project?: ProjectType[]
    showHeader?:boolean
    value?: Date;
    onChange: (date: Date) => void;
    setCurrentDate?: Dispatch<SetStateAction<Date>>
  };
  
  export const Calendar: React.FC<Props> = ({ 
    className = 'w-[400px] rounded font-[family-name:var(--font-jetBrains-mono)]',
    divClass = 'grid grid-cols-7 items-center justify-center text-center',
    labelClass = 'w-full grid grid-cols-7 pb-2 text-white text-xs text-center mb-4',
    btnClass = 'w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center cursor-pointer',
    headerClass = 'w-full flex justify-around text-white text-xs items-center py-8',
    cellsClass,
    divClassCells,
    data,
    project,
    showHeader = true,
    value = new Date(), 
    onChange,
    setCurrentDate
  }) => {
    const {
      changeDate,
      lastDayOfMonth,
      firstDaysofNextMonth,
      setToPrev,
      setToNext,
      prevMonth,
      nextMonth,
      isPassed,
      isFuture,
      numDays

  } = useCalendar(value, onChange)

    return (
      <div className={className}>
        <div className={clsx(headerClass,{
            'hidden': false
        })}>
          <div onClick={prevMonth} className={btnClass}>
            <div><IoIosArrowBack size={16}/></div>
          </div>
          <div>{format(value, "ccc dd LLLL yyyy")}</div>
          <div onClick={nextMonth} className={btnClass}>
          <div className=""><IoIosArrowForward size={16}/></div>
          </div>  
        </div>
        <div className={labelClass}>
                {weeksMin.map((day, index) => (
                    <p key={index}>{day}</p>
                ))}
          </div>

        <div className={divClass}>
          {lastDayOfMonth.reverse().map((time: number, index) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) - 1 , date: time})
          return (
            <Cell 
              key={index} 
              pastVerify={isPassed(time, curr)}  
              handleClick={setToPrev} 
              time={time} 
              futureVerify={isFuture(time, curr)}
              className={divClassCells}
              cellsClass={cellsClass}
              currentDate={curr}
              data={data}
              project={project}
              setCurrentDate={setCurrentDate}
            />
          )
        })}
  
          {Array.from({ length: numDays }).map((_, index) => {
            const time = index + 1;
            const isCurrentDate = time === value.getDate();
            const curr = set(new Date, {year: getYear(value), month: getMonth(value) , date: time})
  
            return (
              <Cell 
                key={index} 
                pastVerify={isPassed(time, curr)} 
                handleClick={changeDate} time={time} 
                isCurrentDate={isCurrentDate} 
                futureVerify={isFuture(time, curr)}
                className={divClassCells}
                cellsClass={cellsClass}
                currentDate={curr}
                data={data}
                project={project}
                setCurrentDate={setCurrentDate}
              />
            );
          })}
  
        {firstDaysofNextMonth.map((time: number, index) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) + 1 , date: time})
          return (
            <Cell 
              key={index} 
              pastVerify={isPassed(time, curr)} 
              handleClick={setToNext} time={time} 
              futureVerify={isFuture(time, curr)}
              className={divClassCells}
              cellsClass={cellsClass}
              currentDate={curr}
              data={data}
              project={project}
              setCurrentDate={setCurrentDate}
            />
          )
        })}
          </div>
        </div>
    );
  };