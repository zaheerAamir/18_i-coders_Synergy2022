import React from "react"

function User(){
    return(
        <>
           <div id="navbar">
                <section class="logo"></section>
                <section class="sections">
                    <li><a href="">Home</a></li>
                    <li><a href="">Contact</a></li>
                    <li><a href="">Sign In</a></li>
                    <li><a href="">About</a></li>
                </section>
            </div>
            {/* <!-- <button><i class="fa-solid fa-burger"></i></button> --> */}
            <footer id="cont_event">
                <h1>Upcomming Events</h1>
                <section class="evnts">
                    <div>
                        <p>name 1</p>
                        <p>info</p>
                        <button class="rdmre">Read more</button>
                    </div>
                    <div>
                        <p>name 1</p>
                        <p>info</p>
                        <button class="rdmre">Read more</button>
                    </div>
                    <div>
                        <p>name 1</p>
                        <p>info</p>
                        <button class="rdmre">Read more</button>
                    </div>
                    <div>
                        <p>name 1</p>
                        <p>info</p>
                        <button class="rdmre">Read more</button>
                    </div>
                    <div>
                        <p>name 1</p>
                        <p>info</p>
                        <button class="rdmre">Read more</button>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default User