import React from "react"
import { createContext } from "react"
import { useContext } from "react"
import { useState } from "react"
import { auth } from "./App"
import { firestore } from "./App"

const moods = {
    happy: '😊',
    sad: '😭'
}
const MoodContext = createContext(moods)

function Auth() {
    const [mood , setmood] = useState(moods.happy)
    function togglemood(){
        setmood(moods.sad)
    }
    return(
        <div className="hi">
            <MoodContext.Provider value={mood}>
            <button onClick={togglemood}></button>
                <MoodEmoji/>
            </MoodContext.Provider>
        </div>
    )
}

export function MoodEmoji(){
    const mood = useContext(MoodContext)
    return(
        <>
           <p>{mood}</p>
        </>   
    )
}

export default Auth