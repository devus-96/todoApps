"use client"
import React from "react"
import { useContext, useRef, useState } from "react"
import { object, z } from "zod";
import { connectContext } from "./useConnect";
import { ProjectType, Tasks } from "@/types/global";

export function useForm(initialValues: any , schema: z.AnyZodObject | any = object({})) {
    const [value, setValue] = useState(initialValues);
    const emails = useRef<string[]>([]);
    const [error, setError] = useState<string>('')
    const {indexes} = useContext(connectContext)
    
    const handleEmail = (e: React.KeyboardEvent) => {
            setError('')
            let boubleEmail = false
            const target = e.target as HTMLInputElement;
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (e.key === "Enter") {
                emails.current.forEach(email => {
                    if (email === target.value) {
                        boubleEmail = true
                    }
                })
                if (!boubleEmail) {
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
                } else {
                    let err = new Error("already enter this emails !!! ").message
                    setError(err)
                }
            }
    }

    const handleChange = (e: React.FormEvent): void => {
            const target = e.target as HTMLInputElement;
            const valueChanged: Record<string, string> = {
              [target.name]: target.value,
            };
            if (Array.isArray(value)) {
                if (indexes) {
                    setValue((value: any) => {
                        const nouveauTableau = [...value];
                        nouveauTableau[indexes] = {...nouveauTableau[indexes], ...valueChanged}
                        return nouveauTableau;
                    });
                }
            } else {
                setValue((values: any) => ({ ...values, ...valueChanged }));
                if (schema) {
                    try {
                        schema.parse(target.value);
                        setError(''); // Réinitialise le message d'erreur si la validation réussit
                      } catch (error) {
                        if (error instanceof z.ZodError) {
                            setError(error.errors[0].message);
                        }
                      }
                }
            }
    };

    const handleClick = (item: string) => {
        emails.current = emails.current.filter((email) => email !== item);
        const valueChanged: Record<string, string[]> = {
            email: emails.current,
        };
        setValue({...value, ...valueChanged});
    }

    function handleFilter (e: React.ChangeEvent, store: any[] | null) {
        if (store) {
            let target = e.target as HTMLInputElement;
            if (target.value === '') {
                setValue(store)
            } else {
                setValue(() => {
                    const newtab = [...store]
                    const tab = newtab.filter((item) => {
                        return target.value.toLowerCase() === item.name.slice(0, target.value.length).toLowerCase()
                    })
                    return tab
                })
            }
        }   
    }

    function verifyDate (value: any) {
        if (new Date(value.start_date).getTime() > new Date(value.deadline).getTime()) {
            throw new Error('check your date! start date is greatter than deadline')
        }
    }

    function validate() {
        return schema.parse(value);
    }

    function verifyTasksDate (project: ProjectType, task: Tasks) {
        const startdate = new Date(task.start_date).getTime()
        const deadline = new Date(task.deadline).getTime()
        const projectstart = new Date(project.start_date).getTime()
        const projectend = new Date(project.deadline).getTime()
        if (startdate < projectstart || projectend < startdate) 
            throw new Error('invalid date, check task date is beetween project start date and deadline')
        if (deadline < projectstart || projectend < deadline) 
            throw new Error('invalid date, check task date is beetween project start date and deadline')
    }

    function submit(callback?: (values: any) => Promise<any>) {
        try {
            verifyDate(value)
            validate()
            if (callback !== undefined) {
                return callback(value).then((res) => {
                    return Promise.resolve(res)
                }).catch((error) => {
                    return Promise.reject(error)
                })
            }
            return Promise.resolve(value)
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                return Promise.reject(err.errors[0].message)
            }
            return Promise.reject(err)
        }
      }

    return {
        handleClick,
        handleEmail,
        value,
        error,
        setError,
        emails,
        handleChange,
        setValue,
        handleFilter,
        submit,
        verifyDate,
        verifyTasksDate
    }
}