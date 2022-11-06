import React from "react";
import firebase from 'firebase/compat/app'
import { auth, firestore } from './App'
import { useState } from "react"
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'


function All(props){

    return(
        <>
            <section id="Allevents">
                <div className="img-cont">
                    <img src={props.image} alt="photo" className="img-user"/>
                </div>
                <div className="info-cont">
                    <p>{props.name}</p>
                    <p className="info-para">{props.info}</p>
                    <p>{props.contact}</p>
                </div>
                <button>Register</button>
            </section>
            
        </>
    )
}

export default All