import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UpdateBookPC from "./BookViewPorts/updateBookPC";
import UpdateBookMobile from "./BookViewPorts/updateBookMobile";

const UpdateBook: React.FC= ()=>{
    let {bid} = useParams();
    console.log(bid);
    const [opacity, setOpacity] = useState(0.0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();
    useEffect(()=>{
        try{
            fetch('/api/authed').then(res => res.text()).then(id => {
                if (id.length === 0 || id === '') {
                    navigate('/')
                }
            }).catch()
        }catch (e){}
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        setOpacity(1);
        // Add event listener
        window.addEventListener('resize', handleResize);
    }, [])

    return (
        <div className='page' style={{backgroundColor:'var(--primary)'}}>
            <div style={{width:'100%', height:'100%',  position:'relative', transition:'0.6s ease', opacity:opacity, }} className='full-bg-img-book' >
                <UpdateBookPC bid={bid || ''} />
                {windowWidth <1500 ?
                    <UpdateBookMobile bid={bid || ''}/>:<div></div>
                }
            </div>
        </div>
    );
}

export default UpdateBook