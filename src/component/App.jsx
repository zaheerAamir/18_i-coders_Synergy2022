import React,{ Component } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import Home from './Home'
import User from './user'
import Admin from './Admin'
import Organizer from './Organizer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'



firebase.initializeApp({
  apiKey: "AIzaSyCqChKVzvRaUp_GXboXAIwDrLXGi37Ljd8",
  authDomain: "host-2b9b1.firebaseapp.com",
  projectId: "host-2b9b1",
  storageBucket: "host-2b9b1.appspot.com",
  messagingSenderId: "526015137240",
  appId: "1:526015137240:web:38e244fde4da883519dead",
  measurementId: "G-4ECQN9GS2M"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()

class App extends Component{
    render(){
      return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/User' element={<User/>}/>
                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='/Organizer' element={<Organizer/>}/>
                </Routes>
            </BrowserRouter>
        </>
      )
    }
}

export default App
