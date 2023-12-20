import React, {FormEvent, useEffect, useState} from "react";
import {Provider, useSelector} from "react-redux";
import loginStore from "../redux/stateStores/loginStore";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../redux/hook";
import {toLogin, toProfile, toRegister} from "../redux/authState";
import axios from "axios";
import {type} from "os";
import {useNavigate} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import {ClipLoader} from "react-spinners";

interface Object {
    email: string;
    password : string;
}

function Renderer (){

    const loading = require('../assets/loading.gif')
    const navigate = useNavigate();
    const registerOrLogin= (e:FormEvent,type:string)=>{
        e.preventDefault()
        console.log("Called")
        let email = document.getElementById("email") as HTMLInputElement| null;
        let password = document.getElementById("password") as HTMLInputElement| null;
        let object = {email:email?.value!,password:password?.value!}
        let post = JSON.stringify(object);


        // This is by settings
        if (type === "Register Now"){
            console.log("register")
            if ( object.password.length < 8 ){
                alert("Annex: ComicsX Suggests a longer stronger Password")
                return
            }
            axios.post('/api/register', object)
                .then(response => {
                    console.log(response.data);
                    navigate("/");
                })
                .catch(error => {
                    alert(error);
                    window.location.reload()


                });
        }
        else if (type === "Sign In to Store") {
            console.log("sign in")
            axios.post('/api/login', object)
                .then(response => {
                    console.log(response.data);
                    fetch('/api/authed').then(res => res.text()).then(id => {console.log(id)})
                    navigate("/");
                })
                .catch(error => {
                    alert(error)
                    window.location.reload()
                });
            console.log("end call")
        }
        else{
            console.log(type)
        }
    }
    let ctrl: string;
    ctrl = useAuthSelector(state => state.auth.text);
    const dispatcher = useAuthDispatch();
    dispatcher(toProfile());
    const [opacity, setOpacity] = useState(0);
    const [authed, setAuthed] = useState('')
    const [email, setEmail] = useState("");
    const [load, setLoad] = useState(true);
    useEffect(()=>{
        fetch('/api/authed').then(res => res.text()).then(id => {setAuthed(id)
            setLoad(false);
            if (id !== ""){
            fetch('/api/get-user/'+ id).then(res=>res.text()).then(email=> {
                    setEmail(email)
                    console.log(id)
                }
            ).catch()}
        }).catch()
        setOpacity(1);
    }, []);


    return (
        <div className='page' style={{backgroundColor:'var(--primary)', margin:0}}>
            <div style={{width:'100%', height:'100%', display:'flex', flex:1, position:'relative', transition:'0.6s ease', opacity:opacity, justifyContent:'center', alignItems:'center' }} className='full-bg-img-book'>

                    {!load? <div style={{display:"flex", justifyContent:"center", height:'100%',alignItems:'center'}}>{authed === "" ? <div style={{
                        background: 'rgb(240,240,240)',
                        height: '80%',
                        width: '80%',
                        maxHeight: 380,
                        maxWidth: 500,
                        minWidth: 300,
                        minHeight:350,
                        borderRadius: 30,
                        boxShadow: '2px 2px 18px 15px 0xff333333',
                        overflow: 'auto'
                    }} className="shadow-container">
                        <div style={{padding: '20px', textAlign: 'center', justifyContent: 'center'}}>
                            <div style={{display: 'flex'}}>
                                <button className='circle'
                                        style={{background: 'transparent', width: 'auto', height: 'auto', margin: 0}}
                                        onClick={() => dispatcher(toLogin())}>
                                    <span className="material-symbols-outlined" style={{color: 'grey'}}>
                                        login
                                    </span>
                                </button>
                                <button className='circle'
                                        style={{background: 'transparent', width: 'auto', height: 'auto', margin: 0}}
                                        onClick={() => dispatcher(toRegister())}>
                                    <span className="material-symbols-outlined" style={{color: '#b96a6a'}}>
                                        person_add
                                    </span>
                                </button>
                            </div>

                            <form onSubmit={(e)=>{registerOrLogin(e,ctrl)}}>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: 26}}>
                                    <span style={{color: '#aaa', fontSize: 19, marginRight: 10}}
                                          className="material-symbols-outlined">
                                         mail
                                    </span><p style={{color: '#aaa', fontSize: 14}}>Email</p>
                                </div>
                                <input placeholder='@email' className='noner' id="email"/>
                                <br/>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: 26}}>
                                        <span style={{color: '#aaa', fontSize: 19, marginRight: 10}}
                                              className="material-symbols-outlined">
                                             password
                                        </span> <p style={{color: '#aaa', fontSize: 14}}>Password</p> <span><a
                                    style={{fontSize: 13, color: '#aaa', marginLeft: 30, textDecoration: 'underline'}}>Forget Password</a></span>
                                </div>
                                <input placeholder='Ur Password' className='noner' type='password' id="password"/>
                                <button className='redx shRed' type="submit" style={{
                                    margin: 20,
                                    width: 170,
                                    paddingTop: 8,
                                    paddingBottom: 8
                                }}>{ctrl}</button>
                            </form>
                        </div>
                        </div> : <ProfilePage name={email} id = {authed}></ProfilePage>}</div> :
                        <div id = 'loading' style={{display: 'flex', justifyContent: 'center'}}>
                            <ClipLoader color={'#f146cf'} loading={true}/>
                        </div>
                    }
            </div>
            </div>

    );
}
export default function Profile () {

    // old architecture// still works
    const authed = useAuthSelector(state => state.auth.value);

    return (!authed?
           (<div className='page'>
               <Renderer/>
           </div>):(<div></div>));

}