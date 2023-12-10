import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toProfile, toRegister} from "../redux/authState";
import {useAuthDispatch} from "../redux/hook";

export default function MobileHome (){
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    return (<div className='mobile-view'>
            <div>
                <div className='mobile-view-img' style={{ position:'absolute', zIndex:-1}}>

                </div>

                <div style={{ position:'absolute', zIndex:2, width:'100%'}}>
                    <div style={{margin:"auto", top:'auto', textAlign:'center', flex:1 , display:"flex", justifyItems:"center", alignItems:'center',
                        alignContent:'center', width:'100%', justifyContent:'center'
                    }}>
                        <div style={{height:'100%', overflow:'auto', width:'100%'}}>
                            <p className='enucs' style={{fontSize:29, marginBottom:20}} >{'{'}Ann<span className='red'>ex</span>{'}'}</p>
                            <div style={{border:'3px', borderStyle:'solid', marginLeft:'22%', padding:'20px', marginRight:'22%',width:'auto',
                              borderRadius:'0px 52px 0px 0px', borderColor:'#ff824b'
                            }}>
                            <p className='text-shadow' style={{width:'70%', margin:"auto",  fontWeight:'normal', border:'2px', textShadow:'0px 0px 3px rgba(0,0,0,0.5)'}}>
                                <b>Greetings Creators!</b> </p>
                            </div>
                                <br/>
                            <button className='redx shRed' style={{width:'200px',padding:'10px', margin:'10px', zIndex:15}}
                                    onClick={() => {
                                        dispatch(toProfile()); //dispatch to profile
                                        dispatch(toRegister());
                                        navigate('/profile');
                                    }}
                            >Explore Projects</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}