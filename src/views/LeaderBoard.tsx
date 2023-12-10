import React, {useEffect, useState} from "react";
import tro from '../assets/tro.png';
import {useNavigate} from "react-router-dom";
/// type :: Book
interface Book {
    title: string;
    bid : string;
    uid: string;
    img: string;
}
const LeaderBoard : React.FC= () =>{
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null); // type casting react hook to Book with null safety
    const [img, setImg] = useState(''); // start off with null data
    const [name, setName] = useState('');
    // get leaderboard from server
    useEffect(()=>{
        // Here get leaderboard book
        fetch('api/getleaderboard/').then(res => res.json()).then((data: Book)=>{ // type casting to Book
            // get the book
            setBook(data);
            fetch(`/api/getscene-image/${data.bid}/${data.img}`).then(res => res.blob()).then(
                simg =>{
                    if (simg.size !== 0){

                        const surl = window.URL.createObjectURL(new Blob([simg]))
                        setImg(surl)
                    }
                }
            ).catch()
            fetch(`/api/get-user-details/${data.uid}`).then(res=>res.json()).then(details => setName(details['name'])).catch()
        }).catch()
    }, [])

    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:50}}>
            {book !== null ?<div style={{
                width: '60%',
                padding: 60,
                minWidth: 300,
                textAlign: 'center',
                background: 'rgba(15,21,30,0.65)',
                backdropFilter: 'blur(3.0px)',
                boxShadow: '0px 0px 12px rgba(12,12,12,0.45)',
                borderRadius: 50
            }}>
                <p style={{fontSize: 23, color: '#ffffff', textShadow: '0px 6px 10px rgba(10,10,10,0.6)'}}>Current <span
                    style={{color: '#ff6f1f'}}>Competition</span> Leader for
                    <span style={{color: '#de4c4c'}}> This month</span></p>
                <img src={tro} width={200}/>
                <p><span style={{fontWeight: 'bold'}}>{book?.title}</span> <span
                    style={{color: '#d35050'}}>by </span>{name}</p>
                <button className='bluex shBlue' style={{paddingLeft: 20, paddingRight: 20, marginTop: 20}}
                onClick={()=>{
                    navigate(`/bookview/${book?.bid}`)
                }
                }
                >Read Now
                </button>
            </div>:<div></div>}
        </div>
    );
};

export default LeaderBoard;