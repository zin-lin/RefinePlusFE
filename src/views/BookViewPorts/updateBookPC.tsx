import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ai from "../../assets/open.png"
import box from "../../assets/dat.png";
import sc from "../../assets/scene.png";
import axios from "axios";
import list from "../List";
import FlatList from "flatlist-react/lib";
import Markdown from "react-markdown";
import {saveAs} from 'file-saver';
import {BarLoader} from "react-spinners";

interface Props{
    bid : string;
}

interface Meta{
    list: string[];
    len: number;

}

const UpdateBookPC: React.FC<Props>= (props:Props)=>{
    let bid = props.bid;
    type Visibility = 'visible' | 'hidden' | 'collapse';
    const navigate = useNavigate();

    const [title, setTitle] = useState('Loading...')
    const [image, setImage] = useState(box)
    const [simage, setSimage] = useState("Select Scene Image")
    const [cimage, setCimage] = useState("Select Cover Image")
    const [mode, setMode] = useState('book')
    const [msg, setMessage] = useState<Array<string>>([])
    let [sfile, setSfile] = useState<File|null>(null)
    let [index, setIndex] = useState(0);
    let [tfileVal, setTfileVal] = useState('')
    let [b64, setB64] = useState();
    let [uid, setUid] = useState();
    let inx = 0;

    let [meta, setMeta] = useState<Meta|undefined>(undefined);

    let [displaySImage, setDisplaySImage] = useState(box)
    let [saveMode, setSaveMode] = useState('write')

    let [loading, setLoading] = useState(true)
    // for nav bar
    let [addOpacity, setAddOpacity] = useState(0)
    const [addVisibility, setAddVisibility] = useState<Visibility | undefined>('hidden')

    // for generating images
    let [imgOpacity, setImgOpacity] = useState(0)
    const [imgVisibility, setImgVisibility] = useState<Visibility | undefined>('hidden')

    // maximums
    let [max, setMax] = useState(0)
    let [likes, setLikes] = useState(0)

    // gen-img
    let [genImg, setGenImg] = useState(box);

    // references
    const fileInput = useRef<HTMLInputElement>(null);
    const coverInput = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [slb, setSLB] = useState('slide-bottom');
    // methods
    const updateMode = ()=>{
        if (mode === 'book')
            setMode('scene')
        else if (mode === 'scene')
            setMode('book')
    }

    useEffect(()=>{
        setSLB('slide-right active');
        fetch(`/api/getbook/${bid}`).then(res => res.json()).then(data =>{
            setTitle(data['title']);
            fetch(`/api/get-project-details/${bid}`).then(resp => resp.json()).then(details =>{
                let meta: Meta = details;
                meta.len = details['len']
                meta.list = details['attributes']
                setMeta(meta!)
                setLoading(false)
            })
            console.log(data)
        });
        fetch(`/api/authed`).then(res => res.text()).then(data =>{
            let uid = data;
            let form: FormData = new FormData();
            form.append('uid', uid);
            form.append('bid', bid);
            //axios.post(`/api/getlikes/ `, form).then(res => setLikes(res.data['likes']))
        })
        console.log(`msg :: ${msg.length}`)
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [index, max, msg])

    return (
       <div style={{width:'100%', flex:2, display:'flex', backgroundColor:'transparent', paddingTop:0, justifyContent:'center', height:'calc(100% - 0px)',
           overflow:'auto'
       }} className={slb}>
           <div style={{width:'calc(100% - 0px)', maxWidth:1500 ,justifySelf:'right', zIndex:2}}>
               <div style={{margin:40}}></div>
              <div style={{width: '100%', }}>
                   <div style={{
                       width: 'calc(100% - 60px)',
                       marginLeft: 30,
                       marginRight: 30,
                       borderRadius: 50,
                       backgroundColor: 'rgba(31,17,38,0.45)',
                       height: 350,
                       backdropFilter: 'blur(6.0px)',
                       zIndex: 3,
                       overflow: 'auto'
                   }} className='shadow-boxer'>
                       <div style={{padding: 20, color: '#ddd'}}>
                           <div style={{
                               width: '100%',
                               height: 200,
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'top'
                           }}>
                               <div style={{
                                   width: '100%',
                                   height: '50%',
                                   display: 'flex',
                                   justifyContent: 'center',
                                   alignItems: 'center'
                               }}>
                                   <div style={{margin: 'auto', textAlign: 'center'}}>
                                       <img style={{margin: 'auto', borderRadius: 20, marginTop: 10}} src={image}
                                            height={200}/>
                                       <div style={{display:'flex',justifyContent: 'center', alignItems:'center'}}>
                                           <p style={{
                                               paddingTop: 20,
                                               fontSize: 24,
                                               textAlign: 'center',
                                               fontWeight: 'bold'
                                           }}>{title}</p>
                                           <button className='highlight-dark' style={{marginTop:20, marginLeft:20}} onClick={()=>navigate(`/editbook/${bid}`)}>Edit ✎</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                  <div style={{width: '100%', flex: 2, display: 'flex',flexWrap:'wrap', order:2, flexDirection:'row', justifyContent:'center'}}>
                      <div style={{width: '50%', height: '100%', minWidth:340}}>

                          <div style={{
                              margin: 30, height: 440,
                              borderRadius: 30, marginBottom:0,
                              backgroundColor: 'rgba(49,30,42,0.45)',
                              width: 'calc(100% - 60px)',
                              backdropFilter: 'blur(7.0px)',
                              overflow :'auto',
                              display: 'flex',
                              justifyContent: 'center',
                              textAlign:'center',
                          }}>
                              <div style={{margin:30, width:'80%'}}>
                                  <p style={{fontSize:30}}>Meta<span style={{color:'#ce4045', fontWeight:'bold'}}>Data</span></p>
                                  {!loading? <div style={{height: 290, overflow: 'auto', width: '100%'}}>
                                      {meta !== undefined ?
                                          <div>
                                              <div style={{display: 'flex', justifyContent:'center'}}>
                                                  <div className='circle' style={{background: 'white'}}></div>
                                                  <div className='circle' style={{background: '#4eb9b5'}}></div>
                                                  <div className='circle' style={{background: '#9e4eb9'}}></div>
                                              </div>
                                              <p style={{color: '#ddd'}}> The Attributes</p>
                                              <div style={{display: 'flex', flexWrap: 'wrap', order: '2'}}>
                                                  {meta.list.map(att => {
                                                      return <div className='highlight-dark'
                                                                  style={{margin: 6, color: '#aaa'}}>{att}</div>
                                                  })}
                                              </div>

                                              <p style={{color: '#ddd'}}><span style={{fontWeight: 'bold'}}>Number of rows:</span>
                                                  <span style={{color: '#ea37b1'}}>{'  '+meta.len}</span></p>
                                          </div>
                                          : <div></div>}
                                  </div>: <BarLoader loading={true} cssOverride={{width:'100%'}} color={'#ef2fb8'}/>}
                              </div>
                          </div>
                      </div>

                      <div style={{width: '50%', height: '100%', minWidth:340}}>
                          <div style={{
                              margin: 30,
                              borderRadius: 30, marginBottom:0,
                              backgroundColor: 'rgba(27,21,30,0.51)',
                              height: 440,
                              width: 'calc(100% - 60px)',
                              backdropFilter: 'blur(7.0px)',
                          }}>
                              <div style={{
                                  flex: 1,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '100%',
                                  width: '100%'
                              }}>
                                  <div style={{display: 'inline-block'}}>
                                      <img src={sc} width={200}/>
                                      <br/>
                                      <button className='redx shRed' style={{padding: 10, marginTop: 50, width: 200}} onClick={updateMode}>
                                          <p>Start Working with Data Preparation</p></button>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>

                  <div style={{width: '100%', height: 500,  display: 'flex',flexWrap:'wrap', flexDirection:'row', justifyContent:'center', marginTop:40}}>
                      <div style={{width: '50%', height: '100%', minWidth:340}}>

                          <div style={{
                              margin: 30,
                              borderRadius: 30,
                              backgroundColor: 'rgba(246,246,246,0.91)',
                              height: 'calc(100% - 80px)',
                              width: 'calc(100% - 60px)',
                              backdropFilter: 'blur(7.0px)',
                              overflow :'auto',
                              boxShadow: '2px 0px 19px rgba(10,10,10,0.6)',
                              display: 'flex',
                              justifyContent: 'center',
                              textAlign:'center',
                          }}>
                              <div style={{margin:30, width:'80%', color:'#aaa', height: 310, overflow: 'auto',}}>
                                  <p style={{fontSize:30, color:'#aaa'}}>Guide for Data</p>
                                  <div style={{ width: 'calc(100% - 40)', textAlign:'center', padding:20}}>

                                      <div>
                                          <p>Step 1: Load File into the system</p>
                                      </div>
                                      <div style={{width:'100%', height:10, borderRadius:5, background:'rgba(162,183,183,0.37)', zIndex:30}}>
                                          <div style={{width:'25%', height:10, borderRadius:5, background:'#dc606e'}}>

                                          </div>
                                      </div>
                                      <div style={{height:30}}></div>

                                      <div>
                                          <p>Step 2: Search for isolated/corrupted data</p>
                                      </div>
                                      <div style={{width:'100%', height:10, borderRadius:5, background:'rgba(162,183,183,0.37)', zIndex:30}}>
                                          <div style={{width:'50%',  height:10, borderRadius:5, background:'#dc60c7'}}>

                                          </div>
                                      </div>
                                      <div style={{height:30}}></div>

                                      <div>
                                          <p>Step 3: Fix this data</p>
                                      </div>
                                      <div style={{width:'100%',  height:10, borderRadius:5, background:'rgba(162,183,183,0.37)', zIndex:30}}>
                                          <div style={{width:'75%', height:10, borderRadius:5, background:'#bd60dc'}}>

                                          </div>
                                      </div>
                                      <div style={{height:30}}></div>

                                      <div>
                                          <p>Step 4: Use Mining Models from weka/ build AI models</p>
                                      </div>
                                      <div style={{width:'100%',  height:10, borderRadius:5, background:'rgba(162,183,183,0.37)', zIndex:30}}>
                                          <div style={{width:'100%', height:10, borderRadius:5, background:'#609edc'}}>

                                          </div>
                                      </div>
                                      <div style={{height:30}}></div>

                                  </div>
                              </div>
                          </div>
                      </div>

                      <div style={{width: '50%', height: '100%', minWidth:340}}>
                          <div style={{
                              margin: 30,
                              borderRadius: 30,
                              backgroundColor: 'rgba(246,246,246,0.91)',
                              height: 'calc(100% - 80px)',
                              width: 'calc(100% - 60px)',
                              backdropFilter: 'blur(7.0px)',
                              overflow :'auto',
                              boxShadow: '2px 0px 19px rgba(10,10,10,0.6)',
                              display: 'flex',
                              justifyContent: 'center',
                              textAlign:'center',
                          }}>
                              <div style={{margin:30, width:'80%', color:'#aaa', height: 310, overflow: 'auto',}}>
                                  <p style={{fontSize:30, color:'#aaa'}}>Algor<span style={{color:'#ce4090', fontWeight:'normal'}}>ith</span><span style={{color:'#b440ce', fontWeight:'normal'}}>ms </span></p>
                                  <div style={{ width: 'calc(100% - 40)', textAlign:'left', padding:20}}>

                                      <div>
                                        <span className='highlight' style={{margin:10}}>J48 - Classification</span>
                                          <p style={{margin:10, marginTop:17}}>J48 is the algorithm for producing rules displaying relationship between the attributes</p>
                                      </div>
                                      <br/>

                                      <div>
                                          <span className='highlight' style={{margin:10}}>OneR - Classification</span>
                                          <p style={{margin:10, marginTop:17}}>OneR is a predictive model showing what one attribute's weights to the classification problem</p>
                                      </div>
                                      <br/>

                                      <div>
                                          <span className='highlight' style={{margin:10}}>Apriori - Association</span>
                                          <p style={{margin:10, marginTop:17}}>This algorithm searches for frequent item sets to represent relation between different attributes</p>
                                      </div>
                                      <br/>

                                      <div>
                                          <span className='highlight' style={{margin:10}}>SimpleKMeans - Clustering</span>
                                          <p style={{margin:10, marginTop:17}}>This algorithm produces groups of rows to label such unlabelled data to show interesting patterns</p>
                                      </div>
                                      <br/>


                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>

               </div>


           </div>
       </div>
    );
}

export default UpdateBookPC;
