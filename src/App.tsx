// Author: Zin Lin Htun
import './App.css';
import {HashRouter as R, Route, Routes} from 'react-router-dom'
import About from "./views/About";
import Home from "./views/Home";
import Nav from './components/Navigators/Nav';
import MobileNav from "./components/Navigators/MobileNav";
import Profile from "./views/Profile";
import React from 'react';
import {Provider} from "react-redux";
import authStore from "./redux/store";
import Search from "./views/Search";
import loginStore from "./redux/stateStores/loginStore";
import Events from "./views/Events";
import BookView from "./views/BookView";
import Books from './views/Books';
import UpdateBook from "./views/UpdateBook";
import EditBook from "./views/EditBook";
import EventAdd from "./views/EventAdd";
import EventView from "./views/EventView";
import Payment from "./views/Payment";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import {createProxyMiddleware, RequestHandler} from 'http-proxy-middleware';

// main app
function App() {
    const stripePromise = loadStripe('pk_live_51NxvYwD1g0rvAfP0LaRO56WuC4UHLpgzv3JygPCMUTFc9uzOyf1PnSJA6ENmn09wULD6EhAoBjBSTnh113umcF9J00cGlrblvo');


  return (
        // wrap around navigation
      <Elements stripe={stripePromise}>
        <R>
            <div className="App">
              <Nav/>
              <div className='rom-app'>
                    <Routes>
                        <Route element={<Home/>} path='/' />
                        <Route element={<About/>} path='/about' />
                        <Route element={<Profile/>} path='/profile' />
                        <Route element={<Events/>} path='/events' />
                        <Route element={<Search/>} path='/search' />
                        <Route element={<Books/>} path='/books' />
                        <Route path='/bookview/:bid' element={<BookView/>}  />
                        <Route path='/updatebook/:bid' element={<UpdateBook/>}  />
                        <Route path='/editbook/:bid' element={<EditBook/>}  />
                        <Route path='/eventadd/' element={<EventAdd/>}  />
                        <Route path='/eventview/' element={<EventView/>}  />
                        <Route path='/pay/:uid' element={<Payment/>}  />
                    </Routes>
              </div>
              <MobileNav/>
            </div>
        </R>
      </Elements>
  );
}

// Exporting app to bundles

export default App;
