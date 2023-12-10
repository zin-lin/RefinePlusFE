import React, {useEffect, useState} from "react";
import {Provider, useSelector} from "react-redux";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../redux/hook";
import {toBook, toLogin, toProfile, toRegister} from "../redux/authState";
import Flat from 'flatlist-react';
import  Board from './Activity';

type Props = {
messages: string []
}
type State = {
count: number
}
export class Activities extends  React.Component<Props,State>{

    render() {
        return (
            <div style={{width:"100%", height: '200px'}}>
                <div>
                    <Flat list = {this.props.messages} renderItem={(message=> <Board/>)}/>
                </div>
            </div>);
    }
}