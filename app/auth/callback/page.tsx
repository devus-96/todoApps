"use client"

import { setCookie } from "cookies-next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { HTTPClient } from "@/action/https"
import axios from "axios"
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
