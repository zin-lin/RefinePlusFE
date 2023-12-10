import React, {useEffect, useState} from "react";
import {Provider, useSelector} from "react-redux";
import {useLoginSelector, useLoginDispatch, useAuthSelector, useAuthDispatch} from "../../redux/hook";
import {toBook, toLogin, toProfile, toRegister} from "../../redux/authState";


export default function EventPC (){

    return (
        <div className="pc">

        </div>
    );

}