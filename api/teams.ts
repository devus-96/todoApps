import { HTTPClient } from "@/lib/https";
import { TeamType } from "@/types/global";
import { AxiosError } from "axios";

export async function createTeams (data: TeamType) {
    return await HTTPClient().post('http://127.0.0.1:8000/team/create', data)
    .then((res) =>{
        return Promise.resolve(res)
    }).catch((err: AxiosError) => {
        return Promise.reject(err.response)
    })
}

export async function getTeams () {
    return await HTTPClient().get('http://127.0.0.1:8000/team/get')
    .then((res) =>{
        return Promise.resolve(res)
    }).catch((err: AxiosError) => {
        return Promise.reject(err.response)
    })
}