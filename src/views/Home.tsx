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

export default function Home (){

    const [opacity, setOpacity] =useState(0);
    const [text, setText]= useState("");
    const ref = useRef<string>();
    ref.current = text;
    const [home, setHome] = useState("");

    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    dispatch(toHome());

    // adding the text adder
    let enucs: string;
    enucs = useAuthSelector(state => state.auth.enucs);

    useEffect(() => {

        setOpacity(1);
        const fullText = "comicsX is the leading society hosting contributors from all around the world. Join us explore the world of ai and comics by clicking the button below."; // The complete text to append
        let currentIndex = 0;
        setText(fullText)

    }, []);

    return (<div className='page'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className='home-1'>
                <div style={{width: '42%', background:'var(--primary)', left:0, display:'flex', zIndex:15,justifyContent:'center', alignItems:"center",
                    overflow:'auto'}} className='left-sider'>
                    <div id='console' style={{transition:'0.8s ease', opacity:opacity}}>
                        <div style={{  display:"flex", alignItems:'center', justifyContent:'center'}}>
                            <div style={{margin:'20px', display:'flex'}}>
                                <div className='circle back-red'></div>
                                <div className='circle back-pink'></div>
                                <div className='circle back-white' ></div>
                            </div>
                        </div>
                        <div style={{paddingLeft:'40px', paddingRight:'20px'}}>
                            <p className='web-console' style={{margin:'7px'}}><span style={{color:'grey'}}>{'>>'}</span> Hello <span className='red'>World
                            </span></p>
                            <p className='web-console small'>........</p>
                            <p className='web-console small'>{'<'} Let <span className='red'>me</span> introduce your <span style={{color:'grey'}}>journey
                            </span> with Com<span
                            className='red'
                            >icsX</span>{'>'}</p>
                        </div>
                    </div>
                </div>

                <div style={{textAlign:"center",transition:'1.2s ease', opacity:opacity, zIndex:5}} className='left-sider'>
                    <div className='home-cour'>

                    </div>
                    <div className='full' style={{width:'60%', position:"absolute", minHeight:'50px', overflow:"auto", display:'flex', alignItems:'center'}} >
                        <div style={{margin:"auto", top:'auto'}}>
                            <p className='enucs' >{'['}com<span className='red'>icsX</span>{']'}</p>
                            <div style={{border:'3px', borderStyle:'solid', marginLeft:'22%', padding:'20px', marginRight:'22%',width:'auto',
                                borderRadius:'0px 82px 0px 0px',  transition:'0.4s ease', minHeight:113, alignSelf:'center'
                            }}>
                            <p className='text-shadow hider' style={{width:'60%', margin:"auto", transition:'0.4s ease '}}>
                                {text}
                            </p><br/>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <button className='redx shRed' style={{width:'200px',padding:'10px'}} onClick ={
                                ()=>{ //onCLick
                                    dispatch(toProfile()); //dispatch to profile
                                    dispatch(toRegister());
                                    navigate('/books');
                                }
                            }>Create a Book Now</button>
                            <br/><br/>
                            <button className='orangex shOrange' style={{width:'200px',padding:'10px'}}
                            onClick={()=>{
                                dispatch(toProfile()); //dispatch to profile
                                dispatch(toRegister());
                                navigate('/profile');
                            }}
                            >Join Annex</button>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{position:'relative', zIndex:6}}>
                <MobileHome/>
            </div>


            <br/>

            <div style={{background:'var(--primary)', opacity:opacity}}>
            <div style={{zIndex:19,marginTop:-2,
                background:'var(--primary)' ,position:'relative', padding:'0px', width:'100%'}}>

                <img  style={{width:'100%', height:'auto'}} src={shelbyS}>

                </img>

            </div>
                <br/>
                <br/>
            <div style={{zIndex:19,marginTop:-2,
                background:'var(--primary)' ,position:'relative', padding:'0px', width:'100%'}}>

                <img  style={{width:'100%', height:'auto'}} src={girlS}>

                </img>

            </div>

                <br/>
                <br/>
            <div style={{zIndex:19,marginTop:-2,
                background:'var(--primary)' ,position:'relative', padding:'0px', width:'100%'}}>

                <img  style={{width:'100%', height:'auto'}} src={beachS}>

                </img>

            </div>
            </div>
            <div style={{zIndex:9, height:'auto', background:'var(--primary)', marginTop:-2 ,position:'relative', padding:'30px'}}>
                <br/>
                <div style={{display:'flex', alignItems:'center', width:"100%", alignContent:'center', justifyContent:"center"}}>
                    <p style={{color:"#aaa", fontSize:23, fontWeight:"bold"}}>We Offer</p>
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
            </div>
        </div>

    );
}
function addText(arg0: string): any {
    throw new Error("Function not implemented.");
}

