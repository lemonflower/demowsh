import { observable,makeObservable,action,computed } from "mobx";
import { Component, Provider } from "react";
import Test1Store from "./Test1Store";
import Home from "../Home";
 const test1Store=new Test1Store();
 export const stores={
    test1Store,
    // test2Store
 }
 
