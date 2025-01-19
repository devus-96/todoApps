"use client"
import { format,set,getYear,getMonth,
} from "date-fns";
import Cell from "./cells";
import { useCalendar } from "@/hooks/useCalendar";
import { weeksMin } from "@/constants/task";
  
  type Props = {
    value?: Date;
    onChange: (date: Date) => void;
  };
  
  export const Calendar: React.FC<Props> = ({ value = new Date(), onChange }) => {
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
      <div className="w-[400px] absolute rounded font-[family-name:var(--font-jetBrains-mono)]">
        <div className="w-full flex justify-around text-white items-center py-8">
          <div onClick={prevMonth} className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center cursor-pointer">
            <div>{"<"}</div>
          </div>
          <div className="col-span-3 text-white text-sm">{format(value, "ccc dd LLLL yyyy")}</div>
          <div onClick={nextMonth} className="w-8 h-8 rounded-full text-gray-800 bg-gray-200 flex items-center justify-center cursor-pointer">
          <div className="">{">"}</div>
          </div>  
        </div>
        <div className="w-full grid grid-cols-7 pb-2">
                {weeksMin.map((day, index) => (
                    <p key={index} className="text-center text-xs text-white">{day}</p>
                ))}
          </div>

        <div className="grid grid-cols-7 items-center justify-center text-center">
          {lastDayOfMonth.reverse().map((time: number, index) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) - 1 , date: time})
          return (
            <Cell 
              key={index} 
              pastVerify={isPassed(time, curr)}  
              handleClick={setToPrev} 
              time={time} 
              futureVerify={isFuture(time, curr)}
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
            />
          )
        })}
          </div>
        </div>
    );
  };