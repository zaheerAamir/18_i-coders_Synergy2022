import React from "react"
import firebase from 'firebase/compat/app'
/* Hook for navigation when the organizer is signed in and signed out:  */
import {useNavigate} from 'react-router-dom'
/* For Authentication:  */
import { auth } from './App'
/* For Database :  */
import { firestore, serverTimestamp } from './App'
/* Hook for Authentication:  */
import {useAuthState} from 'react-firebase-hooks/auth'
/* Hook for Database:  */
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore'
import { useState } from "react"
import Card from './card'
import { doc } from "firebase/firestore"
import { useEffect } from "react"

function Organizer(){

    const navigate = useNavigate()
    function Hope(){
        navigate('/')
    }

    function Signout(){
        return auth.currentUser && (
            auth.signOut()
        )
    }
    const eventsref = firestore.collection('events')
    const query = eventsref.orderBy('createdAt', 'desc')
    const events = useCollectionData(query)
    /* const data = [events[0] , events[3].docs.map(du => ({id: du.id}))] */
    /* console.log(events[0])
    console.log(events[3].docs.map(du => ({id: du.id}))) */
    const [bu, setbu] = useState([])
    
    const du = useCollection(query)
    function fire(e){
        e.preventDefault()
        setbu(du[0].docs.map(doc => ({...doc.data(), id: doc.id})))
        console.log(bu)
    }

   /*  useEffect(() => {
        setbu(du[0].docs.map(doc => ({...doc.data(), id: doc.id})))
        console.log(bu)
    },[] )*/

    

    const [user] = useAuthState(auth)
    const [inputname, setinputname] = useState('')
    const [inputinfo, setinputinfo] = useState('')
    const [inputcontact, setinputcontact] = useState('')
    const [inputimage, setinputimage] = useState('')

    

    const send = async(e) => {
        e.preventDefault()
        await eventsref.add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            evnt_info: inputinfo,
            evnt_name: inputname,
            evnt_contact: inputcontact,
            evnt_image: inputimage
        })
        e.reset()
    }
    const hi = 'brooo'
    console.log(`${hi}`)
    
    
    return(
        <>
            <div className="organizer">event organiser page
                {!user ? Hope() : <button onClick={Signout}>Signout</button>}
                
                <form className="Form" onSubmit={send}>
                    <div>
                        <p className="evnt">Event name: </p>
                        <input
                            type='text'
                            placeholder='Event name'
                            className="input_name"
                            value={inputname}
                            onChange={(e) => setinputname(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="evnt">Event info: </p>
                        <input
                            type='text'
                            placeholder='Event info'
                            className="input_info"
                            value={inputinfo}
                            onChange={(e) => setinputinfo(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="evnt">Contact info: </p>
                        <input
                            type='text'
                            placeholder='Email id'
                            className="input_contact"
                            value={inputcontact}
                            onChange={(e) => setinputcontact(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="evnt">Event image: </p>
                        <input
                            type='img'
                            placeholder='Event Image'
                            className="input_image"
                            value={inputimage}
                            onChange={(e) => setinputimage(e.target.value)}
                        />
                    </div>
                    <button className="submt">Submit</button>
                </form>



                <footer id="cont_event">
                    <p>Events created by you</p>
                    <section className="evnts">
                        {bu && bu.map(evnt => 
                        <Card
                            name={evnt.evnt_name}
                            info={evnt.evnt_info}
                            contct={evnt.evnt_contact}
                            id={evnt.id}
                            img={evnt.evnt_image}
                        />)}
                        <button onClick={fire}>Refresh</button>
                    </section>
                </footer>
            </div>
        </>
    )
}

export default Organizer