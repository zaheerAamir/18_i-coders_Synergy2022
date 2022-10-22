import React from "react"
import firebase from 'firebase/compat/app'
import {firestore} from './App'
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"


function Card(props){
    const [evnts, setevnts] = useState([])
    
    const [name, setname] = useState(props.name)
    const [info, setinfo] = useState(props.info)
    const [contct, setcontct] = useState(props.contct)

    const eventsref = firestore.collection('events')
    
    const editname = async( id) => {
        const newfield = {evnt_name: name}
        const userDoc = doc(firestore, 'events', id)
        console.log(userDoc)
        await updateDoc(userDoc,newfield).catch((err) => console.error(err))
    }

    const editinfo = async(id) => {
        const newfield = {evnt_info: info}
        const userDoc = doc(firestore, 'events', id)
        await updateDoc(userDoc,newfield)
    }

    const editcontct = async(id) => {
        const newfield = {evnt_contact: contct}
        const userDoc = doc(firestore, 'events', id)
        await updateDoc(userDoc, newfield)
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


                <div className="img-container">
                    <button>prev</button>
                    <img src={props.img} alt=""/> 
                    <button>next</button>
                </div> 



                <section id="container">
                    <div className="title-container">
                        <form onSubmit = {editname(props.id)} className={`edit-title ${openname ? 'edit-active' : ''}`} >
                            <input value={name} onChange={(e) => setname(e.target.value)}/> 
                            <button>Edit</button> 
                        </form>
                        <p className="name">{props.name}</p>
                        <button className="update" onClick={clickHandlername}>Update Event name</button>
                    </div>


                    <div className="info-container">
                        <form onSubmit = {editinfo(props.id)} className={`edit-info ${openinfo ? 'edit-info-active' : ''}`} >
                            <input value={info} onChange={(e) => setinfo(e.target.value)}/> 
                            <button>Edit</button> 
                        </form>
                        <p className="info">{props.info}</p>
                        <button className="update" onClick={clickHandlerinfo}>Update Event info</button>
                    </div>


                    <div className="contct-container">
                        <form onSubmit = {editcontct(props.id)} className={`edit-contct ${opencontct ? 'edit-contct-active' : ''}`} >
                            <input value={contct} onChange={(e) => setcontct(e.target.value)}/> 
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