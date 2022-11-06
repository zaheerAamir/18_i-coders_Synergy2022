import React from "react"
import firebase from 'firebase/compat/app'
import {auth, firestore} from './App'
import { useState } from "react"
import { doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore"
import {useAuthState} from 'react-firebase-hooks/auth'


function Card(props){
    const [user] = useAuthState(auth)
    const [evnts, setevnts] = useState([])
    
    const [name, setname] = useState(props.name)
    const [info, setinfo] = useState(props.info)
    const [contct, setcontct] = useState(props.contct)

    const eventsref = firestore.collection('events')

    const editname = async(e) => {
        e.preventDefault()
        const newfield = {evnt_name: name}
        const userDoc = doc(firestore, 'events', props.id)
        console.log(userDoc)
        await updateDoc(userDoc,newfield)
            .then((Sucess) => {console.log(Sucess)})
            .catch((err) => {console.log(err)})
    }

    const editinfo = async(e) => {
        e.preventDefault()
        const newfield = {evnt_info: info}
        const userDoc = doc(firestore, 'events', props.id)
        await updateDoc(userDoc,newfield)
    }

    const editcontct = async(e) => {
        e.preventDefault()
        const newfield = {evnt_contact: contct}
        const userDoc = doc(firestore, 'events', props.id)
        await updateDoc(userDoc, newfield)
    }
    

    const deletedocmt = async(id) => {
        const docref = doc(firestore, 'events', id)
        console.log(docref)
        await deleteDoc(docref)
    }


    const [openname, setopenname] = useState(false)
    const [openinfo, setopeninfo] = useState(false)
    const [opencontct, setopencontct] = useState(false)

    function clickHandlername(){
        setopenname(!openname)
    }

    function clickHandlerinfo(){
        setopeninfo(!openinfo)
    }

    function clickHandlercontct(){
        setopencontct(!opencontct)
    }
            

    return(
        <>
            <div className='card'>
                <button onClick={() => {deletedocmt(props.id)}}>DELETE</button>

                <div className="img-container">
                    <img src={props.img} alt="" className="img-org"/> 
                </div> 



                <section id="container">
                    <div className="title-container">
                        <form onSubmit = {editname} className={`edit-title ${openname ? 'edit-active' : ''}`} >
                            <textarea value={name} onChange={(e) => setname(e.target.value)} rows="3" cols="30"/>
                            {/* <input value={name} onChange={(e) => setname(e.target.value)}/>  */}
                            <button >Edit</button> 
                        </form>
                        <p className="name">{props.name}</p>
                        <button className="update" onClick={clickHandlername}>Update Event name</button>
                    </div>


                    <div className="info-container">
                        <form onSubmit = {editinfo} className={`edit-info ${openinfo ? 'edit-info-active' : ''}`} >
                            <textarea value={info} onChange={(e) => setinfo(e.target.value)} rows="3" cols="30"/>
                            {/* <input value={info} onChange={(e) => setinfo(e.target.value)}/>  */}
                            <button>Edit</button> 
                        </form>
                        <p className="info">{props.info}</p>
                        <button className="update" onClick={clickHandlerinfo}>Update Event info</button>
                    </div>


                    <div className="contct-container">
                        <form onSubmit = {editcontct} className={`edit-contct ${opencontct ? 'edit-contct-active' : ''}`} >
                            <textarea value={contct} onChange={(e) => setcontct(e.target.value)} rows="3" cols="30" maxLength='50'></textarea>
                            {/* <input value={contct} onChange={(e) => setcontct(e.target.value)}/>  */}
                            <button>Edit</button> 
                        </form>
                        <p className="contct">{props.contct}</p>
                        <button className="update" onClick={clickHandlercontct}>Update Contact info</button>
                    </div>
                </section>

            </div>
        </>
    )
}


export default Card