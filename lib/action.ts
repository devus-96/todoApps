import { Month, weeksMin } from "@/constants/task"

export function changeDateFormat(value:string) {
    const date = new Date(value)
    const day = date.getDay()
    const dateOfMonth = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const newDateFormat = Month[month]+` ${dateOfMonth}`+', '+`${year}`
    return newDateFormat
}