import React from "react";
import box from "../assets/box.png";
import {List} from "flatlist-react/lib/flatListProps";
import FlatList from "flatlist-react/lib";
import {useNavigate} from "react-router-dom";

interface Book {
    bid: string;
    title: string;
}

interface Props{
    list : never[];
}

const BookList: React.FC <Props>= (props:Props) =>{
    const navigate = useNavigate();
    const books =   props.list
    return (
        <div style={{minWidth:300, width:'30%',height:500, margin:'20px', backgroundColor:'rgba(17,33,38,0.45)', display:'inline-block'}} className='shadow-boxer'>
        <p style={{fontSize:33, fontWeight:'bold', marginLeft:'auto', marginRight:'auto', paddingTop:10, textAlign:'center'}}>Yo<span style={{color:'#d02f2f'}}>ur</span> Boo<span style={{color:'#d02f2f'}}>ks</span></p>
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
                             navigate(`/updatebook/${book.bid}` )
                         }
                         }>
                        <p>{(book.title).length <25 ? book.title : book.title.substring(0,22) + '...' }</p>
                        <span style={{ color: '#eee', fontSize: 19, marginRight: 10, right:0, justifySelf:'end', marginLeft:30}} className="material-symbols-outlined">
                                        link</span> <span style={{color: '#eee', fontSize: 19, marginRight: 10, right:0, justifySelf:'end'}} className="material-symbols-outlined">
                                        image</span>
                    </div>
                )} />

            </div>}
    </div>)
}

export default BookList;