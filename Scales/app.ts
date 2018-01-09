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

    pieceOnScale:[string,number];           //!!?? добавить в качестве type или как-то иначе
    scalePan:Array<[string,number]>=[];     //!!?? внутрь содержимого Array не удалось!!
    totalWeight:number=0;

    add(_item:Product):void{
        this.totalWeight+=_item.getScale();
        this.scalePan.push([_item.getName(),_item.getScale()]);
        console.log(`Добавляем на весы ${_item.getName()} с весом ${_item.getScale()}`)
    }

    getSumScale():void{
        console.log(`Общий вес продуктов на весах:${this.totalWeight}`);
    }

    getNameList():void{
        console.log('На весах сейчас:');
        for (let val of this.scalePan){ 
            console.log(`${val[0]} с весом ${val[1]}`);
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