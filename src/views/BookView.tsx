import React, {PropsWithChildren, useEffect, useState} from "react";
import {Provider, useSelector} from "react-redux";
import loginStore from "../redux/stateStores/loginStore";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../redux/hook";
import {toLogin, toProfile, toRegister} from "../redux/authState";
import axios from "axios";
import {type} from "os";
import {useNavigate, useParams} from "react-router-dom";
import box from '../assets/box.png';
import sce from '../assets/scene.png';
import {blob} from "stream/consumers";
import load from '../assets/loading.gif';


const BookView: React.FC= ()=>{
    let {bid} = useParams();
    let [img , setImg] = useState(box);
    let [opacity, setOpacity] = useState(0);
    const [index, setIndex ] = useState(-1);
    let [title, setTitle] = useState("Title Here")
    let [text, setText] = useState("");
    let [max, setMax] = useState(0);
    let [opa, setOpa] = useState(0);
    let [likes, setLikes] = useState(0);
    const addLike = () => {
        fetch('/api/authed').then(res => res.text()).then(id =>{
            if (id){
                const form: FormData = new FormData();

                form.append('uid', id)
                form.append('bid', bid!) // must exist
                axios.post('/api/addlike/', form).then(res => {alert(`${res.data}`)

                }).catch()
            }
        }).catch()
    }
    const update = ()=>{
        fetch(`/api/getscene/${bid}/${index}`).then(res => res.json()).then(
            data =>{
                console.log(`/api/getscene/${bid}/${index}:: ${data}`)
                let iUrl = data.img;
                let text_data = data.text;
                setText(text_data);
                if (iUrl){
                    fetch(`/api/getscene-image/${bid}/${iUrl}`).then(res => res.blob()).then(
                        simg =>{
                            if (simg.size !== 0){

                                const surl = window.URL.createObjectURL(new Blob([simg]))
                                setImg(surl)
                            }
                        }
                    ).catch()
                }
            }
        ).catch()
    }

    const incrementIndex = () =>{

        if (index < max -1) {
            setOpa(0)
            setIndex(prev => prev + 1); // add one
        }
    }

    const decrementIndex = () =>{
        if (index >0) {
            setOpa(0)
            setIndex(prev => prev - 1); // add one
        }
    }

    useEffect(()=>{
        fetch(`/api/getbook/${bid}`).then(res=>res.json()).then(data =>
            {
                fetch(`/api/getscene-latest/${bid}`).then(res=>res.json()).then(data=> {
                    // console.log(data.index+1)
                    setMax(data.index+1)
                })

                setTitle(data.title)
                fetch(`/api/getimage/${bid}`).then(res => res.blob()).then(img=>{
                    console.log(img)
                    if (img.size !== 0){

                        const url = window.URL.createObjectURL(new Blob([img]))
                        setImg(url)

                    }
                }).catch()

                if (index >=0){
                    update()
                }
            }
        ).catch()
        fetch('/api/authed').then(res => res.text()).then(id =>{
            let form : FormData = new FormData()
            form.append('bid', bid!)
            form.append('uid', id)
            axios.post('/api/getlikes/', form).then(res => res.data).then(data => {
                setLikes(data['likes'])
            }).catch()
        }).catch()
        setOpacity(1)
        setOpa(1)
    },[index, max])

    return (
        <div className='page' style={{ transition:'0.6s ease', opacity:opacity, backgroundColor:'var(--primary)'}}>
            <div style={{width:'100%', height:'100%', display:'flex', flex:2}}>
                <div className='divider-page-loss' style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                    {(img !== box) ?
                        <img src={img} className='img-side'/>: <img src={box} width={150} style={{borderRadius:75,
                            boxShadow:'0px 20px 26px rgba(0,0,0,0.3)'}} />
                    }
                </div>
                <div className='divider-page' >
                    {
                        index < 0 ? <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center',
                            alignItems:'center'}}>
                            <div>
                                {(img !== box) ?
                                    <img src={img} height={300} className='img-side appearer' />: <img src={box} width={150}
                                                                                                       style={{borderRadius:75,
                                                                                                           boxShadow:'0px 20px 26px rgba(0,0,0,0.3)'}} />
                                }
                                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:30}}>
                                    <p className='enucs' style={{fontSize:34, maxWidth:500, textAlign:'center'}}>{title}</p>
                                </div>
                                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:30}}>
                                    <img src={sce} height={300} style={{margin:'auto'}}/>
                                </div>
                                <br/>
                                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:30,}}>
                                    <button className='redx shRed' style={{padding:20}} onClick={()=> incrementIndex()}>Read Scenes Now</button>
                                    <button className='bluex shBlue' style={{padding:20, marginLeft:20}} onClick={()=> addLike()}>Like Book</button>
                                </div>
                                <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:30,}}>
                                    <p>👏🏻: {likes}</p>
                                </div>
                                <div style={{margin:40}}></div>
                            </div>
                        </div> : <div style={{width:'100%', height:'calc(100% - 20px)', textAlign:'center', overflowY:'auto'}}>
                            {(img !== box) ?
                                <img src={img} height={300} className='img-side appearer' />: <img src={box} width={150}
                                                                                                   style={{borderRadius:75, boxShadow:'0px 20px 26px rgba(0,0,0,0.3)'}} />
                            }
                            {text.length !== 0 ? <p style={{margin: '30px', lineHeight: 1.9,color:'#ddd' ,letterSpacing: 0.6,
                                transition:'0.6s ease', opacity:opa
                                }}> {text}</p>:
                                <div style={{width:'100%', display:'flex', flex:1, justifyContent:'center', height:200, alignItems:'center'}}>
                                    <img src={load} width={60} />
                                </div>
                            }
                            <button className='redx shRed' style={{width:40, marginRight:30, borderRadius:30, height:40, padding:0}}
                                    onClick={decrementIndex}> {' < '} </button>
                            <button className='orangex shOrange' style={{width:40 , borderRadius:20, height:40, padding:0}}
                                    onClick={incrementIndex
                            }> {' > '} </button>
                            <div style={{margin:30}}></div>
                            <button className='highlight-dark' onClick={()=>setIndex(-1)}>Back to Book</button>

                        </div>
                    }
                </div>
            </div>
        </div>);

}

export default BookView
