import React from 'react'
import firebase from 'firebase/compat/app'
import { auth } from './App'
import { firestore } from './App'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import All from './All'
import logo from './images/mr.whiskerson.JPEG'  
import mailogo from './images/icons8-envelope-96.png'
import linkdnlogo from './images/icons8-linkedin-96.png'
import globelogo from './images/icons8-geography-96.png'

function Home(){
    const navigate = useNavigate()

    function org(){
        navigate('/Organizer')
    }

    const [user] = useAuthState(auth)
    /* console.log(user) */
    function signin(){
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })
        auth.signInWithPopup(provider)
    }

    console.log(user)
    const eventsref = firestore.collection('events')
    const [arr, setarr] = useState([])
    let query
    if(user == null){
        query = eventsref.orderBy('createdAt', 'desc')
    }
    


    const [value, error, loading] = useCollection(query)
    function fire(e){
        error && console.log(error)
        loading && console.log(loading)
        setarr(value.docs.map(doc => ({...doc.data()})))
    }

    const [open1, setopen1] = useState(false)
    const [open2, setopen2] = useState(false)
    const [divopen, setdivopen] = useState(false)
    const [liopen1, setliopen1] = useState(false)
    const [liopen2, setliopen2] = useState(false)
    
    function click(){
        setopen1(!open1)
        setopen2(!open2)
        setdivopen(!divopen)
        setliopen1(!liopen1)
        setliopen2(!liopen2)
    }
    
    return(
        <>
           <div id="navbar">
           {/* <div className={`nav ${divopen ? 'navact' : ''}`}></div> */}
                <section className={`logo ${divopen ? 'logoact' : ''}`} onClick={click}>
                    <div className='wrpper'>
                        <div className={`line1 ${open1 ? 'line1act' : ''}`}></div>
                        <div className={`line2 ${open2 ? 'line2act' : ''}`}></div>
                    </div>
                    <li className={`list1 ${liopen1 ? 'list1act' : ''}`}><a href='#abt'>Contact Me</a></li>
                    <li className={`list2 ${liopen2 ? 'list2act' : ''}`}><a href='#abt'>About Me</a></li>
                </section>

                {user ? org() : <button onClick={signin} className='sign_in' id='diapla'>Sign in as Event organizer </button>}


                <section className="sections">
                    <li><a href="#abt">Contact</a></li>
                    <li><a href="#abt">About Me</a></li>
                    {user ? org() : <button onClick={signin} className='sign_in'>Sign in as Event organizer </button>}
                </section>
            </div>
            
            <section id='main'>
                <div class="custom-shape-divider-bottom-1666541462">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
                </div>
            </section>
            <p>Events visible to the Users👀👀🖖✌️</p>
            <section id='boo'>
                {arr && arr.map(evnt => 
                <All
                    name={evnt.evnt_name}
                    info={evnt.evnt_info}
                    contact={evnt.evnt_contact}
                    image={evnt.evnt_image}
                />)}
            </section>
            <button onClick={fire} className='refrsh'>Refresh</button>


            <section id='abt'>
                <h2 className='me'>About me</h2>
                <div className='abt-cont'>
                    <img className='crtr-img' src={logo} alt='my img'/>
                    <div className='info-crtr'>
                        <h3>Aamir Zaheer</h3>
                        <h3>Founder / Developer</h3>
                        <div className='logos'>
                            <a href='mailto:aamirzaheer95@gmail.com'><img src={mailogo} alt='mail' className='mailogo1'/></a>
                            <a href='https://www.linkedin.com/in/aamir-zaheer-332206233/'><img src={linkdnlogo} alt='lindn' className='mailogo2'/></a>
                            <a href='https://leafy-pudding-6d0aa3.netlify.app/'><img src={globelogo} alt='portfolio' className='mailogo3'/></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home