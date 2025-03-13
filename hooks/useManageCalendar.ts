import { eachDayOfInterval, format, getDate, getMonth, getYear, lastDayOfISOWeek, previousSunday, set } from "date-fns"
import { useRef } from "react"
import { tabTask, task } from "@/types/task"
import { separeType } from "@/types/task"
import { hoursOfDays } from "@/constants/calendar"

export function useManageCalendar (date: Date) {
     const thisSunday = format(lastDayOfISOWeek(date), "yyyy, MM, dd")
     const pastSunday = previousSunday(new Date(thisSunday))
     const thisSaturday = set(thisSunday, {year: getYear(thisSunday), month: getMonth(thisSunday), date: getDate(thisSunday) -1})
     const dayOfWeek = eachDayOfInterval({start: new Date(pastSunday), end: new Date(thisSaturday)})
     const colorOptions = useRef(['#93c5fd', '#bef264', '#fde047', '#fdba74', '#fca5a5', '#fcd34d', '#86efac', '#6ee7b7', '#5eead4', '#d8b4fe', '#f9a8d4']);
     
    function converToTime (time: string) {
        const tab = time?.split(':')
        if (parseInt(tab[0]) > 12) {
            if (parseInt(tab[0]) - 12 < 10) {
                return [`0${parseInt(tab[0]) - 12 }PM`, tab[1]]
            } else {
                return [`${parseInt(tab[0]) - 12 }PM`, tab[1]]
            }
        } else {
            return [`${tab[0]}AM`, tab[0], tab[1]]
        }
    }

    function converToMinute (startTime: string, endTime: string) {
        
        const start = startTime?.split(':')
        const end = endTime?.split(':')
        const startMin = parseInt(start[0]) * 60 + parseInt(start[1])
        const endMin = parseInt(end[0]) * 60 + parseInt(end[1])
        const result = (endMin - startMin) / 60
        if (result > 1) {
            return result
        }
        return 1

    }

    function converToText (enter: typeof hoursOfDays) {
        let tab: string[] = []
        
        for (let [key, _] of Object.entries(enter)) {
            tab = [...tab, key]
        }

        return tab
    }

    function separe (data: task) {
        if (data) {
          let tab: separeType[] = []
          for (const [key, value] of Object.entries(data)) {
            tab = [...tab, [key, value]]
          }
  
          return tab
        }
      }

      function currDate (startDate: string) {
        const currDate = format(new Date(), "dd/MM/yyyy")
        if (currDate === startDate) {
            return true
        }
      }

      function currTask (start: string, end: string, startDate: string) {
        const current = new Date().getHours() * 60 + new Date().getMinutes() 
        const currDate = format(new Date(), "dd/MM/yyyy")
        const startTask = parseInt(start?.split(':')[0]) * 60 + parseInt(start?.split(':')[1])
        const endTask = parseInt(end?.split(':')[0]) * 60 + parseInt(end?.split(':')[1])

        if ((startTask <= current) && (current <= endTask) && currDate === startDate) {
            return true
        }
        return false
      }

      function progress (end: string, start: string) {
        const current = new Date().getHours() * 60 + new Date().getMinutes() 
        const endTask = parseInt(end?.split(':')[0]) * 60 + parseInt(end?.split(':')[1])
        const startTask = parseInt(start?.split(':')[0]) * 60 + parseInt(start?.split(':')[1])

        const plage = endTask - startTask
        const plage2 = endTask - current

        return (plage2/plage) * 100
      }

      function difference (start: string, end: string) {
        const minuteStart = parseInt(start?.split(":")[0]) * 60 + parseInt(start?.split(":")[1])
        const minutesEnd = parseInt(end?.split(":")[0]) * 60 + parseInt(end?.split(":")[1])

        const difference = minutesEnd - minuteStart

        return `${(difference - (difference%60)) / 60}h${difference%60}min `

      }

      function sortByTime (start: tabTask, end: tabTask) {
        const minuteStart = parseInt(start?.start_time?.split(":")[0]) * 60 + parseInt(start?.start_time?.split(":")[1])
        const minutesEnd = parseInt(end?.start_time?.split(":")[0]) * 60 + parseInt(end?.start_time?.split(":")[1])

        return minuteStart - minutesEnd

      }

    return {
        converToMinute,
        converToTime,
        converToText,
        separe,
        dayOfWeek,
        colorOptions,
        difference,
        sortByTime,
        currTask,
        currDate,
        progress
    }
}