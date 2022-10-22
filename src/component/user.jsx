import React from "react"
import {auth} from './App'
import {useNavigate} from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'

function User(){
    const navigate = useNavigate()
    function Hope(){
        navigate('/')
    }

    function Signout(){
        return auth.currentUser && (
            auth.signOut()
        )
    }
    const [user] = useAuthState(auth)
    return(
        <>
           <div id="navbar">
                <section className="logo"></section>
                <section className="sections">
                    <li><a href="">Home</a></li>
                    <li><a href="">Contact</a></li>
                    {/* {!user ? Hope() : <button onClick={Signout}>Signout</button>} */}
                    <li><a href="">About</a></li>
                </section>
            </div>
            {/* <!-- <button><i class="fa-solid fa-burger"></i></button> --> */}
            <footer id="cont_event">
                <h1>Upcomming Events</h1>
                <section className="evnts">
                    <div>
                        <p className="name">name 1</p>
                        <p className="info">info</p>
                        <button className="rdmre">Read more</button>
                    </div>
                    <div>
                        <p className="name">name 1</p>
                        <p className="info">info</p>
                        <button className="rdmre">Read more</button>
                    </div>
                    <div>
                        <p className="name">name 1</p>
                        <p className="info">info</p>
                        <button className="rdmre">Read more</button>
                    </div>
                    <div>
                        <p className="name">name 1</p>
                        <p className="info">info</p>
                        <button className="rdmre">Read more</button>
                    </div>
                    <div>
                        <p className="name">name 1</p>
                        <p className="info">info</p>
                        <button className="rdmre">Read more</button>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default User