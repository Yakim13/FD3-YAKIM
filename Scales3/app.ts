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

    constructor(){
        let curWght:number=Math.floor((Math.random()/2+0.2)*100)/100;
        super('Apple', curWght);
    }
}


class Tomato extends Product{

    constructor(){
        let curWght:number=Math.floor((Math.random()/2+0.1)*100)/100;        
        super('Tomato', curWght);
    }
}


class Scale{

    scalePan:Array<Product>=[];     

    add(_item:Product):void{
        this.scalePan.push(_item);
        console.log(`Добавляем на весы ${_item.getName()} с весом ${_item.getScale()}`)
    }

    getSumScale():void{
        let totalWeight:number=0;
        for (let val of this.scalePan) totalWeight+=val.getScale();
        console.log(`Общий вес продуктов на весах:${totalWeight}`);
    }

    getNameList():void{
        console.log('На весах сейчас:');
        for (let val of this.scalePan){ 
            console.log(`${val.getName()} с весом ${val.getScale()}`);
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