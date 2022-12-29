import React,{useState} from 'react';
import {Animal,Cat} from './test';
// import Store  from '../Store';
import { inject, observer } from 'mobx-react';
import { Button ,Input} from 'antd';
import CryptoJS from 'crypto-js';

const Home=inject('test1Store')(observer((props:any)=>{
    const {test1Store}=props;
const [input,setInput]=useState('');
const encryptByDES=(message: string, key: string)=> {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const option = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, option);
    return encrypted.ciphertext.toString();
  }
return(
    <div>
    <Input value={input} onChange={(e)=>setInput(e.target.value)}></Input>
    <div>{test1Store.state1}</div>
    <Button onClick={()=>console.log(encryptByDES(input,'wsh'))}></Button>
    </div>
)}
));
 
export default  Home;