"use client"

import { useContext } from "react"
import { Message } from "../ui/message"
import { Spinner } from "../ui/spinner"
import Popup from "./popup"
import { popupContext } from "@/hooks/usePopup"

export const CommentPopUp = () => {
    const {state} = useContext(popupContext)
    return (
        <>
        {state.comment && 
        <Popup width="400px" height="h-fit" modeNight={true} popup='comment' className="rounded-lg">
            <div>
                <div className="text-sidebarText p-4 space-y-4">
                    <h1 className="text-gray-300 text-center">add comments</h1>
                    <p className="text-xs text-center">your want to write a comment to project ... at task ...</p>
                </div>
                <textarea placeholder="Ad comment" className="w-full bg-primary text-sidebarText border border-borderCard outline-none p-3 text-sm max-lg:mb-5"
                ></textarea>
                    <div className="w-1/2 float-end my-4 mr-4">
                    <button 
                        type="submit" 
                        className="w-full py-2 text-sm rounded-full bg-btnColor cursor-pointer focus:ring-2 focus:ring-blue-300 active:bg-blue-600 transition-colors duration-300 flex-center gap-4 text-gray-800"
                        onClick={() => {
                        }}>
                        <Spinner className="w-[16px] p-0" fill="#9eabe4" bg="#fff"/>Add comment
                    </button>
                </div>
            </div>
        </Popup>
        }
        </>
        
    )
}