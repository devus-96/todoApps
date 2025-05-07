"use client"
import { messageContext } from "@/hooks/useMessage"
import React, { useContext, useEffect } from "react"
import { Message } from "../ui/message"

export const GlobalErrorComponent = () => {
    const {message, mood, getter, next, prev} = useContext(messageContext)
    return (
        <>
        {message &&
        <section className="bg-secondary h-fit">
             <Message 
                 message={message} 
                 mood={mood} 
                 getter={getter}
                 next={next}
                 prev={prev}
             />
         </section>
        }
        </>
    )
}