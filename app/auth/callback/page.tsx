"use client"
import React from "react"
import { useEffect } from "react"
import { get } from "@/api/user"

function Callback () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const provider = sessionStorage.getItem('provider')

    useEffect(() => {
        try {
            if (code) {
                if (provider === 'google') 
                    get(code, '/auth/google-auth.php')
                else if (provider === 'github') {
                    // détecter les attaques CSFR
                    const state = urlParams.get('state');
                    const session_state = sessionStorage.getItem('state')
                    if (state && state === session_state) {
                        get(code, '/auth/github-auth.php')
                    } else {
                        throw new Error('Erreur de sécurité : état invalide ou attaque CSFR détectée.')
                    }
                }
            }
        } catch(error) {
            //setError
            window.location.assign('/auth/login')
        }
    }, [code])
    
    return <div>Authentificating...</div>
}

export default Callback
