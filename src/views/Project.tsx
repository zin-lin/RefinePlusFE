import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
     GridLoader,
} from "react-spinners";
import InfiniteLoader from "flatlist-react/lib/___subComponents/InfiniteLoader";

interface Props{
    bid : string;
}

interface Set {
    attributes: string [];
    status: number;
    len: number;
    rows: { [key: string]: any }[];

}
const Project: React.FC= ()=> {
    const {pid} = useParams();
    const [title, setTitle] = useState('Loading...')
    const [load, setLoad] = useState(true);
    const [len, setLen] = useState(10);
    const [set, setSet] = useState<Set | undefined>(undefined);
    const navigate = useNavigate();
    const [attr, setAttribute] = useState('');

    const setMode = (att:string) => {
        setAttribute(att);
        alert(att);
    }

    useEffect(()=>{
        fetch(`/api/getbook/${pid}`).then(res => res.json()).then(data =>{
            setTitle(data['title']);
                fetch(`/api/get-project-rows/${len}/${pid}`).then(resp => resp.json()).then(
                    (dat:Set )=>{
                        if (dat.status !== 0){
                        setSet(dat)
                        console.log(dat)
                        }
                    }
                )
            setLoad(false)
            console.log(data)
        });
    }, []);

    return (<div className='page' style={{overflow:'hidden'}}>
            <div style={{width:'100%', height:'100%', overflow:'auto',display:'flex', flex:1, position:'relative', transition:'0.6s ease', justifyContent:'center' }} className='full-bg-img-book' >
                <div style={{width:'100%', textAlign:'center', height:'100%'}}>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <p style={{color:'#e534c8', fontSize:28, fontWeight:'bold'}}>{title}</p>
                        <span className="material-symbols-outlined highlight-dark" style={{color:'rgba(243,58,58,0.42)', marginLeft:10}}>
                                    edit
                                    </span>
                        <span className="material-symbols-outlined highlight-dark" style={{color:'rgba(72,175,231,0.42)', marginLeft:10}}
                            onClick={()=>{
                                navigate(`/updatebook/${pid}`)
                            }}>
                                    arrow_back_ios
                                    </span>
                        <span className="material-symbols-outlined highlight-dark" style={{color:'rgba(238,238,238,0.42)', marginLeft:10}}>
                                    apps
                                    </span>
                        <span className="material-symbols-outlined highlight-dark" style={{color:'rgba(213,56,205,0.42)', marginLeft:10}}>
                                    category
                                    </span>
                        <span className="material-symbols-outlined highlight-dark" style={{color:'rgba(56,82,213,0.42)', marginLeft:10}}>
                                    group
                                    </span>
                    </div>
                    {set !== undefined? <div style={{width:'100%', height:'80%', display:'flex', justifyContent:'center'}}>
                        <div style={{width:'calc(80% - 80px)', height:'calc(100% - 80px)', borderRadius:30, background:'rgba(34,26,40,0.68)', padding:40,
                            boxShadow:'2px 2px 16px rgba(10,10,10,0.6)'}}>
                            <div style={{width:'100%', height:'100%', overflow:'auto'}}>
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>


                                </div>

                                <div style={{width:'100%', display:'flex', }}>
                                    <div style={{height:10, width:10, background:'#882c88'}}></div>
                                    {
                                        set?.attributes.map(att=>{
                                            return <div style={{marginLeft:40, minWidth:180, wordWrap:'break-word', }} onClick={()=>{setMode(att)}} >
                                                <p className='highlight-dark' style={{flexWrap:'wrap',
                                            }}>{att}</p></div>
                                        })
                                    }
                                </div>
                                <hr style={{width: set.attributes.length*220}}/>

                                {
                                    set.rows.map(row=>{
                                        return <div>
                                            <div style={{width:'100%', display:'flex', }}>
                                                {
                                                    set?.attributes.map(at=>{
                                                        return <div style={{marginLeft:40, minWidth:180, wordWrap:'break-word', }}>
                                                            <p className='highlight-less-dark' style={{flexWrap:'wrap',
                                                            }}>{row[at]}</p>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                            <hr style={{width: set.attributes.length*220}}/>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </div>:
                        <div style={{width:'100%', justifyContent:'center', display:'flex', height:'100%', alignItems:'center'}}>
                            <GridLoader loading={true} color={'#e23ce8'} size={40}/>
                        </div>
                    }
                </div>
            </div>
    </div>);
}

export default Project;

