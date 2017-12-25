var GoodsEdit = React.createClass({

    propTypes:{
        code:React.PropTypes.number.isRequired,
        name:React.PropTypes.string,
        desc:React.PropTypes.string,
        price:React.PropTypes.number,
        qnt:React.PropTypes.number,
        statusButtonOk:React.PropTypes.string.isRequired,
        cbExitEdit:React.PropTypes.func.isRequired,
        cbSaveEdit:React.PropTypes.func.isRequired,
    },

    getDefaultProps: function(){
        return{
            name:'',
            desc:'',
            price:0,
            qnt:0,
        }
    },

    getInitialState: function(){
        return{
            code:this.props.code,
            name:this.props.name,
            desc:this.props.desc,
            price:(this.props.price==0)?'':this.props.price,
            qnt:(this.props.qnt==0)?'':this.props.qnt,
        }
    },

    validKey:{},                                //хэш ключей валидации

    nameHandler: function(EO){                  //валидация name с корректным приведением значений
        if (EO.target.value==''){                   //проверка на непустое поле name
            EO.target.style.background='#FCC';
            this.validKey.name=false;
        }
        else{
            EO.target.style.background='#FFF';
            this.validKey.name=true;           
        };
        this.setState({name:EO.target.value.trim().toUpperCase()});    
    },

    priceHandler: function(EO){                                         //валидация price с корректным приведением значений
        if (/[^0-9.]/.test(EO.target.value||EO.target.value=='')){
            EO.target.style.background='#FCC';
            this.validKey.price=false;
        }
        else{
            EO.target.style.background='#FFF';
            this.validKey.price=true;           
        };
        this.setState({price:Math.round(Number(EO.target.value)*100)/100});    
    },

    qntHandler: function(EO){                                           //валидация qnt с корректным приведением значений
        if (/[^0-9]/.test(EO.target.value||EO.target.value=='')){
            EO.target.style.background='#FCC';
            this.validKey.qnt=false;
        }
        else{
            EO.target.style.background='#FFF';
            this.validKey.qnt=true;           
        };
        this.setState({qnt:parseInt(EO.target.value)});    
    },

    descHandler: function(EO){                                    //desc - корректное приведение значений
        this.setState({desc:EO.target.value.trim().toLowerCase()});    
    },

    saveFormDate: function(){                                  //отправляем данные родителю, предварительно очищаем хэш флагов валидации
        for (k in this.validKey) delete this.validKey[k];
        this.props.cbSaveEdit(this.state)
    },
    
    checkValidDate: function(){                     //используем для проверки хэш флагов, проверяем их наличие и состояние
        if (this.props.statusButtonOk=='Save'){
            if (Object.keys(this.validKey).length==0) this.saveFormDate()
            else{
                var joinKey=true;
                for (k in this.validKey) {
                    joinKey=joinKey&&this.validKey[k]; 
                }
                if (joinKey) this.saveFormDate()
            }
        } 
        else{
            if (Object.keys(this.validKey).length==3){
                var joinKey=true;
                for (k in this.validKey) joinKey=joinKey&&this.validKey[k]; 
                if (joinKey) this.saveFormDate()                
            }
        }
    },

    render: function(){
        return  React.DOM.div({className:'hideBlock'},
                React.DOM.div({className:'goodsEdit'},
                    React.DOM.div({className:'goodsInput'},
                        React.DOM.label({htmlFor:'name'}, 'Название товара:'),
                        React.DOM.input({type:'text', id:'name', defaultValue:this.state.name, onChange:this.nameHandler})
                    ),
                    React.DOM.div({className:'goodsInput'},
                        React.DOM.label({htmlFor:'price'}, 'Цена:'),
                        React.DOM.input({type:'text', id:'price', defaultValue:this.state.price, onChange:this.priceHandler})
                    ),
                    React.DOM.div({className:'goodsInput'},
                        React.DOM.label({htmlFor:'qnt'}, 'Количество:'),
                        React.DOM.input({type:'text', id:'qnt', defaultValue:this.state.qnt, onChange:this.qntHandler})
                    ),
                    React.DOM.div({className:'goodsInput'},
                        React.DOM.label({htmlFor:'desc'}, 'Описание:'),
                        React.DOM.textarea({id:'desc', defaultValue:this.state.desc, onChange:this.descHandler})
                    ),
                    React.DOM.div(null,
                        React.DOM.button({onClick:this.checkValidDate},this.props.statusButtonOk),
                        React.DOM.button({onClick:this.props.cbExitEdit},'Exit')
                    )
            )
        )
    }
});

  