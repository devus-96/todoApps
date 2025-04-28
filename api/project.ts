import { HTTPClient } from "@/lib/https";
import { ProjectType } from "@/types/global";
import { AxiosError } from "axios";

export async function createTeamsProjects (data: ProjectType) {
    const teamId = localStorage.getItem('teamId')
    return await HTTPClient().post(`http://127.0.0.1:8000/project/create`, data, {
        params: {teamId: teamId}
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err: AxiosError) => {
        return Promise.reject(err.response)
    })
}

export async function fetchTeamsProjects () {
    const teamId = localStorage.getItem('teamId')
    return await HTTPClient().get('http://127.0.0.1:8000/project/get', {
        params: {teamId: teamId}
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err: AxiosError) => {
        return Promise.reject(err.response)
    })
}