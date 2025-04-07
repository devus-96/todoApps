import { useState } from "react"

export const usePosition = () => {
    const [position, setPosition] = useState({x:-300, top:0})

    function handlerBoundingClientLeft (event: React.MouseEvent, height: number, width: number) {
        setPosition({x:-300, top:0})
        let target = event.target as HTMLDivElement
        // Récupérer les coordonnées du clic
        const y = event.clientY;
        let upordown = y  + height > window.innerHeight
        const boutonRect = target.getBoundingClientRect();
        let elementHeight = boutonRect.bottom - boutonRect.top
        if (upordown) {
            setPosition({x: (boutonRect.left - width) + elementHeight ,top: (boutonRect.top - height) + elementHeight})
        } else {
            setPosition({x: boutonRect.right - width,top: boutonRect.top})
        }
    }

    function handlerBoundingClientRight (event: React.MouseEvent, height: number) {
        setPosition({x:-300, top:0})
        const target = event.target as HTMLDivElement
        // Récupérer les coordonnées du clic
        const clientY = event.clientY;
        const upordown = clientY  + height > window.innerHeight
        const boutonRect = target.getBoundingClientRect();
        const elementHeight = boutonRect.bottom - boutonRect.top;
        if (upordown) {
            setPosition({x: boutonRect.left ,top: (boutonRect.top - height) + elementHeight})
        } else {
            setPosition({x: boutonRect.left,top: boutonRect.top})
        }
    }

    return {
        position,
        handlerBoundingClientLeft,
        handlerBoundingClientRight
    }
}