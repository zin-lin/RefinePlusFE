import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import book from "../assets/book.png";
import axios from "axios";

interface  Props{
    bid: string;
}
const EditBook : React.FC= ()=>{
    const {bid} = useParams();
    const [image, setImage] = useState("Select Cover Image")
    const [opacity, setOpacity] = useState(0.0);
    const [selfile, setFile] = useState<File|null>(null);
    const navigate = useNavigate()

    useEffect(()=>{
        setOpacity(1);
        fetch(`/api/getbook/${bid}`).then(response => response.json()).then(
            data =>{
                const titleBar = document.getElementById('title') as HTMLInputElement;
                titleBar.value = data.title;
            }
        )
    }, [])

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
    const updateBook = () => {
        const form = new FormData();
        const titleBar = document.getElementById('title') as HTMLInputElement;

        form.append('title', titleBar.value)
        if (selfile) {
            form.append('img', selfile, selfile.name)
        }
        axios.post(`/api/updatebook/${bid}`, form).then(res=> {
            navigate(`/updatebook/${bid}`)
        }).catch()
    }

    return (
        <div className='page' style={{backgroundColor:'var(--primary)'}}>
            <div style={{width:'100%', height:'100%', display:'flex', flex:1, position:'relative', transition:'0.6s ease', opacity:opacity, justifyContent:'center', alignItems:'center'}} className='full-bg-img-book' >
                <div style={{minWidth:350, width:'33%',height:500, margin:'20px', backgroundColor:'rgba(4,19,21,0.76)', display:'flex', justifyContent:'center'}} className='shadow-boxer'>
                    <div style={{width:'100%', justifyContent:'center', textAlign:'center', margin:20, marginTop:0,  zIndex:67}}>
                        <p style={{fontSize:33, fontWeight:'bold', marginLeft:'auto', marginRight:'auto', paddingTop:10, textAlign:'center'}}>Ed<span style={{color:'#d02f2f'}}>it</span> Bo<span style={{color:'#d02f2f'}}>ok</span></p>
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

                            <button style={{margin:'auto', alignSelf:'center'}} className='highlight-dark' onClick={updateBook}>
                                <span style={{color:'#f8601f', fontWeight:'bold'}}>+</span> Update Book</button>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditBook;