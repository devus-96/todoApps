import { create } from "zustand"
import { setCookie } from "cookies-next"
import { HTTPClient } from "@/action/https"
import { ChangeEvent } from "react"
import axios from "axios"


type passWorldVerify = {
    passworld: string
    verify: string
} | any

type User = {
    fistname: string
    lastname: string
} | null


interface authProps {
    loading: boolean,
    error: string,
    password: passWorldVerify,
    postDatas: (url: string, datas: any) => void,
    fetchAuthUrl: () => Promise<any>;
    fetchUserInfo: (code: string) => void;
    verifyPasswrld: (e: ChangeEvent<HTMLInputElement>) => any,
    setError: (error: any) => void
}

/**
 *  useAuth
 * 
 * hook react personnalisee dans e but de gerer l'authentification de la creation 
 * j'utilise zustand pour modifier l'etat de mes variablesde facon globale des alternatives natives existe mais sont
 * compliquees a mettre en oeuvre 
 * 
 * @var loading
 * 
 * represente l'etat de chargement 
 * 
 * @var error
 * 
 * pour enregistrer les erreurs dans le but de les afficher a l'ecran
 * 
 * @function getFormDatas
 * formData: dettype FormData et represente le formulaire car j'utilise une approche non controler pour recuperer les valeurs
 * saisie dans les champs.
 * la fonction sert a recuperer les donnees.
 * 
 * @function  postDatas
 * url representant url
 * datas representant les donnees 
 * la fonction poste les donnees 
 */

export const useAuth = create<authProps>((set) => ({
    loading: false,
    error: "",
    password: {},
    postDatas(url: string, formData: FormData) {
        set((state) => ({
            loading: state.loading = true,
            error: state.error = ''
        }))
        let datas = {role: "admistrator"} as any
        for (const [key, value] of formData.entries()) {
            if (key !== "verify") {
                datas[key] = value
            }
        }
        HTTPClient().post(url, JSON.stringify(datas))
        .then((res) => {
            setCookie('authCookies', res.data.token, {
                maxAge: 24 * 60 * 60,
            });
            sessionStorage.setItem("firstname", res.data.firstname)
            sessionStorage.setItem("lastname", res.data.lastname)
            window.location.assign('/')
        })
        .catch((err) => {
            set((state) => ({error: state.error = err}))
        })
        .finally(() => {
            set((state) => ({loading: state.loading = false}))
        })
    },
    async fetchAuthUrl () {
            try {
                //localStorage.removeItem('error')
                const response = await fetch('/api/auth/google')
                const data = await response.json()
                return data.authUrl
            } catch (err: any) {
                set((state) => ({error: state.error = err}))
            }
    },
    async fetchUserInfo (code) {
        if (code) {
            axios.get(`http://127.0.0.1:8000/auth/callback.php?code=${code}`).then ((res) => {
                setCookie('authCookies', res.data, {
                    maxAge: 24 * 60 * 60,
                });
                window.location.assign('/')
            }) .catch ((err) => {
                    sessionStorage.setItem('error', err.response.data)
                    window.location.assign("/auth/login")
            })
        }
    },
    verifyPasswrld (e: ChangeEvent<HTMLInputElement>) {
        let target = e.target as HTMLInputElement
        const password = {
            [target.name] : target.value
        }
        set((state) => ({password: state.password = {...state.password, ...password}}))
    },
    setError: (error) => {
        set((state) => ({error: state.error = error}))
    }
}))