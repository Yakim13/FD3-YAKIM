function uniFactory<objtype>(classRef:{new(): objtype; }):objtype{
    return new classRef();
}

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

interface IStorageEngine{

    addItem(Product):void;
    getItem(index):Product;
    getCount():number;
}

class ScalesStorageEngineArray <Things extends Product> implements IStorageEngine{

    Things:Product;
    items:Array<Things>=[];

    addItem(item:Things):void{
        this.items.push(item);
        console.log(`Добавляем на весы (Array) ${item.getName()} с весом ${item.getScale()}`)
    }

    getItem(index){
        let Prod=this.items[index];
        return Prod;
    }

    getCount(){
        return this.items.length;
    }
}

class ScalesStorageEngineLocalStorage <Things extends Product> implements IStorageEngine{

    Things:Product;    
    counter:number;                     //класс написан с учетом что экземпляр этого класса будет только один
                                        //для этого url, иначе необходимо менять систему данных, поскольку для одного
    constructor(){                      //url доступно только одно localStorage
        localStorage.clear();
        this.counter=0;
    }

     addItem(item:Things):void{
        localStorage.setItem(this.counter.toString(),JSON.stringify(item));
        console.log(`Добавляем на весы(localStorage) ${item.getName()} с весом ${item.getScale()}`)
        this.counter++;
    }

    getItem(index){
        let prod:Things;
        if (localStorage[index.toString()]!==undefined)
            prod=<Things>JSON.parse(localStorage[index.toString()]);
        return prod;
    }

    getCount(){
        return localStorage.length;
    }
}

class Scales <StorageEngine extends IStorageEngine>{

    curStorage: IStorageEngine;

    constructor(_typeStorage){
        _typeStorage==ScalesStorageEngineLocalStorage
        ?this.curStorage=uniFactory(ScalesStorageEngineLocalStorage)
        :this.curStorage=uniFactory(ScalesStorageEngineArray);
    }

    add(item:Product):void{
        this.curStorage.addItem(item);
    }

    getSumScale():void{
        let totalWeight:number=0;
        for (let i=0; i<this.curStorage.getCount();i++)
            totalWeight+=this.curStorage.getItem(i).weight;     //.getScale() не получилось, потому что JSON.parse возвращает тип object
        console.log(`Общий вес продуктов на весах:${totalWeight}`);
    }

    getNameList():void{
        console.log('На весах сейчас:');
        for (let i=0; i<this.curStorage.getCount();i++){

            //вот это не работает с localStorage ??!!
            //вызов методов продукта невозможен, потому что JSON.parse возвращает тип object, а не Product
            // let weigth:number=this.curStorage.getItem(i).getScale();  
            //let name:string=this.curStorage.getItem(i).getName();
            
            let weigth:number=this.curStorage.getItem(i).weight;
            let name:string=this.curStorage.getItem(i).name;
            console.log(`${name} c весом ${weigth}`);
        }
    }
}



let a1=new Apple;
let a2=new Apple;
let a3=new Apple;
let t1=new Tomato;
let t2=new Tomato;
let t3=new Tomato;

let scalArr=new Scales<ScalesStorageEngineArray<Product>>(ScalesStorageEngineArray);
let scalStor=new Scales<ScalesStorageEngineLocalStorage<Product>>(ScalesStorageEngineLocalStorage);

scalArr.add(a1);
scalArr.add(a2);
scalArr.add(t1);
scalStor.add(a3);
scalStor.add(t2);
scalStor.add(t3);

scalArr.getNameList();
scalArr.getSumScale();

scalStor.getNameList();
scalStor.getSumScale();
