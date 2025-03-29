"use client"
import { useRef, useState } from "react"

export const useForm = (initialValues: any = {}) => {
    const [value, setValue] = useState<Record<string,any>>(initialValues);
    const emails = useRef<string[]>([]);
    const [error, setError] = useState<unknown>()
    
    const handleEmail = (e: React.KeyboardEvent) => {
            setError('')
            const target = e.target as HTMLInputElement;
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (e.key === "Enter") {
                emails.current.forEach(email => {
                    if (email === target.value) {
                        throw new Error("already enter this emails !!! ")
                    }
                });
                if (regex.test(target.value)) {
                    emails.current =  [...emails.current, target.value];
                    const valueChanged: Record<string, string> = {
                        [target.name]: target.value,
                    };
                    setValue({...value, ...valueChanged});
                } else {
                    setError("email you're just entered is invalid")
                }
                target.value = '';
            }
    }
    const handleClick = (item: string) => {
        emails.current = emails.current.filter((email) => email !== item);
        const valueChanged: Record<string, string[]> = {
            email: emails.current,
        };
        setValue({...value, ...valueChanged});
    }
        
    return {
        handleClick,
        handleEmail,
        value,
        error,
        setError,
        emails
    }
}