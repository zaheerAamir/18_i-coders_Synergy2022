import React from 'react'
import User from './user'
import Auth from './Auth'
import firebase from 'firebase/compat/app'
import { auth } from './App'
import { firestore } from './App'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {Routes, Route, useNavigate} from 'react-router-dom'

function Home(){
    const navigate = useNavigate()
    function navigateToUser(){
        navigate('/User')
    }

    const [user] = useAuthState(auth)
    function signin(){
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    function signout(){
        return auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out</button>
        )
    }
    return(
        <>
           <div id="authcont">
                {user ? {navigateToUser} : <button onClick={signin}>Sign in as User</button>}
                <button>Sign in as Admin </button>
                <button>Sign in as Event Organizer</button>
                <Routes>
                    <Route path='/User' element={<User/>}/>
                </Routes>
           </div>
        </>
    )
}

export default Home