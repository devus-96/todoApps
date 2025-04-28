import { HTTPClient } from "@/lib/https";
import { setCookie } from "cookies-next";

type form = {
    [key: string]: FormDataEntryValue
}

/**
 * La fonction pointe vers un fichier dans le projet.
 * @returns Retourne l'url vers un page cree par google pour l'auth
 */
export async function getGoogleAuthUrl () {
    try {
        const response = await fetch('/api/auth/google')
        return await response.json()
    } catch (err: any) {
        return err
    }
}
/**
 * La fonction pointe vers un fichier dans le projet.
 * @returns Retourne l'url vers un page cree par github pour l'auth
 */
export async function getGithubAuthUrl () {
    try {
        const response = await fetch('/api/auth/github')
        return await response.json()
    } catch (err: any) {
        return err
    }
}
/**
 * 
 * @param code 
 * @param url 
 */
export async function get (code: string, url: string) {
    if (code) {
        HTTPClient().get(url, {
            params: {code: code}
        }).then ((res) => {
            let datasString = JSON.stringify(res.data);
            let datas  = JSON.parse(datasString);
            setCookie('user_session', datas.id_token, {
                maxAge: datas.expires_in || 24*60*60,
            });
            setCookie('uerData', JSON.stringify(datas.userData))
            //window.location.assign('/')
        }) .catch ((err) => {
            console.log(err)
            //window.location.assign('/auth/login')
        })
    }
}
/**
 * 
 * @param url 
 * @param formData 
 */
export async function post (url: string, formData: FormData) {
    const datas = {} as form

    for (const [key, value] of formData.entries()) {
        if (key !== "passwordVerify") {
            datas[key] = value
        }
    }
    await HTTPClient().post(url, JSON.stringify(datas)).then((response) => {
        setCookie('user_session', response.data.token, {
            maxAge: 24 * 60 * 60,
        });
        setCookie('firstname', response.data.firstname)
        setCookie('lastname', response.data.lastname)
        window.location.assign('/users')
    })
}