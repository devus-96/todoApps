"use client"
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react"

export const useForm = (statDate: Date, deadLine: Date, starTime: string, endTime: string) => {
    const [checked, setChecked] = useState<boolean>(false)
    const emails = useRef<string[]>([])
    const [value, setValue] = useState<any>({})
    const startDateRef = useRef<HTMLInputElement | null>(null)
    const dedlineRef = useRef<HTMLInputElement | null>(null)
    const startRef = useRef<HTMLInputElement | null>(null)
    const endRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (dedlineRef.current !== null) {
            setValue({[dedlineRef.current.name]: `${format(deadLine, "ccc dd LLLL yyyy")}`})
        }
        if (startDateRef.current !== null) {
            setValue({[startDateRef.current.name]: `${format(statDate, "ccc dd LLLL yyyy")}`})
        }
        if (startRef.current !== null) {
            setValue({[startRef.current.name]: starTime})
        }
        if (endRef.current !== null) {
            setValue({[endRef.current.name]: endTime})
        }
    }, [statDate, deadLine, starTime,endTime])

    function handleChange (e: React.FormEvent | React.ChangeEvent) {
        let target = e.target as HTMLInputElement
        console.log(target.value)
        const valueChanged: Record<string, string> = {
            [target.name]: target.value,
        };
        setValue({...value, ...valueChanged})
    }

    const handleOption = (e: React.FormEvent) => {
        checked === false ? setChecked(true) : setChecked(false)
        let target = e.target as HTMLInputElement
        if (target.value) {
            const valueChanged: Record<string, string> = {
                [target.name]: target.value,
            };
            setValue({...value, ...valueChanged})
        } else {
            const valueChanged  = {
                [target.name]: !checked
             }
            setValue({ ...value, ...valueChanged})
        }
     }

     const handleEmail = (e: React.KeyboardEvent) => {
        let target = e.target as HTMLInputElement
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (e.key === "Enter") {
            if (regex.test(target.value)) {
                emails.current =  [...emails.current, target.value]
                const valueChanged: Record<string, string[]> = {
                    [target.name]: emails.current,
                };
                setValue({...value, ...valueChanged})
            } else {
                alert("email you're just entered is invalid")
            }
        }
     }

     const handleClick = (item: string) => {
        emails.current = emails.current.filter((email) => email !== item)
        const valueChanged: Record<string, string[]> = {
            email: emails.current,
        };
        setValue({...value, ...valueChanged})
     }

     return {
        handleChange,
        handleOption,
        handleEmail,
        emails,
        checked,
        value,
        startDateRef,
        dedlineRef,
        handleClick,
        startRef,
        endRef,
        setValue
     }
}