// Author : Zin Lin Htun
import React, {PropsWithChildren, useEffect, useState} from "react";
import {Provider, useSelector} from "react-redux";
import loginStore from "../redux/stateStores/loginStore";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../redux/hook";
import {toLogin, toProfile, toRegister} from "../redux/authState";
import axios from "axios";
import {type} from "os";
import user from "../assets/user.png"
import {useNavigate} from "react-router-dom";

interface Props {
    name: string;
    id:string;
}

const ProfilePage: React.FC<Props>= ({name, id})=>{

    const navigate = useNavigate();
    // states
    const [uname, setName] = useState("")
    const [profession, setPro] = useState("")
    const [api, setAPI] = useState(0)
    const [pic, setPic] = useState("")
    const uid = id

    // Save Changes
    const updateDatabase = (api:number)=>{
        let picA = ""
        let unameA = document.getElementById("uname") as HTMLInputElement| null;
        let proA = document.getElementById("profession") as HTMLInputElement| null;
        let object = {uid: id, api:api, profession: proA?.value, profile_pic:picA, name:unameA?.value}
        axios.post('/api/update-user-details', object)
            .then(response => {
                alert(response.data)
            })
            .catch(error => {

            });
    }

    useEffect(()=>{
        fetch('/api/get-user-details/'+ uid).then(res=> res.json()).then(
            data =>{
                let unameA = document.getElementById("uname") as HTMLInputElement| null;
                let proA = document.getElementById("profession") as HTMLInputElement| null;
                setName(data.name);
                if (data.api != "")
                    setAPI( data.api);
                else
                    setAPI(0)
                setPic(data.profile_pic);
                setPro(data.profession);
                try{
                unameA!.value = data.name;
                proA!.value = data.profession;}
                catch (err){console.log("Annex")}
            }
        )
    },[])

    return (
      <div style={{ backgroundColor:'rgba(17,33,38,0.45)',
          borderRadius: 40,
          boxShadow: 'none',
          backdropFilter:'blur(2.6px)',
          overflow: 'auto'
      }} className="shadow-container lengify shadow-boxer">
          <div style={{padding: '20px', textAlign: 'center', justifyContent: 'center'}}>
              <div style={{width:'100%'}}>
                 <img src={user} width={100}/>
                  <p style={{color:'#eee', fontSize:18}}>Welc
                      <span style={{color:'#d02f2f'}}>ome</span> <span className="highlight-dark">{name}</span></p>
                  <br/>
                  <br/>

                  <div style={{display:"flex", alignItems:'center', justifyContent:'center', width:'100%'}}>
                      <span className="material-symbols-outlined" style={{color: '#757575'}}>book</span>
                      <input placeholder="@User's name" className='noner' style={{color:'#fff'}} id="uname"/>
                      <span><u style={{color:'#757575', fontSize:13}}>?</u></span>

                  </div>
                  <br/>

                  <div style={{display:"flex", alignItems:'center', justifyContent:'center', width:'100%'}}>
                      <span className="material-symbols-outlined" style={{color: '#757575'}}>wallet</span>
                      <input placeholder='@Your Profession ' className='noner'  style={{color:'#fff'}}  id="profession" />
                      <span><u style={{color:'#757575', fontSize:13}}>?</u></span>

                  </div>
                  <br/>


                  <br/>
                  <br/>
                  <div style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
                      <button className="bluex shBlue" style={{padding:13, marginRight:20, fontSize:13}} onClick={()=>updateDatabase(api)} >
                          Save Changes
                      </button>
                      <button className='redx shRed' style={{padding:13,  fontSize:13}} onClick={()=>{
                          fetch("/api/logout").then(res=>res.text()).then(opt => {
                              if (opt === "Sucessful Logout"){
                                  navigate('/');
                              }
                          }).catch()
                         }}>
                          Logout
                      </button>
                  </div>
                  <br/>
              </div>
          </div>
      </div>
    );
}

export default ProfilePage