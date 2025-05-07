import { HTTPClient } from "@/lib/https";
import { ProjectType } from "@/types/global";

export async function createTeamsProjects (data: ProjectType, teamId?: string) {
    let newValue = {objectifs: JSON.stringify(data.objectifs)}
    newValue = {...data, ...newValue}
    return await HTTPClient().post(`http://127.0.0.1:8000/project/create`, newValue, {
        params: teamId ? {teamId: teamId} : undefined
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}

export async function fetchTeamsProjects (teamId?: string | null) {
    return await HTTPClient().get('http://127.0.0.1:8000/project/get', {
        params: teamId !== undefined ? {teamId: teamId} : undefined
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}

export async function fetchProjects (projectId: string, teamId?:string) {
    return await HTTPClient().get('http://127.0.0.1:8000/project/search', {
        params: teamId ? {id: projectId, teamId: teamId} : {id: projectId}
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}

export async function patchTeamsProject (data: unknown,  projectId: string, teamId?:string) {
    return await HTTPClient().patch(`http://127.0.0.1:8000/project/edit`, data, {
        params: teamId ? {id: projectId, teamId: teamId} : {projectId: projectId}
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}