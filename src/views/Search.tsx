import React, {ChangeEvent, FormEvent} from "react";
import {useState, useEffect} from "react";
import logo from "../assets/logo.png";
import {useDispatch} from "react-redux";
import {useAuthDispatch} from "../redux/hook";
import {resetAllVs} from "../redux/authState";
import axios from "axios";
import FlatList from 'flatlist-react';
import booksrc from '../assets/book.png';
import {useNavigate} from "react-router-dom";

interface book {
    title: string,
    bid: string
}

export default function Search() {

    const [opacity, setOpacity] =useState(0);
    const [title, setTitle] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    dispatch(resetAllVs());

    useEffect(()=>{
        setOpacity(1);
    })

    // search
    const search = (event :FormEvent ) =>{
        event.preventDefault();
        const val = document.getElementById('src') as HTMLInputElement;
        let x:string = val.value;
        let fda: FormData  = new FormData();
        fda.append('text', x);

        axios.post(`/api/getbooks/`,fda ).then(res=>res.data).then(data =>{
            setList(data.list);
            console.log(data.list);
        }).catch(err =>  console.error(err));
    }

    const search_text = (event :ChangeEvent ) =>{
        event.preventDefault();
        const val = document.getElementById('src') as HTMLInputElement;
        let x:string = val.value;
        let fda: FormData  = new FormData();
        fda.append('text', x);

        if (x !== ''){
            axios.post(`/api/getbooks/`, fda).then(res => res.data).then(data => {
                setList(data.list);
                console.log(data.list);
            }).catch(err => console.error(err));
        }
    }


    return (
        <div className='page'>

            <div style={{width:'100%', height:'100%', display:'flex', flex:1, position:'relative', justifyContent:'center'}}>
                <div className='full-bg-img-book' style={{maxWidth:'100%', textAlign:'center'}}>
                    <div style={{width:'100%', flex:1, display:'flex', justifyContent:'center', height:130}}>
                        <form style={{width:'100%', height:50, display:'flex', position:'relative',
                            background:'rgba(238,238,238,0.85)', borderRadius:25, margin:30, transition:'all 0.8s ease', opacity: opacity, alignItems:'center', maxWidth:'900px'
                        }} className="shadow-container" onSubmit={search}>

                            <input style={{border:'none', transition:'0.4s ease', marginLeft:10,}} placeholder='Search Anything...' id ='src' onChange={search_text}/>
                            <button  style={{background:'transparent', right:0, position:'absolute', margin:5, zIndex:4}} >
                                <span className="material-symbols-outlined" style={{color:'#aaa'}}>search</span>
                            </button>

                        </form>
                    </div>
                    <div style={{width:'100%', height:'calc(100% - 130px)', display:'flex', flex:1, textAlign:'center', justifyContent:'center', overflow:'auto'}}>
                        <div style={{width:'100%', textAlign:'center'}}>
                            {list.length !== 0? <FlatList list={list} className='css'
                                       renderItem={(book:book, key) => (
                                           <div style={{margin: 30, width:'calc(100% - 60px)'}}>
                                               <div style={{
                                                   height: 110,
                                                   margin: 'auto',
                                                   width:'calc(100% - 60px)',
                                                   maxWidth: 800,
                                                   alignSelf:'center',
                                                   justifySelf: 'center',
                                                   borderRadius: '20px',
                                                   boxShadow: '3px 3px 10px rgba(18,18,18,0.18)',
                                                   background: 'rgba(15,25,46,0.68)',
                                                   display:'flex',
                                                   alignItems: 'center',
                                                   padding:30,
                                                   justifyContent:'space-between'
                                               }}>
                                                   <img src={booksrc} width={60} height={60} style={{marginLeft:20, marginRight:40}}/>
                                                   <p style={{justifySelf:'left', fontWeight:'bold'}}>{book.title.length >40 ? book.title.substring(0,37) + '...': book.title}</p>
                                                   <button className = 'orangex shOrange' style={{justifySelf:'right', marginRight: 10, marginLeft: 30,height:50, padding:10}}
                                                   onClick={() => navigate(`/bookview/${book.bid}`)}
                                                   >Read Book</button>
                                               </div>
                                           </div>
                                       )}
                            /> : <div></div>}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );

}