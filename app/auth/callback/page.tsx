"use client"
import React from "react"
import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"

function Callback () {
    const {fetchUserInfo} = useAuth()
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (code) fetchUserInfo(code)

    }, [code])
    return <div>Authentificating...</div>
}

export default Callback
