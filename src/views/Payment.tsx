// Author : Zin Lin Htun
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {CardElement, useElements, useStripe,} from "@stripe/react-stripe-js";
import one from '../assets/cmx.png'
import ten  from '../assets/jedi.png'
import hun from '../assets/str.png'
import axios from "axios";


const Payment:React.FC = () =>{
    const {uid} = useParams();
    const stripe = useStripe(); const elements = useElements();
    type Visibility = 'visible' | 'hidden' | 'collapse';

    // introduce amount
    const [amount, setAmount] = useState(0);
    const [opacity, setOpacity]= useState(0)
    const [visibility, setVisibility] = useState<Visibility| undefined>('hidden');

    // handling submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // get card element
        const cardElement = elements.getElement(CardElement);
        if (!cardElement)
            return  // rturns if nothing
        const { token, error } = await stripe.createToken(cardElement); // only if exists
        if (error) {
            console.error(error);
            // Handle error
            return;
        }
        // Send the token to your server for further processing
        postPayment(token.id, amount);


        // Your payment processing logic goes here
    };

    // Posting payments to flask server
    const postPayment = (tid:string, amount:number) => {
        try{
            axios.post(`/api/pay/${tid}/${amount}`).then(res => res.data).then(
                data => {
                    alert(data)
                    setVisibility('hidden')
                    setOpacity(0)

                }
            ).catch(err=> alert(err))
        }catch (err){
            alert(err);
        }
    }

    // handle Card Payment UI
    const callCard = () =>{
        setOpacity(1.0);
        setVisibility('visible');
    }

    const closeCard = ()=>{
        setOpacity(0.0);
        setVisibility('hidden');
    }

    return (
        <div className='full-bg-img-book page' style={{height:'calc(100% - 83px)', display:'flex', flex:1, justifyContent:'center'}}>

            <div style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center', display:'flex', textAlign:'center', zIndex:23, position:'absolute',
            transition:'0.4s ease', visibility:visibility, opacity:opacity}}>
                <div style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                    <div style={{
                        width: '100%',
                        height:'100%',
                        alignItems:'center',
                        display: 'flex',
                        justifyContent: 'center',
                        background: ''
                    }}>

                        <div style={{
                            width: '40%',
                            minWidth: 400,
                            borderRadius: 30,
                            background: '#eee',
                            textAlign: 'center'
                        }}>
                            <form onSubmit={handleSubmit} style={{width: '100%'}}>
                                <br/>
                                <div style={{marginTop:40, marginLeft:40, marginRight:40}}>
                                    <CardElement/>
                                </div>
                                <br/>
                                <button className='bluex shBlue' style={{padding: 10, margin:40, marginBottom:10, width:120}} type="submit"
                                        disabled={!stripe}>Pay Now
                                </button>

                            </form>
                            <button className='redx shRed' style={{padding: 10, margin:10, marginBottom:32}} onClick={closeCard}>
                                Close Window
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{textAlign:'center', width:'100%',justifyContent:'center', alignItems:'center', height:'100%', }}>

                <p style={{fontSize:28}}>ComicsX <span style={{color:'#de4c4c'}}>Offers</span></p>
                <div style={{width:'100%', flex:3, minWidth:300, display:'flex', justifyContent:'center',  flexDirection:'row', order:2, flexWrap:'wrap', }}>
                    <div className='orangex shOrange' onClick={()=> {
                        setAmount(5)
                        callCard()
                         }}
                         style={{margin:20, letterSpacing:0.7, padding:0, paddingBottom:30, width:'30%', minWidth:300, transition:'0.4s ease',
                         borderRadius:30
                         }}>
                        <img src={one} width={'100%'} style={{borderRadius:'30px 30px 0px 0px'}}/>
                        <p>$5 for 65 HD images</p>
                    </div>

                    <div className='purplex shPurple' onClick={()=> {
                        setAmount(10)
                        callCard()
                    }}
                         style={{margin:20, letterSpacing:0.7, padding:0, paddingBottom:30, width:'30%', minWidth:300, transition:'0.4s ease',
                             borderRadius:30
                         }}>
                        <img src={ten} width={'100%'} style={{borderRadius:'30px 30px 0px 0px'}}/>
                        <p>$10 for 150 HD images (save $3)</p>
                    </div>

                    <div className='redx shRed' onClick={()=> {
                        setAmount(100)
                        callCard()
                    }}
                         style={{margin:20, letterSpacing:0.7, padding:0, paddingBottom:30, width:'30%', minWidth:300, transition:'0.4s ease',
                             borderRadius:30
                         }}>
                        <img src={hun} width={'100%'} style={{borderRadius:'30px 30px 0px 0px'}}/>
                        <p>$100 for 1720 HD images (save $40)</p>
                    </div>

                </div>



            </div>
        </div>
    )
}

export default Payment;