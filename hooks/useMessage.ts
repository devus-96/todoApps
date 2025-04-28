import {AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useMessage () {
    const [getter, setGetter] = useState<unknown[]>([])
    const [message, setMessage] = useState<string>('')
    const [mood, setMood] = useState<{bg: string, text: string} | null>(null)
    const [index, setIndex] = useState(0)

    function next () {
        if (index < getter.length - 1) {
            setIndex((() => index+1))
        } else {
            setIndex(0)
        }
    }

    function prev () {
        if (index === 0) {
            setIndex(getter.length - 1)
        } else {
            setIndex((() => index-1))
        }
    }

    useEffect(() => {
        window.scroll({left: 0, top: 0})
        if (typeof getter[index] === 'object') {
            let status = getter[index] as AxiosResponse
            if (status.status) {
                switch (status.status) {
                    case 200: 
                        setMessage(status.data.message)
                        setMood({bg: "rgba(134,239,172,0.1)", text: "#16a34a"})
                        break
                    case 201: 
                        setMessage(status.data.message)
                        setMood({bg: "rgba(134,239,172,0.1)", text: "#16a34a"})
                        break
                    case 400: 
                        setMessage(status?.data)
                        setMood({bg: "rgba(253,224,71, 0.1)", text: "#ca8a04"})
                        break
                    case 403: 
                        setMessage(status?.data.message)
                        setMood({bg: "rgba(253,224,71,0.1)", text: "#ca8a04"})
                        break
                    case 500: 
                        setMessage(status?.data.message)
                        setMood({bg: "rgba(202,70,70,0.1)", text: "#dc2626"})
                        break
                }
            }  else if (getter[index] instanceof Error) {
                setMessage(getter[index].message)
                setMood({bg: "rgba(202,70,70,0.1)", text: "#dc2626"})
            } 
        } 
        if (typeof getter[index] === 'string') {
            // cas ou on aurait une erreur venant de zod
            setMessage(getter[index])
            setMood({bg: "rgba(253,223,71,0.1)", text: "#ca8a04"})
        }
    }, [getter, index])

    return {
        setGetter,
        message,
        mood,
        next,
        prev,
        getter
    }
}