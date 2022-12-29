export  class Animal{
    public name;
    constructor(name: string){
        console.log(this);//this——>Animal{name:undefined}
        this.name=name;
    }
    sayHi(){
        return `My name is ${this.name}`;
    }
}
export class Cat extends Animal{
    constructor(name:string){
        super(name); //调用父类的constructor(name)
        console.log(this);// this->Cat{name:undefined} this——>Cat{name:Tom}
    }
    sayHi(){
        return 'MEOW,'+super.sayHi();//调用父类的sayHi()
    }
}
