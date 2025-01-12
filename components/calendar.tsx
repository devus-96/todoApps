"use client"
import {
    add,
    differenceInDays,
    endOfMonth,
    format,
    setDate,
    startOfMonth,
    sub,
    set,
    getYear,
    getMonth,
  } from "date-fns";
  import Cell from "./cells";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

export const Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
export const currentDate = () => {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const completeDate = `${day}, ${Month[month]} ${year}`
  return completeDate
}

  
  const weeks = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];
  
  type Props = {
    value?: Date;
    onChange: (date: Date) => void;
    setTrigger?: Dispatch<SetStateAction<boolean>>
  };
  
  export const Calendar: React.FC<Props> = ({ value = new Date(), onChange, setTrigger }) => {
    let Realtime = new Date().getTime()
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;
    
    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonthEnd = endOfMonth(sub(value, { months: 1 })).getDate()
    const nextMonthStart = startOfMonth(add(value, { months: 1 })).getDate()
  
    const prevMonth = () => onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange(add(value, { months: 1 }));
    
    const handleClickDate = (index: number) => {
      const date = setDate(value, index);
      onChange(date);
      setTrigger && setTrigger(false)
    };
    const handleClickPrev = (index: number) => {
      let date = setDate(value, index);
      let prevMonthDay = set(value, {year: getYear(date), month: getMonth(date) - 2, date: index})
      onChange(prevMonthDay);
      setTrigger && setTrigger(false)
    };

    const handleClickNext = (index: number) => {
      let date = setDate(value, index);
      let  NextMonthDay = set(value, {year: getYear(date), month: getMonth(date) + 1, date: index})
      onChange(NextMonthDay);
      setTrigger && setTrigger(false)
    }

    const tab = Array.from({ length: prefixDays }).map((_, index: number) => {
        let time = prevMonthEnd - index
        return time
    })
    const tabEnd = Array.from({ length: suffixDays }).map((_, index) => {
        let time = nextMonthStart + index
        return time
      })

    return (
      <div className="w-[400px] top-0 absolute right-0 rounded font-[family-name:var(--font-jetBrains-mono)]">
        <div className="w-full flex justify-around text-white items-center py-8">
          <div onClick={prevMonth} className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center cursor-pointer">
            <Cell>{"<"}</Cell>
          </div>
          <Cell className="col-span-3">{format(value, "ccc dd LLLL yyyy")}</Cell>
          <div onClick={nextMonth} className="w-8 h-8 rounded-full text-gray-800 bg-gray-200 flex items-center justify-center cursor-pointer">
          <Cell className="">{">"}</Cell>
          </div>  
        </div>
        <div className="w-full grid grid-cols-7 pb-2">
                {weeks.map((day, index) => (
                    <p key={index} className="text-center text-xs text-white">{day}</p>
                ))}
          </div>

        <div className="grid grid-cols-7 items-center justify-center text-center">
          {tab.reverse().map((time: number, index) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) - 1, date: time})
          const isPass = curr.getTime() - Realtime < 0
          console.log(curr)
          return (
            <Cell 
            key={index}
            onClick={() => {
              if (!(isPass)) {
                handleClickPrev(time)
              } else {
                alert("vous ne pouvez pas programmer un date dans le passe")
              }
            }}
            className={clsx(
              'h-[90px] pt-1 pb-1 bg-gray-100 text-left px-2',
              {
                "bg-gray-100" : isPass 
              }
            )}
          >
            <p className="text-left text-sm  text-textcolor font-medium">{time}</p>
            </Cell>
          )
        })}
  
          {Array.from({ length: numDays }).map((_, index) => {
            const time = index + 1;
            const isCurrentDate = time === value.getDate();
            const day = value.getDate();
            const curr = set(new Date, {year: getYear(value), month: getMonth(value), date: time})
            const isPass = curr.getTime() - Realtime < 0
  
            return (
              <Cell
                key={time}
                isActive={isCurrentDate}
                onClick={() => {
                  if (!(isPass)) {
                    handleClickDate(time)
                  } else {
                    alert("vous ne pouvez pas programmer un date dans le passe")
                  }
                }}
                className={clsx(
                  "h-[90px] pt-1 pb-1 bg-gray-100 text-textcolor text-left px-2",
                  {
                    "bg-terciary text-white" : day === time && !isPass ,
                    "bg-gray-100" : isPass
                  }
                )}
              >
                <p className="text-left text-sm font-medium">{time}</p>
              </Cell>
            );
          })}
  
        {tabEnd.map((time: number) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) + 1, date: time})
          const isPass = curr.getTime() - Realtime < 0
          return (
            <Cell 
            key={time}
            onClick={() => {
              if (!(isPass)) {
                handleClickNext(time)
              } else {
                alert("vous ne pouvez pas programmer un date dans le passe")
              }
            }}
            className={clsx(
              'h-[90px] pt-1 pb-1 bg-gray-100 text-left px-2',
              {
                "bg-gray-100" : !isPass
              }
            )}
          >
            <p className="text-left text-sm text-textcolor font-medium">{time}</p>
            </Cell>
          )
        })}
          </div>
        </div>
    );
  };