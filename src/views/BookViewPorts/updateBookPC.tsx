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
    // methods
    const updateMode = ()=>{
        if (mode === 'book')
            setMode('scene')
        else if (mode === 'scene')
            setMode('book')
        newScence()
    }

    // call navigate
    const callNavigate =()=>{
        fetch(`/api/getscene-latest/${bid}`).then(res=>res.json()).then(data=> {
            console.log(data.index+1)
            setMax(data.index+1)

        })
        setAddOpacity(1)
        setAddVisibility('visible')
    }

    // close navigation panel
    const closeNavigate = ()=>{
        setAddOpacity(0)
        setAddVisibility('hidden')
    }

    const download = ()=>{
        // get input
        let input = document.getElementById('gen_name') as HTMLInputElement;
        let text = input!.value!; // if exist


        try{// Decoding base64 to binary
            const binaryString = atob(b64!);

            // Create an array buffer from binary data
            const arrayBuffer = new ArrayBuffer(binaryString.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }

            // Create Blob from array buffer
            const blob = new Blob([arrayBuffer], {type: 'image/png'});

            // Create a download link href
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${text === '' ? 'cmx' : text}.png`;
            input.value = ''

            // call sacve with click eve
            document.body.appendChild(a);
            a.click();

            // Remove the link from the body
            document.body.removeChild(a);
        }catch (err){
            alert('No Image')
        }

    }

    // generate Image from DallE
    const generateImg =  ()=>{
        let uuid:string = '';
        fetch(`/api/authed`).then(res=> res.text()).then(id=>{
            uuid = id;
            // only after getting uid
            axios.post(`/api/get-tokens/${uuid}`).then(res=>res.data).then(data=>{
                let api :number = parseInt(data);
                // if sufficient tokens
                if (api >0){
                    const input = document.getElementById('gen') as HTMLInputElement;
                    let text:string = input.value;
                    let form: FormData = new FormData();
                    input.disabled = true;
                    input.value = '';
                    input.placeholder = 'Loading...'
                    form.append('prompt', text);
                    axios.post('/api/generate-image/', form).then(res => res.data).then(data =>{
                        // if success
                        if (data !== 0){
                            let imageBase64 =data['img'];
                            console.log(imageBase64)
                            const binaryString = atob(imageBase64);
                            setB64(imageBase64)
                            // Create an array buffer from binary data
                            const arrayBuffer = new ArrayBuffer(binaryString.length);
                            const uint8Array = new Uint8Array(arrayBuffer);
                            for (let i = 0; i < binaryString.length; i++) {
                                uint8Array[i] = binaryString.charCodeAt(i);
                            }
                            const blob = new Blob([arrayBuffer], { type: 'image/png' })
                            const blobURL = URL.createObjectURL(blob);
                            setGenImg(blobURL)
                            input.placeholder = 'AI: /Your prompt Here'
                            input.disabled = false;
                        }
                    }).catch(err => {
                        alert(err)
                        input.placeholder = 'AI: /Your prompt Here'
                        input.disabled = false;
                    })
                } else{
                    alert('Insuffcient Tokens')
                }
            })
        }
        ).catch()
    }

    // call image generation tool
    const callImgGen =()=>{

        setImgOpacity(1)
        setImgVisibility('visible')
    }

    // close navigation panel
    const closeImgGen = ()=>{
        setImgOpacity(0)
        setImgVisibility('hidden')
    }

    // handle file choose
    const handleChoose = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    // handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Process the selected file here (e.g., upload, preview, etc.)

            setSfile(file || null);
            setSimage(file.name)
            const reader = new FileReader();

            reader.onload = () => {
                const src = reader.result as string;
                setDisplaySImage(src)
                console.log(src)
            }
            reader.readAsDataURL(file);

        }
    }

    // for cover photo
    const handleChooseCover = () => {
        if (coverInput.current) {
            coverInput.current.click();
        }
    };


    // rerender appropriately indexed scenes
    const newScence = () => {
        console.log(`New Scene, scene ${index+1}`)
        setSfile(null)
        setTfileVal('')
        console.log(`This is the index: ${index}`)
        fetch(`/api/getscene/${bid}/${index}`).then(res => res.json()).then(
            data =>{
                console.log(data)
                let iUrl = data.img;
                let text = data.text;
                if (text.length > 0)
                    setSaveMode('update')
                else
                    setSaveMode('write');
                const textA = document.getElementById('text') as HTMLTextAreaElement;
                if (textA)
                    textA.value = text

                if (iUrl){
                    fetch(`/api/getscene-image/${bid}/${iUrl}`).then(res => res.blob()).then(
                        simg =>{
                            if (simg.size !== 0){

                                const surl = window.URL.createObjectURL(new Blob([simg]))
                                setDisplaySImage(surl)

                            }
                        }
                    )
                }
                else {
                    setDisplaySImage(box)
                }
            }
        )
    }
    const latestScence = () => {
        fetch(`/api/getscene-latest/${bid}`).then(res => res.json()).then(
            data =>
            {
                setIndex(data.index);
                newScence()

            }
        )
    }

    const saveAndNext = () => {
        // remember to allow only if they have text values
        const textarea = document.getElementById('text') as HTMLTextAreaElement;
        if (textarea.value.length === 0) {
            alert('scene is empty cannot be saved')
            return;
        }
        console.log(`Scene: ${index+1}`)
        // Save Current Index
        let form = new FormData();
        form.append('text', textarea.value.replace(/\r\n/g, '\n').replace(/\n\n/g, '\n'))
        if (sfile)
        {
            form.append('img', sfile, sfile.name)
        }
        if (saveMode === 'write'){
            axios.post(`/api/writescene/${bid}`,form).then(response => {
                alert('Success')

            })
                .catch(error => {
                    alert(error);

                });
        }else{
            axios.post(`/api/updatescene/${bid}/${index}`,form).then(response => {
                alert('Success')

            })
                .catch(error => {
                    alert(error);

                });
        }
        setIndex(prevState => prevState+1);
        console.log(`changed: ${index}`)
        inx++;

        // recall new scene
    }

    const askGPT = () =>{
        let form : FormData = new FormData()
        let x = [];
        let count = 0;

        x.push({'role':'system', 'content': 'You are a helpful assistant.'})

        form.append('num', msg.length.toString());
        msg.forEach((item, index) => {
            form.append(`msg[${index}]`, item);
        });
        let input = document.getElementById('msg') as HTMLInputElement;

        if (msg.length >0 && input.value !== ''){
            save() // save changes //user doesn't have to know
            input.value =''
            axios.post('/api/ask/', form).then(res => res.data).then(
                data => {
                    if (data['response'] !== ''){
                        console.log(`res :: ${data['response']}`)
                        setMessage(prev => [...prev, (data['response']).toString()])
                        input.disabled = false
                        input.placeholder = 'Ask something to GPT'
                    }
                }
            )
        }

    }

    const save = () =>{
        // remember to allow only if they have text values
        console.log('entered save')
        try{
            console.log('entered try')
            const textarea = document.getElementById('text') as HTMLTextAreaElement;
            if (textarea.value.length === 0) {
               // alert('scene is empty cannot be saved')
                return;
            }
            console.log(`Unchange: ${index}`)
            // Save Current Index
            let form = new FormData();
            form.append('text', textarea.value.replace(/\r\n/g, '\n').replace(/\n\n/g, '\n'))
            if (sfile) {
                form.append('img', sfile, sfile.name)
            }
            if (saveMode === 'write') {
                axios.post(`/api/writescene/${bid}`, form).then(response => {
                    //alert('Success')
                    newScence()
                    console.log('written')
                })
                    .catch(error => {
                        alert(error);

                    });
            } else {
                axios.post(`/api/updatescene/${bid}/${index}`, form).then(response => {
                    //alert('Success')

                })
                    .catch(error => {
                        alert(error);

                    });
            }

        }catch (err){

        }
    }
    const saveAndPrev = () => {
        // remember to allow only if they have text values
        const textarea = document.getElementById('text') as HTMLTextAreaElement;
        if ( index === 0) {
            alert('First scene')
            return;
        }
        console.log(`Unchange: ${index}`)
        // Save Current Index
        if (textarea.value.length !==0){
            let form = new FormData();
            form.append('text', textarea.value.replace(/\r\n/g, '\n').replace(/\n\n/g, '\n'));
            console.log(textarea.value)
            if (sfile) {
                form.append('img', sfile, sfile.name)
            }
            if (saveMode === 'write') {
                axios.post(`/api/writescene/${bid}`, form).then(response => {
                    alert('Success')
                })
                    .catch(error => {
                        alert(error);

                    });
            } else {
                axios.post(`/api/updatescene/${bid}/${index}`, form).then(response => {
                    alert('Success')

                })
                    .catch(error => {
                        alert(error);

                    });
            }
        }
        inx--;

        setIndex(inx => inx-1)
        newScence()
    }


    const nav = ()=>{
        const nav = document.getElementById('nav') as HTMLInputElement;
        let indx :number = parseInt(nav.value)-1;
        console.log(`index: ${indx}, max: ${max}`)
        if (indx>=max){
            alert('Maximum scenes exceeded')
            return
        }
        closeNavigate();
        setIndex(indx)
        newScence()
    }
    const handleFileChangeCover = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const url = event.target.src?.[0];
        if (file) {
            // Process the selected file here (e.g., upload, preview, etc.)
            console.log('Selected file:', file);
            setSfile(file || null);
            console.log('url')
            setDisplaySImage(url)
        }
    }
    useEffect(()=>{
        fetch(`/api/getbook/${bid}`).then(res => res.json()).then(data =>{
            setTitle(data['title']);
            fetch(`/api/get-project-details/${bid}`).then(resp => resp.json()).then(details =>{
                let meta: Meta = details;
                meta.len = details['len']
                meta.list = details['attributes']
                setMeta(meta!)
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
        askGPT()
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [index, max, msg])

    return (
       <div className='page' style={{width:'100%', flex:2, display:'flex', backgroundColor:'transparent', paddingTop:3, justifyContent:'center', height:'calc(100% - 8px)',
           overflow:'auto'
       }}>
           <div style={{width:'100%', height:'calc(100% - 140px)', position:'absolute', background:'transparent', zIndex:43, visibility:addVisibility||'hidden', opacity:addOpacity,
               flex:1, display:'flex', justifyContent:'center', transition:'0.2s ease'
                 }} >
               <div style={{width:'30%',backgroundColor:'rgba(4,11,21,0.76)', borderRadius:20, backdropFilter:'blur(2.6px)',
                   justifyContent:'center', alignItems:'center', height:100, display:'flex', marginTop:100 ,boxShadow:'0px 3px 6px rgba(253,22,234,0.23)'}}>
                   <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                       <input style={{border:'none', borderRadius:4, width:16, color:'#eee'}} placeholder='1' id='nav'/>
                       <p style={{marginRight:10, marginLeft:10}}>of {max}</p>
                       <button className='highlight-dark' onClick={nav}>Navigate</button>
                       <button className='highlight-dark' style={{marginLeft:10,color:'#c25454'}} onClick={closeNavigate}>Close</button>
                   </div>
               </div>
           </div>
           <div style={{width:'100%', position:'absolute', background:'transparent', zIndex:43, visibility:imgVisibility||'hidden', opacity:imgOpacity,
               flex:1, display:'flex', justifyContent:'center', transition:'0.2s ease'
           }} >
               <div style={{width:'40%',minWidth:300,backgroundColor:'rgba(6,14,26,0.68)', borderRadius:20, backdropFilter:'blur(2.6px)', margin:20 , boxShadow:'0px 3px 6px rgba(253,22,234,0.23)',
                    padding: 50, justifyContent:'center', alignItems:'center',  display:'flex', overflowY:'auto'}}>
                   <div>
                       <div style={{display:'flex', justifyContent:'center'}}>
                            <img src={ai} width={40}/>
                       </div>
                       <div style={{display:'flex', justifyContent:'center', alignItems:'center', }}>
                            <input style={{border:'none', borderRadius:4,  color:'#eee'}} placeholder='AI: /Your prompt Here' id='gen'/>

                       </div>
                       <div style={{display:'flex', justifyContent:'center'}}>
                           <img src={genImg} width={300} style={{borderRadius:20, marginBottom:20}} id='save'/>
                       </div>

                       <div style={{display:'flex', justifyContent:'center', alignItems:'center',marginBottom:20 }}>
                           <input style={{border:'none', borderRadius:4,  color:'#eee'}} placeholder='Name your Image here' id='gen_name'/>

                       </div>
                       <div style={{display:'flex', flex:3, justifyContent:'center'}}>
                           <button style={{padding:10}} className='orangex shOrange' onClick={generateImg}>Generate</button>
                           <button style={{marginLeft:10, padding:10}} className='redx shRed' onClick={closeImgGen}>Close</button>
                           <button style={{marginLeft:10, padding:10}} className='bluex shBlue' onClick={download}>Download</button>
                       </div>
                   </div>
               </div>
           </div>

           <div style={{width:'calc(100% - 0px)', maxWidth:1500 ,justifySelf:'right', zIndex:2}}>
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

                   <div style={{width: '100%', height: 500, flex: 2, display: 'flex',flexWrap:'wrap', order:2, flexDirection:'row', justifyContent:'center'}}>
                       <div style={{width: '50%', height: '100%', minWidth:340}}>

                           <div style={{
                               margin: 30,
                               borderRadius: 30,
                               backgroundColor: 'rgba(49,30,42,0.45)',
                               height: 'calc(100% - 80px)',
                               width: 'calc(100% - 60px)',
                               backdropFilter: 'blur(7.0px)',
                               overflow :'auto',
                               display: 'flex',
                               justifyContent: 'center',
                               textAlign:'center',
                           }}>
                               <div style={{margin:30, width:'80%'}}>
                               <p style={{fontSize:30}}>Meta<span style={{color:'#ce4045', fontWeight:'bold'}}>Data</span></p>
                                   <div style={{height:290, overflow:'auto', width:'100%'}}>
                                       {meta !== undefined?
                                           <div>
                                               <div style={{display:'flex'}}>
                                                   <div className='circle' style={{background:'white'}}></div><div className='circle' style={{background:'#4eb9b5'}}></div><div className='circle' style={{background:'#9e4eb9'}}></div>
                                               </div>
                                               <p style={{color:'#ddd'}}> The Attributes</p>
                                               <div style={{display:'flex', flexWrap:'wrap', order:'2'}}>
                                                   {meta.list.map(att =>{
                                                       return <div className='highlight-dark' style={{margin:6, color:'#aaa'}}>{att}</div>
                                                   })}
                                               </div>

                                               <p style={{color:'#ddd'}}><span style={{fontWeight:'bold'}}>Number of rows:</span> <span style={{color:'#ea37b1'}}>{meta.len}</span></p>
                                           </div>
                                       :<div></div>}
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div style={{width: '50%', height: '100%', minWidth:340}}>
                           <div style={{
                               margin: 30,
                               borderRadius: 30,
                               backgroundColor: 'rgba(27,21,30,0.51)',
                               height: 'calc(100% - 80px)',
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
               </div>


           </div>
       </div>
    );
}

export default UpdateBookPC;
