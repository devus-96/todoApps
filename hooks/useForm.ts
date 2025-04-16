"use client"
import React from "react"
import { useContext, useRef, useState } from "react"
import { object, z } from "zod";
import { connectContext } from "./useConnect";

export function useForm(initialValues: any , schema: any = object({})) {
    const storeValue = useRef(initialValues)
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

    function handleFilter (e: React.ChangeEvent) {
            let target = e.target as HTMLInputElement;
            if (target.value === '') {
                setValue(storeValue.current)
            } else {
                setValue(() => {
                    const newtab = [...storeValue.current]
                    const tab = newtab.filter((item) => {
                        return target.value.toLowerCase() === item.name.slice(0, target.value.length).toLowerCase()
                    })
                    return tab
                })
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
        storeValue
    }
}