var iShop2 = React.createClass({

    propTypes:{
        goods:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name:React.PropTypes.string.isRequired,
                code:React.PropTypes.number.isRequired,
                desc:React.PropTypes.string,
                price:React.PropTypes.number.isRequired,
                qnt:React.PropTypes.number.isRequired,
            })
        ),
    },

    getInitialState: function(){
        return{
            intGoodsArr: this.props.goods.map(v =>v),       //клонируем массив props в state?? нужно ли в state?!
            keyEdit: false,                                 //ключ для появления поля редактирования параметров
            triggerState:false,                             //триггер запуска render
            statusButtonOk:'',                              //текстовая надпись для кнопки ok окна редактирования ??не нужно в state?
        }
    },

    formDefValue: {},

    getNewGoods: function(){            //новый товар
        this.formDefValue={
            name:'',
            desc:'',
            price:0,
            qnt:0,
        }; 
        this.setState({keyEdit:true,statusButtonOk:'Add'});
    },

    exitEditGoods: function(){                      //выход меню редактирования
        this.setState({keyEdit:false});
    },

    editGoodsInList: function(arg){             //вызов редактирования существующего элемента
        var index;
        this.state.intGoodsArr.some(function(v,i,a){    //ищем элемент удовлетворяющий условию - code вызвавшего поля
            index=i;                                    
            return v.code==arg;
        });
        console.log(this.state.intGoodsArr);
        this.formDefValue={
            name:this.state.intGoodsArr[index].name,
            desc:this.state.intGoodsArr[index].desc,
            price:this.state.intGoodsArr[index].price,
            qnt:this.state.intGoodsArr[index].qnt
        };    
        this.setState({keyEdit:true,statusButtonOk:'Save'});
    },

    delGoodsinList: function(arg){                      //вызов удаления существующего элемента
        if (confirm('Are You sure?'+arg)){
            var index;
            this.state.intGoodsArr.some(function(v,i,a){    //ищем элемент удовлетворяющий условию - code вызвавшего поля
                index=i;                                    //индекс элемента массива с требуемым полем "code" для удаления
                return v.code==arg;
            });
            this.state.intGoodsArr.splice(index,1);                     //удаляем элемент
            this.setState({triggerState:!this.state.triggerState});     //обновляем страницу
        }    
    },


    render: function(){
        if (this.state.intGoodsArr.length>0){
            this.state.intGoodsArr.sort(function(a,b){                             //храним масиив state в сортированном виде
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;         //регистронезависимая сортировка для красивого вывода
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
            var tempVarFunc={fEdit:this.editGoodsInList,fDel:this.delGoodsinList};
            var outTableCode=this.state.intGoodsArr.map(function(v,i,a){
                return React.createElement(goodsItem,
                    {key:v.code,name:v.name,code:v.code,desc:v.desc,price:v.price,qnt:v.qnt,cbEditClick:tempVarFunc.fEdit,cbDelClick:tempVarFunc.fDel});
                }
            );
            var tableBlock=React.DOM.table(null,
                        React.DOM.caption(null, "Товары на складе"),
                        React.DOM.tbody(null,
                            React.DOM.tr(null, 
                                React.DOM.th(null,"Товар"),
                                React.DOM.th(null,"Описание"),
                                React.DOM.th(null,"Цена"),
                                React.DOM.th(null,"Количество"),
                                React.DOM.td(null)),
                            outTableCode
                        )
                    );
            if (!this.state.keyEdit){
                return React.DOM.div(null,
                    tableBlock,
                    React.DOM.div(null,
                        React.DOM.button({onClick:this.getNewGoods},'New position')
                    )
                );
            }
            else return React.DOM.div(null,tableBlock,React.createElement(goodsEdit,
                {statusButtonOk:this.state.statusButtonOk,defValue:this.formDefValue,cbExitEdit:this.exitEditGoods}));
        }                
        else return React.DOM.div(null,React.DOM.span(null,'Нет товаров'));
    },
});

