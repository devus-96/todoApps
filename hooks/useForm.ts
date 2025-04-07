"use client"
import { useRef, useState } from "react"
import { object, z } from "zod";

export function useForm<T>(initialValues: T , schema: any = object({})) {
    const [value, setValue] = useState<T>(initialValues);
    const emails = useRef<string[]>([]);
    const valueRef = useRef<string>('')
    const tabRef = useRef<string[]>([''])
    const [error, setError] = useState<string>('')
    
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
            valueRef.current = target.value
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
    };

    const handleClick = (item: string) => {
        emails.current = emails.current.filter((email) => email !== item);
        const valueChanged: Record<string, string[]> = {
            email: emails.current,
        };
        setValue({...value, ...valueChanged});
    }


    function cleanTable(tableau: string[]) {
        // 1. Filtrer les valeurs vides
        const valeursNonVides = tableau.filter(valeur => valeur !== "");
      
        // 2. Supprimer les doublons en utilisant un Set
        const valeursUniques = [...new Set(valeursNonVides)];
      
        return valeursUniques;
      }
        
    return {
        tabRef,
        valueRef,
        handleClick,
        handleEmail,
        value,
        error,
        setError,
        emails,
        handleChange,
        setValue,
        cleanTable
    }
}