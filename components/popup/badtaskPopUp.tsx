"use client"

import Popup from "./popup"

const BadTaskComponent = () => {
    sessionStorage.getItem("badtask")
    return (
        <Popup width="400px" height="auto" modeNight={true} popup='invitation' className="rounded-lg">
            <section className="">

            </section>
        </Popup>
        
    )
}