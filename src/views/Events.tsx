import React, {useEffect, useState} from "react";
import {Provider, useSelector} from "react-redux";
import loginStore from "../redux/stateStores/loginStore";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../redux/hook";
import { toLogin, toProfile, toRegister} from "../redux/authState";
import EventPC from "./EventViewPorts/EventPC";
import EventMobile from "./EventViewPorts/EventMobile";
import girl from '../assets/comp.png'
import jan from '../assets/jan.png'
import feb from '../assets/feb.png'
import march from '../assets/mar.png'
import {useNavigate} from "react-router-dom";
import LeaderBoard from "./LeaderBoard";

// Event page
export default function Events() {

    let ctrl: string;
    ctrl = useAuthSelector(state => state.auth.text);
    const dispatcher = useAuthDispatch();
    const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0);
    const [month, setMonth] = useState('');
    const [img, setImg] = useState(girl)

    useEffect(() => {
        setOpacity(1);
        // set current month for competition
        const currentDate = new Date();
        const monthName = currentDate.toLocaleString('en-GB', { month: 'long' });
        const rando = Math.floor(Math.random() * 4) + 1; // Generates a random integer from 1 to 4
        if (rando === 1)
            setImg(jan)
        else if (rando === 2)
            setImg(feb)
        if (rando === 3)
            setImg(march)
        if (rando === 1)
            setImg(girl)
        setMonth(monthName );
    }, []);


    return (
        <div className='page' style={{ transition:'0.6s ease', opacity:opacity, backgroundColor:'var(--primary)', }}>
            <div className='full-bg-img-book' style={{height:'calc(100% - 78px)', overflowY:'auto'}}>
                <div style={{margin:20, height:5}}></div>

                <div style={{display:'flex', width:'100%', flex:1,justifyContent:'center', marginTop:50}}>
                    <div style={{boxShadow:'0px 3px 7px rgba(249,0,255,0.6)',maxWidth:1400, height:400, width:'calc(100% - 50px)', margin:25, borderRadius:50,
                    backdropFilter:'blur(4px)', display:'flex', flex:2
                    }}>
                        <div style={{width:'50%', height:'100%', textAlign:'center', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div>
                                <div style={{ justifyContent:'center', alignItems:'center', display:'flex'}}>
                                    <p style={{fontSize:'20px', fontWeight:'bold' }}>{month} <span style={{color:'#e84b4b'}}>Competition</span></p>
                                </div>
                                <button className='redx shRed' style={{padding:10, width:150}} onClick={()=>{
                                    navigate('/eventadd/');
                                }} >Join to Compete</button>
                                <br/>
                                <button className='orangex shOrange' style={{padding:10, marginTop:20}} onClick={()=>{
                                    navigate('/eventview/');
                                }}>Check Out Others'</button>
                            </div>
                        </div>
                        <img style={{width:'50%', height:'100%', objectFit:'cover', borderRadius:'20px 50px 50px 20px'}} src={img}/>

                    </div>
                </div>

                <LeaderBoard/>
                <div style={{height:120}}></div>
            </div>
        </div>
    );
}