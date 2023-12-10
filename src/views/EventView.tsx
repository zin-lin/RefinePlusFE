import React, {PropsWithChildren, useEffect, useRef, useState} from "react";
import {Provider, useSelector} from "react-redux";
import loginStore from "../redux/stateStores/loginStore";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../redux/hook";
import {toLogin, toProfile, toRegister} from "../redux/authState";
import axios from "axios";
import {type} from "os";
import {useNavigate, useParams} from "react-router-dom";
import box from "../assets/box.png"
import book from "../assets/book.png"
import FlatList from 'flatlist-react';
import BookList from "./List";
import LeaderBoard from "./LeaderBoard";

interface Book {
    bid: string;
    title: string;
}

const EventView: React.FC= ()=>{
    type Visibility = 'visible' | 'hidden' | 'collapse';
    let [opacity, setOpacity] = useState(0);
    const [email, setEmail] = useState("");
    const [authed, setAuthed] = useState('')
    const [selfile, setFile] = useState<File|null>(null);
    const navigate = useNavigate()
    const [image, setImage] = useState("Select Cover Image")
    let [books, setBooks] = useState([])
    let [addOpacity, setAddOpacity] = useState(0)
    const [addVisibility, setAddVisibility] = useState<Visibility | undefined>('hidden')

    useEffect(()=>{
        fetch('/api/authed').then(res => res.text()).then(id => {setAuthed(id)
            if (id === ""){
                navigate('/profile') // This is to limit only users who are authenticated
            }
            else {
                fetch('/api/getbookseve/').then(
                    res=> res.json()
                ).then(list => {
                    console.log(list['list'])
                    if (list !== undefined)
                        setBooks(list['list'])
                })
            }
        }).catch()
        setOpacity(1)
    },[])



    return (
        <div className='page' style={{backgroundColor:'var(--primary)'}}>

            <div style={{width:'100%', height:'100%', display:'flex', flex:1, position:'relative', transition:'0.6s ease', opacity:opacity, }} className='full-bg-img-book' >


                <div style={{flex:2, display:'flex',  height:'100%', width:'100%', justifyContent:"center", flexWrap:'wrap', order:2, flexDirection:'row', alignItems:'center'}}>

                    <div style={{minWidth:300, width:'30%',height:500, margin:'20px', backgroundColor:'rgba(17,33,38,0.45)', display:'inline-block'}} className='shadow-boxer'>
                        <p style={{fontSize:33, fontWeight:'bold', marginLeft:'auto', marginRight:'auto', paddingTop:10, textAlign:'center'}}><span style={{color:'#d02f2f'}}></span> Boo<span style={{color:'#d02f2f'}}>ks</span></p>
                        {books.length == 0?
                            <div style={{width:'100%', height:'50%', display:'flex'}}>
                                <div style={{margin:'auto'}}>
                                    <img src={box} width={200}/>
                                    <p style={{paddingTop:40, textAlign:'center'}}>There is nothing here yet</p>

                                </div>
                            </div>:<div style={{width:'100%', maxHeight: 300,overflow:'auto' , height:380,padding:'0%', textAlign:'center', transition:'0.3s ease' }}>
                                <FlatList list={books} limit={1000} style={{maxHeight:380, height:380}}  className ='css' renderItem ={(book:Book, key) => (

                                    <div id ={book.bid} className='highlight-dark' style={{width:'66%', zIndex:2,
                                        display:'flex', alignItems:'center', textAlign:'center',paddingTop:0, paddingBottom:0, height:44, margin:'auto', marginBottom:20}}
                                         onClick={() => {
                                             navigate(`/bookview/${book.bid}` )
                                         }
                                         }>
                                        <p>{(book.title).length <25 ? book.title : book.title.substring(0,22) + '...' }</p>
                                        <span style={{ color: '#eee', fontSize: 19, marginRight: 10, right:0, justifySelf:'end', marginLeft:30}} className="material-symbols-outlined">
                                        link</span> <span style={{color: '#eee', fontSize: 19, marginRight: 10, right:0, justifySelf:'end'}} className="material-symbols-outlined">
                                        image</span>
                                    </div>
                                )} />

                            </div>}
                    </div>
                </div>
            </div>
        </div>);
}

// exporting
export default EventView
