import { getCookie, setCookie } from "cookies-next";

export default function () {
    let token = getCookie("authCookies")
                console.log(token)
                setCookie('authCookies', token, {
                    maxAge: 24 * 60 * 60,
                  });
}