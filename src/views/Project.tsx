import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
     GridLoader,
} from "react-spinners";
import InfiniteLoader from "flatlist-react/lib/___subComponents/InfiniteLoader";
import book from "../assets/dat.png";
import axios from "axios";

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
    type Visibility = 'visible' | 'hidden' | 'collapse';
    const {pid} = useParams();
    const [title, setTitle] = useState('Loading...')
    const [load, setLoad] = useState(true);
    const [len, setLen] = useState(10);
    const [set, setSet] = useState<Set | undefined>(undefined);
    const navigate = useNavigate();
    const [attr, setAttribute] = useState('');
    const [mVisibility , setMVisibility] = useState<Visibility| undefined>('hidden');
    const [mOpacity , setMOpacity] = useState(0.0);
    const [value, setValue] = useState('');
    const [att, setAtt] = useState('')
    const [idx, setIdx] = useState(0)


    const setMode = (att:string) => {
        setAttribute(att);
        alert(att);
    }

    const closeAddBook= ()=>{
        setMOpacity(0)
        setMVisibility('hidden')
        let inp = document.getElementById('title') as HTMLInputElement;
        inp.value = ''
    }

    const changeCell = ( att:string, idx:number, pid:string )=>{
        let inp = document.getElementById('title') as HTMLInputElement;
        let val = inp.value
        let form = new FormData();
        form.append('val', val)
        form.append('att', att)
        form.append('idx', idx.toString())
        form.append('bid', pid)
        axios.post('/api/change-cell/', form).then(res=> res.data).then(data=>{
            alert(data)
            fetch(`/api/get-project-rows/${len}/${pid}`).then(resp => resp.json()).then(
                (dat:Set )=>{
                    if (dat.status !== 0){
                        setSet(dat)
                        console.log(dat)
                    }
                }
            )
        }).catch(err => alert(err))
        closeAddBook()
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
        <div style={{width:'100%', height:'calc(100% - 140px)', position:'absolute', background:'transparent', zIndex:43,
            visibility:mVisibility||'hidden', opacity:mOpacity, overflow:'hidden',
            flex:1, display:'flex', justifyContent:'center', transition:'0.2s ease'
        }} >
            <div style={{minWidth:350, width:'33%',height:400, margin:'20px', backgroundColor:'rgba(4,19,21,0.76)', display:'flex', justifyContent:'center'}} className='shadow-boxer'>
                <div style={{width:'100%', justifyContent:'center', textAlign:'center', margin:20, marginTop:0,  zIndex:67}}>
                    <p style={{fontSize:33, fontWeight:'bold', marginLeft:'auto', marginRight:'auto', paddingTop:10, textAlign:'center'}}>Up<span style={{color:'#d02f2f'}}>date</span> Fie
                        <span style={{color:'#d02f2f'}}>ld</span></p>
                    <img src={book} width={100}/>
                    <div style={{display: 'flex', alignItems: 'center', margin:40}}>
                            <span style={{color: '#eee', fontSize: 19, marginRight: 10}} className="material-symbols-outlined">
                                title</span><p style={{color: '#eee', fontSize: 14}}>Title:</p>
                        <input placeholder={value.toString()} className='noner dark' id="title" />
                    </div>


                    <div style={{display:'flex', justifyContent:'center', width:'270px', margin:'auto'}}>
                        <button style={{margin:'auto', alignSelf:'center'}} className='highlight-dark' onClick={closeAddBook} >
                            <span style={{color:'#e75b5b', fontWeight:'bold'}}>x</span> Close</button>
                        <button style={{margin:'auto', alignSelf:'center'}} className='highlight-dark' onClick={()=>{
                            changeCell(att, idx, pid!)

                        }
                        }>
                            <span style={{color:'#f8601f', fontWeight:'bold'}}>#</span> Update</button>

                    </div>

                </div>
            </div>
        </div>
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
                                    set.rows.map((row, ind)=>{
                                        return <div>
                                            <div style={{width:'100%', display:'flex', }}>
                                                {
                                                    set?.attributes.map(at=>{
                                                        return <div style={{marginLeft:40, minWidth:180, wordWrap:'break-word', }} onClick={()=>{
                                                            setMOpacity(1.0)
                                                            setMVisibility('visible')
                                                            setValue(row[at])
                                                            setAtt(at)
                                                            setIdx(ind)
                                                            let inp = document.getElementById('title') as HTMLInputElement;

                                                        }
                                                        }>
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

