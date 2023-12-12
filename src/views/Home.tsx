import React, {useRef} from "react";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import MobileHome from "../components/MobileHome";
import {toHome, toProfile, toRegister} from "../redux/authState";
import {useAuthDispatch, useAuthSelector} from "../redux/hook";
import hero from '../assets/hero.jpg'
import girl from '../assets/girl.jpg'
import beach from '../assets/beach.jpg'
import shelby from '../assets/shelby.jpg'
import heroS from '../assets/hero.jpg'
import girlS from '../assets/girl.png'
import beachS from '../assets/beach.png'
import shelbyS from '../assets/shelby.png'
import one from "../assets/data.png";
import hun from "../assets/weka.png";
import aai from "../assets/aai.png";
import daa from  "../assets/daa.png";
import ten from "../assets/dev.png";

export default function Home (){

    const [opacity, setOpacity] =useState(0);
    const [text, setText]= useState("");
    const ref = useRef<string>();
    ref.current = text;
    const [home, setHome] = useState("");

    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    const [cn, setCN] = useState('slide-bottom');
    const [slr, setSLR] = useState('slide-right');
    dispatch(toHome());

    // adding the text adder
    let enucs: string;
    enucs = useAuthSelector(state => state.auth.enucs);

    useEffect(() => {

        setOpacity(1);
        const div = document.getElementById('slide1');
        const div2 = document.getElementById('slide2');
        setCN('slide-bottom active')
        setSLR('slide-right active')
        const fullText = "comicsX is the leading society hosting contributors from all around the world. Join us explore the world of ai and comics by clicking the button below."; // The complete text to append
        let currentIndex = 0;
        setText(fullText)

    }, []);

    return (<div className='page' style={{height:'calc(100% - 78px)'}}>
            <div className='full-bg-img-book' style={{height:'calc(100% - 78px)', overflow:"auto" }}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:50, marginBottom:70 ,transition: 'left 0.3s ease-in-out', left:0, animation: 'slide 0.5s forwards'}}>
                    <div style={{width:'100%', justifyContent:'center', textAlign:'center' ,left:0}} className={cn} id='slide1'>
                        <img src={aai} width={'78%'}/>
                        <div style={{margin:40}}></div>
                        <img src={daa} width={'78%'}/>
                    </div>
                </div>
                <div style={{textAlign:'center', width:'100%',justifyContent:'center', alignItems:'center', }} className={slr} id='slide2'>

                    <p style={{fontSize:28}}>Refine + <span style={{color:'#de4c4c'}}>Offers</span></p>
                    <div style={{width:'100%', flex:3, minWidth:300, display:'flex', justifyContent:'center',  flexDirection:'row', order:2, flexWrap:'wrap', }}>
                        <div className='orangex shOrange' onClick={()=> {

                        }}
                             style={{margin:50, marginBottom:20,letterSpacing:0.7, padding:0, paddingBottom:30, width:'26%', minWidth:300, transition:'0.4s ease',
                                 borderRadius:30
                             }}>
                            <img src={one} width={'100%'} style={{borderRadius:'30px 30px 0px 0px'}}/>
                            <p>Preparation with OpenRefine abilities</p>
                        </div>


                        <div className='redx shRed' onClick={()=> {

                        }}
                             style={{margin:50, marginBottom:20, letterSpacing:0.7, padding:0, paddingBottom:30, width:'26%', minWidth:300, transition:'0.4s ease',
                                 borderRadius:30
                             }}>
                            <img src={hun} width={'100%'} style={{borderRadius:'30px 30px 0px 0px'}}/>
                            <p>Data Analysis with Weka capabilities</p>
                        </div>

                        <div className='bluex shBlue' onClick={()=> {

                        }}
                             style={{margin:50, marginBottom:20,letterSpacing:0.7, padding:0, paddingBottom:30, width:'26%', minWidth:300, transition:'0.4s ease',
                                 borderRadius:30
                             }}>
                            <img src={ten} width={'100%'} style={{borderRadius:'30px 30px 0px 0px'}}/>
                            <p>Check Out Our Developments at Annex</p>
                        </div>

                    </div>
                </div>


            <div style={{zIndex:9, height:'auto', marginTop:-2 ,position:'relative', padding:'30px'}}>
                <br/>
                <div style={{display:'flex', alignItems:'center', width:"100%", alignContent:'center', justifyContent:"center"}}>
                    <p style={{color:"#aaa", fontSize:23, fontWeight:"bold"}}>About Us</p>
                </div>
                <div style={{flex:2, display:'flex',  height:'auto', width:'auto', justifyContent:"center", flexWrap:'wrap', order:2, flexDirection:'row'}}>

                    <div style={{borderRadius:12,background:'transparent', boxShadow:'0px 3px 6px rgba(255,128,36,0.51)',

                        height:'100%', padding:'20px', margin:'20px', color:"#ddd"}} className='wrap-text-white'>
                        <div style={{display:'flex'}}>
                            <div className='circle' style={{background:'white'}}></div><div className='circle back-red'></div>
                        </div>
                        <p>Build your world and write novels with freedom and publish to our servers as well as download to local devices.
                            "</p>
                        <p><b>Fact 1</b></p>
                    </div>

                    <div style={{borderRadius:12,background:'transparent', boxShadow:'0px 3px 6px rgba(241,77,102,0.51)',
                        height:'100%', padding:'20px', margin:'20px', color:"#ccc"}} className='wrap-text-white'>
                        <div style={{display:'flex'}}>
                            <div className='circle' style={{background:'white'}}></div><div className='circle' style={{background:'orange'}}></div>
                        </div>
                        <p>Annex's newest project after the launch of AnnexFood, this is a more optimistic project with higher scope</p>
                        <p><b>Powered by @Annex</b></p>
                    </div>

                    <div style={{borderRadius:12,background:'transparent', boxShadow:'0px 3px 6px rgba(244,87,255,0.51)',
                        height:'100%', padding:'20px', margin:'20px', color:"#ccc"}} className='wrap-text-white'>
                        <div style={{display:'flex'}}>
                            <div className='circle' style={{background:'white'}}></div><div className='circle back-pink' ></div>
                        </div>
                        <p>Use the latest embedded AI technologies from OpenAI and more to help you write stories, revise, create and generate ideas</p>
                        <p><b>With OpenAI's help</b></p>
                    </div>

                    <div style={{borderRadius:12,background:'transparent', boxShadow:'0px 3px 6px rgba(79,255,161,0.51)',
                        height:'100%', padding:'20px', margin:'20px', color:"#ddd"}} className='wrap-text-white'>
                        <div style={{display:'flex'}}>
                            <div className='circle' style={{background:'white'}}></div><div className='circle back-pink' ></div>
                        </div>
                        <p>A platform with AI assisted creativity sessions not just for comics but novels, blogs and learning tools</p>
                        <p><b>Annex Offers</b></p>
                    </div>

                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
            </div>
        </div>

    );
}
function addText(arg0: string): any {
    throw new Error("Function not implemented.");
}

