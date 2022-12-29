import { observable,action,makeObservable } from "mobx";
class Test1Store{
    state1="wusih";
    setState(data:string){
        this.state1=data;
    }
    constructor(){
        makeObservable(this,{
            state1:observable,
            setState:action
        })
    }
}
export default Test1Store;