"use client"
import React from "react"
import { useEffect } from "react"
import { get } from "@/api/user"

function Callback () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const provider = sessionStorage.getItem('provider')
    const session_state = sessionStorage.getItem('state')

    useEffect(() => {
        try {
            // Check given state against previously stored one to mitigate CSRF attack
            if (code && state && state === session_state) {
                if (provider === 'google') 
                    get(code, '/auth/google-auth.php')
                else if (provider === 'github')
                    get(code, '/auth/github-auth.php')
            } else {
                throw new Error('Invalid state')
            }
        } catch(error) {
            //setError
            window.location.assign('/auth/login')
        }
        
    }, [code, state])
    
    return <div>Authentificating...</div>
}

export default Callback
