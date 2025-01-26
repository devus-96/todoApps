import { useRef } from "react"

export const useCanvas = (canvas: HTMLCanvasElement | null) => {
    const ground = useRef<number[][]>([
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [1,2,3,4,5,6,7,8,9,10,11,12],
    ])

    function Draw () {
        const context = canvas?.getContext('2d')

        for (let i = 0; i <= ground.current.length-1; i++) {
            for (let j = 0; j <= ground.current[i].length-1; j++) {
                if (context) {
                    context.shadowColor = '#bebebe';
                    context?.strokeRect(200*i, 100*j, 200, 100)
                }
            }
        }
    }

    return {
        Draw
    }
}