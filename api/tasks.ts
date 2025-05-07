import { HTTPClient } from "@/lib/https"

export async function fetchTasks (teamId?: string){
    return await HTTPClient().get('/task/get', {
        params: teamId ? {teamId: teamId} : undefined
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}

export async function patchTeamsProjectTasks (data: unknown, taskId?: string, teamId?: string) {
    return await HTTPClient().patch(`/task/edit`, data, {
        params: {id: taskId ? taskId : undefined, teamId: teamId ? teamId : undefined}
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}

export async function createTasks (data: unknown, teamId?: string, projectId?: string) {
    HTTPClient().post(`/task/create`, data, {
        params: (teamId && projectId) ? {teamId: teamId, projectId: projectId} : undefined
    }).then((res) =>{
        return Promise.resolve(res)
    }).catch((err) => {
        return Promise.reject(err)
    })
}