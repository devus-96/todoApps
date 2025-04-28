"use client"
import { useContext, useState } from "react";
import Popup from "./popup"
import { Spinner } from "../ui/spinner";
import { popupContext } from "@/hooks/usePopup";
import { useForm } from "@/hooks/useForm";
import { TeamSchema } from "@/types/schema";
import { createTeams } from "@/api/teams";
import { Message } from "../ui/message";

export const TeamPopUp = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const {state} = useContext(popupContext)
    const teams = useForm({}, TeamSchema)
    const [error, setError] = useState<any>()

    function submit () {
        setLoading(true)
        setError('')
        teams
        .submit(createTeams)
        .then((res) => {
            console.log(res)
            //window.location.assign(`/teams/${res.data.id}`);
        })
        .catch((error: any) => setError(error))
        .finally(() => {
            setLoading(false)
        });
    }
    return (
        <>
            {state.team && (
                <Popup width="400px" height="h-fit" modeNight={true} popup='team' className="rounded-lg">
                    <Message message={error} />
                    <form action={(formData) => {
                        setLoading(true)
                    }} className="px-8 py-4 text-sidebarText">
                        <h1 className="text-sm mb-4">create new team</h1>
                        <div>
                            <label htmlFor="" className="text-xs">name</label>
                            <input 
                                type="text" 
                                name= "name"
                                value={teams.value.name}
                                onChange={(e) => teams.handleChange(e)}
                                className="py-[4px] px-4 text-sm w-full bg-primary text-sidebarText border border-borderCard rounded outline-none placeholder:text-gray-500" 
                                required/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="" className="text-xs">description</label>
                            <textarea 
                            name="description" 
                            value={teams.value.description}
                            onChange={(e) => teams.handleChange(e)}
                            className="py-[4px] w-full px-4 bg-primary text-sidebarText border border-borderCard text-sm rounded outline-none placeholder:text-gray-500"></textarea>
                        </div>
                        <button onClick={() => {
                            submit()
                        }} type="submit"className="px-2 py-[8px] w-full flex-center rounded-full text-sm btnEffect">
                            {loading && <Spinner className="w-[18px] p-0 mr-4" bg="#333" fill="#9eabe4" />}create
                        </button>
                    </form>
                </Popup>
            )}
        </>
       
    )
}