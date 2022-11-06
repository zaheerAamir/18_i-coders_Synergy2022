import React from "react"
import firebase from 'firebase/compat/app'
/* Hook for navigation when the organizer is signed in and signed out:  */
import {useNavigate} from 'react-router-dom'
/* For Authentication:  */
import { auth } from './App'
/* For Database :  */
import { firestore } from './App'
/* Hook for Authentication:  */
import {useAuthState} from 'react-firebase-hooks/auth'
/* Hook for Database:  */
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore'
import { useState } from "react"
import Card from './card'
import All from "./All"


function Organizer(){
    const [user] = useAuthState(auth)
    if(user){
        console.log(user.uid)
    }
    /* console.log(user.uid) */
    const navigate = useNavigate()
    function Hope(){
        navigate('/')
    }
    
    function Signout(){
        return auth.currentUser && (
            auth.signOut()
        )
    }
    
    const [inputname, setinputname] = useState('')
    const [inputinfo, setinputinfo] = useState('')
    const [inputcontact, setinputcontact] = useState('')
    const [inputimage, setinputimage] = useState('')

    const eventsref = firestore.collection('events')
    
    const [arr, setarr] = useState([])
    const { serverTimestamp } = firebase.firestore.FieldValue
    const Send = async(e) => {
        e.preventDefault()
        await eventsref.add({
            uid: user.uid,
            createdAt: serverTimestamp(),
            evnt_info: inputinfo,
            evnt_name: inputname,
            evnt_contact: inputcontact,
            evnt_image: inputimage
        })
    }

    let query
    if(user){
        query = eventsref.where('uid', '==', user.uid)
    }
    
    const [value, error, loading] = useCollection(query)
     
   

        
    const Fire = () => {
        error && console.log(error)
        loading && console.log(loading)
        setarr(value.docs.map(doc => ({...doc.data(), id: doc.id})))
    }        
        
        console.log(arr)
  
    
    
    
    const hi = 'brooo'
    console.log(`${hi}`)
    
    
    return(
        <>
            <section className="organizer">Event organiser page
                {!user ? Hope() : <button onClick={Signout}>Signout</button>}
                {user ? <p>Heloo {user.displayName} 😊</p> : <p>.....</p>}
                {user ? <img src={user.photoURL} alt="User image" className="user-photo"/> : <p>no image</p>}
                
                
                <form className="Form" onSubmit={Send}>
                    <div>
                        <p className="evnt">Event name: </p>
                        <input
                            type='text'
                            placeholder='Event name'
                            className="input_name"
                            value={inputname}
                            onChange={(e) => setinputname(e.target.value)}
                            maxLength='25'
                        />
                    </div>
                    <div>
                        <p className="evnt">Event info: </p>
                        <textarea
                            placeholder="Event info"
                            className="input_info"
                            name="text"
                            value={inputinfo}
                            onChange={(e) => setinputinfo(e.target.value)}
                            rows="4"
                            cols="50"
                            maxLength='250'
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
                            maxLength='25'
                        />
                    </div>
                    <div>
                        <p className="evnt">Event Image: </p>
                        <textarea
                            name="text"
                            placeholder="Event Image Url"
                            className="input_image"
                            value={inputimage}
                            onChange={(e) => setinputimage(e.target.value)}
                            rows="4"
                            cols="50"
                        />
                    </div>
                    <button className="submt">Submit</button> 
                </form>



                <footer id="cont_event">
                    <p>Events history: </p>
                    <section className="evnts">
                        {arr && arr.map(evnt => 
                        <Card
                            name={evnt.evnt_name}
                            info={evnt.evnt_info}
                            contct={evnt.evnt_contact}
                            id={evnt.id}
                            img={evnt.evnt_image}
                        />)}
                        <button onClick={Fire}>Refresh</button>
                    </section>
                </footer>
            </section>
        </>
    )
}

export default Organizer