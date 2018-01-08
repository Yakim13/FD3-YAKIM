class Product{

    name:string;
    weight:number;

    constructor(_name:string,_weight:number){
        this.name=_name; 
        this.weight=_weight;
        console.log((`Создан ${this.name} с весом:${this.weight}`))
    }

    getScale():number{
        return this.weight;
    }

    getName():string{
        return this.name;
    }

}


class Apple extends Product{

    getWeight():number{                 //как в super засунуть результат этого метода в качестве аргумента??
        return Math.floor((Math.random()/2+0.2)*100)/100;
    }

    constructor(){
        super('Apple', Math.floor((Math.random()/2+0.2)*100)/100);
    }
}


class Tomato extends Product{

    constructor(){
        super('Tomato', Math.floor((Math.random()/2+0.1)*100)/100);
    }
}


class Scale{

    scalePan:Array<string>=[]
    totalWeight:number=0;

    add(_item:Product):void{
        this.totalWeight+=_item.getScale();
        this.scalePan.push(_item.getName());
        console.log(`добавлен ${_item.getName()} на весы`);
    }

    getSumScale():void{
        console.log(`Общий вес продуктов на весах:${this.totalWeight}`);
    }

    getNameList():void{
        console.log('На весах сейчас:');
        for (let val of this.scalePan){ 
            console.log(val);
        }
    }
}

let a1=new Apple;
let t1=new Tomato;
let scal=new Scale;
scal.add(a1);
scal.getNameList();
scal.getSumScale();
scal.add(t1);
scal.getNameList();
scal.getSumScale();
let a2=new Apple;
let t2=new Tomato;
scal.add(a2);
scal.add(t2);
scal.getNameList();
scal.getSumScale();