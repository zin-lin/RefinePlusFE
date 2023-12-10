import React from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import {useAuthDispatch} from "../../redux/hook";
import {toHome, toShop, toProfile, resetAllVs, toBook} from "../../redux/authState";

const navSty = {
    fontSize:16, margin:10
}

const napierColor = {
    color:"#FF5757"
}

export default function Nav () {
    const dispatch = useAuthDispatch();
    return (
        <nav>
            <div>
                <p  style={{fontSize:24, marginLeft:20, fontWeight:'bold'}}>{'['}Annex<span className='red'>ComicsX</span>{']'}</p>
            </div>
            <div className='hider' style={{right:10, position:'absolute', display:'flex', height:'100%', alignItems:'center'}}>
                <Link onClick={()=> dispatch(toHome())} to='/'><p style={{fontSize:16, margin:12 }}>Ho<span style={{color:"#FF5757"}}>me</span></p></Link>
                <Link onClick={()=> dispatch(toBook())} to='/books'><p style={{fontSize:16, margin:12 }}>Bo<span style={{color:"#FF5757"}}>oks</span></p></Link>
                <Link onClick={()=> dispatch(toProfile())} to='/profile'><p style={{fontSize:16, margin:12 }}>Pro<span style={{color:"#FF5757"}}>file </span></p></Link>
                <Link onClick={()=> dispatch(resetAllVs())} to='/search'><p style={{fontSize:16, margin:12 }}><span className="material-symbols-outlined">
                search
                </span></p></Link>
                <Link onClick={()=> dispatch(toShop())} to='/events'><p style={{fontSize:16, margin:12 }}><span className="material-symbols-outlined red">
                apps
                </span></p></Link>
            </div>
            <div className = "hider-reverse" style={{marginTop:'6px', right:0, position:'absolute' }}>
                <Link onClick={()=> dispatch(resetAllVs())} to='/search'><p style={{fontSize:16, margin:12 }}><span className="material-symbols-outlined">
                    search
                    </span></p>
                </Link>
            </div>
        </nav>
    );
}