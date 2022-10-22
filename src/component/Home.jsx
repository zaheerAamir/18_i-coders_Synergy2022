import React from 'react'
import User from './user'
import firebase from 'firebase/compat/app'
import { auth } from './App'
import { firestore } from './App'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useNavigate} from 'react-router-dom'
import { collection } from 'firebase/firestore'

function Home(){
    const navigate = useNavigate()
    function nope(){
        navigate('/User')
    }
    {/* {user ? nope() : <button onClick={signin}>Sign in as User</button>} */}

    function org(){
        navigate('/Organizer')
    }

    const [user] = useAuthState(auth)
    function signin(){
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })
        auth.signInWithPopup(provider)
    }

    
    
    return(
        <>
           <div id="navbar">
                <section className="logo">AAAAAAAAAAA</section>
                <section className="sections">
                    <li><a href="">Home</a></li>
                    <li><a href="">Contact</a></li>
                    <li><a href="">About</a></li>
                    {user ? org() : <button onClick={signin} className='sign_in'>Sign in as Event organizer </button>}
                </section>
            </div>
            
            
        </>
    )
}

export default Home