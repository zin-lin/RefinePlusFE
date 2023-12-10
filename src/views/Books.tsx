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

interface Book {
    bid: string;
    title: string;
}

const Books: React.FC= ()=>{
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
        console.log('visited books')
        fetch('/api/authed').then(res => res.text()).then(id => {

            console.log(id)
            if (id === ""){
                navigate('/profile') // This is to limit only users who are authenticated
              }

            else {
                fetch('/api/get-titles/' + id).then(
                   res=> res.json()
                ).then(list => {
                    console.log(list)
                    setBooks(list)
                })
            }
            setAuthed(id)
        }).catch()

        setOpacity(1)
    },[])

    const openAddBook = ()=>{
        setAddOpacity(1)
        setAddVisibility('visible')
    }

    const closeAddBook= ()=>{
        setAddOpacity(0)
        setAddVisibility('hidden')
    }

    const fileInput = useRef<HTMLInputElement>(null);

    const handleChoose = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Process the selected file here (e.g., upload, preview, etc.)
            console.log('Selected file:', file);
            setFile(file||null);
            setImage(file.name)
        }
    };

    const createBook = ()=>{
        let titlebar = document.getElementById("title") as HTMLInputElement| null;
        let title = titlebar ?.value!;
        let book = {title: title, img:selfile, uid:authed}

        let form = new FormData();
        form.append('title', title)
        form.append('uid', authed)
        if (selfile) {
            console.log(selfile)
            form.append('img', selfile, selfile.name);
        }

        closeAddBook()
        alert("Creating book...")
        axios.post('/api/addbook/', form)
            .then(response => {
                console.log(response.data);
                navigate("/updatebook/" + response.data);
            })
            .catch(error => {
                alert(error);
                window.location.reload()
            });
    }


    return (
        <div className='page' style={{backgroundColor:'var(--primary)'}}>
            <div style={{width:'100%', height:'calc(100% - 140px)', position:'absolute', background:'transparent', zIndex:43, visibility:addVisibility||'hidden', opacity:addOpacity,
                flex:1, display:'flex', justifyContent:'center', transition:'0.2s ease'
            }} >
                <div style={{minWidth:350, width:'33%',height:500, margin:'20px', backgroundColor:'rgba(4,19,21,0.76)', display:'flex', justifyContent:'center'}} className='shadow-boxer'>
                    <div style={{width:'100%', justifyContent:'center', textAlign:'center', margin:20, marginTop:0,  zIndex:67}}>
                        <p style={{fontSize:33, fontWeight:'bold', marginLeft:'auto', marginRight:'auto', paddingTop:10, textAlign:'center'}}>Ne<span style={{color:'#d02f2f'}}>w</span> Bo<span style={{color:'#d02f2f'}}>ok</span></p>
                        <img src={book} width={100}/>
                        <div style={{display: 'flex', alignItems: 'center', margin:40}}>
                            <span style={{color: '#eee', fontSize: 19, marginRight: 10}} className="material-symbols-outlined">
                                title</span><p style={{color: '#eee', fontSize: 14}}>Title:</p>
                            <input placeholder='@Title' className='noner dark' id="title" />
                        </div>

                        <div className='highlight-dark' style={{width:200, display:'flex', alignItems:'center', textAlign:'center',paddingTop:0, paddingBottom:0, height:44, margin:'auto', marginBottom:20}} onClick={handleChoose}>
                            <span style={{color: '#eee', fontSize: 19, marginRight: 10}} className="material-symbols-outlined">
                                photo</span>
                            <input ref={fileInput} accept='image/*' onChange={handleFileChange} type='file' placeholder = 'Select Cover Image' style={{border:'none', color:'#eee', display:'none'}}/>
                            <p>{image.length <19?image:image.substring(0,16)+'...'}</p>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', width:'270px', margin:'auto'}}>
                            <button style={{margin:'auto', alignSelf:'center'}} className='highlight-dark' onClick={closeAddBook}>
                                <span style={{color:'#e75b5b', fontWeight:'bold'}}>x</span> Close</button>
                            <button style={{margin:'auto', alignSelf:'center'}} className='highlight-dark' onClick={createBook}>
                                <span style={{color:'#f8601f', fontWeight:'bold'}}>+</span> Create Book</button>

                        </div>

                    </div>
                </div>
            </div>
        <div style={{width:'100%', height:'100%', display:'flex', flex:1, position:'relative', transition:'0.6s ease', opacity:opacity, }} className='full-bg-img-book' >


                <div style={{flex:2, display:'flex',  height:'100%', width:'100%', justifyContent:"center", flexWrap:'wrap', order:2, flexDirection:'row', alignItems:'center'}}>

                    <BookList list={books!}/>
                    <div style={{minWidth:300, width:'30%',height:500, margin:'20px', display:'flex', justifyContent:'center', alignItems:'bottom'
                    }} className='shadow-boxer-top'>
                        <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'top'}}>
                            <button className='redx shRed' style={{width:200, height:'100px', borderRadius:13, marginTop:300, padding:20}} onClick={openAddBook}>
                                Add A New Book and Unleash Your Imagination ✎</button>
                        </div>
                    </div>

                </div>

        </div>
        </div>);

}

export default Books
