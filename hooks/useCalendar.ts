import { add, differenceInDays, endOfMonth, getMonth, getYear, set, setDate, startOfMonth, sub } from "date-fns";

export function useCalendar (value = new Date(), onChange: (date: Date) => void) {
    const now = new Date().getTime()
    const startMonth = startOfMonth(value).getDay();
    const endMonth = 6 - endOfMonth(value).getDay();
    const numDays = differenceInDays(endOfMonth(value), startOfMonth(value)) + 1;

    const prevMonthEnd = endOfMonth(sub(value, { months: 1 })).getDate()
    const nextMonthStart = startOfMonth(add(value, { months: 1 })).getDate()

    const prevMonth = () => onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange(add(value, { months: 1 }));

    const lastDayOfMonth = Array.from({ length: startMonth }).map((_, index: number) => {
        return prevMonthEnd - index
    })

    const firstDaysofNextMonth = Array.from({ length: endMonth }).map((_, index) => {
        return nextMonthStart + index
      })

    const changeDate = (index: number) => {
          const date = setDate(value, index);
          onChange(date);
    };

    const setToPrev = (index: number) => {
          const date = setDate(value, index);
          const prevMonthDay = set(value, {year: getYear(date), month: getMonth(date) - 1, date: index})
          onChange(prevMonthDay);
    };
    
    const setToNext = (index: number) => {
        const date = setDate(value, index);
        const NextMonthDay = set(value, {year: getYear(date), month: getMonth(date) + 1, date: index})
        onChange(NextMonthDay);
    }

    const isPassed = (time: number, curr: Date) => {
        return curr.getTime() - now < 0
    }
    const isFuture = (time: number, curr: Date) => {
        return curr.getTime() - now > 0
    }

    return {
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
    }
}