import React from 'react';
import PropTypes from 'prop-types';

import './GoodsEdit.css';

class GoodsEdit extends React.Component{

    static propTypes = {
        code:PropTypes.number.isRequired,
        name:PropTypes.string,
        desc:PropTypes.string,
        price:PropTypes.number,
        qnt:PropTypes.number,
        statusButtonOk:PropTypes.string.isRequired,
        cbExitEdit:PropTypes.func.isRequired,
        cbSaveEdit:PropTypes.func.isRequired,
    }

    static defaultProps ={
        name:'',
        desc:'',
        price:0,
        qnt:0,
    }

    state = {
        code:this.props.code,
        name:this.props.name,
        desc:this.props.desc,
        price:(this.props.price==0)?'':this.props.price,
        qnt:(this.props.qnt==0)?'':this.props.qnt,
    }

    validKey={}                                //хэш ключей валидации

    nameHandler(EO){                  //валидация name с корректным приведением значений
        if (EO.target.value==''){                   //проверка на непустое поле name
            EO.target.style.background='#FCC';
            this.validKey.name=false;
        }
        else{
            EO.target.style.background='#FFF';
            this.validKey.name=true;           
        };
        this.setState({name:EO.target.value.trim().toUpperCase()});    
    }

    priceHandler(EO){                                         //валидация price с корректным приведением значений
        if (/[^0-9.]/.test(EO.target.value||EO.target.value=='')){
            EO.target.style.background='#FCC';
            this.validKey.price=false;
        }
        else{
            EO.target.style.background='#FFF';
            this.validKey.price=true;           
        };
        this.setState({price:Math.round(Number(EO.target.value)*100)/100});    
    }

    qntHandler(EO){                                           //валидация qnt с корректным приведением значений
        if (/[^0-9]/.test(EO.target.value||EO.target.value=='')){
            EO.target.style.background='#FCC';
            this.validKey.qnt=false;
        }
        else{
            EO.target.style.background='#FFF';
            this.validKey.qnt=true;           
        };
        this.setState({qnt:parseInt(EO.target.value)});    
    }

    descHandler(EO){                                    //desc - корректное приведение значений
        this.setState({desc:EO.target.value.trim().toLowerCase()});    
    }

    saveFormDate(){                                  //отправляем данные родителю, предварительно очищаем хэш флагов валидации
        for (let k in this.validKey) delete this.validKey[k];
        this.props.cbSaveEdit(this.state)
    }
    
    checkValidDate(){                     //используем для проверки хэш флагов, проверяем их наличие и состояние
        if (this.props.statusButtonOk=='Save'){
            if (Object.keys(this.validKey).length==0) this.saveFormDate()
            else{
                var joinKey=true;
                for (let k in this.validKey) {
                    joinKey=joinKey&&this.validKey[k]; 
                }
                if (joinKey) this.saveFormDate()
            }
        } 
        else{
            if (Object.keys(this.validKey).length==3){
                var joinKey=true;
                for (let k in this.validKey) joinKey=joinKey&&this.validKey[k]; 
                if (joinKey) this.saveFormDate()                
            }
        }
    }

    render(){
        return(
            <div className='hideBlock'>
                <div className='goodsEdit'>
                    <div className='goodsInput'>
                        <label htmlFor='name'>Название товара:</label>
                        <input type='text' id='name' defaultValue={this.state.name} onChange={::this.nameHandler}/>
                    </div>
                    <div className='goodsInput'>
                        <label htmlFor='price'>Цена:</label>
                        <input type='text' id='price' defaultValue={this.state.price} onChange={::this.priceHandler}/>
                    </div>
                    <div className='goodsInput'>
                        <label htmlFor='qnt'>Количество:</label>
                        <input type='text' id='qnt' defaultValue={this.state.qnt} onChange={::this.qntHandler}/>
                    </div>
                    <div className='goodsInput'>
                        <label htmlFor='desc'>Описание:</label>
                        <textarea id='desc' defaultValue={this.state.desc} onChange={::this.descHandler}/>
                    </div>
                    <div>
                        <button onClick={::this.checkValidDate}>{this.props.statusButtonOk}</button>
                        <button onClick={::this.props.cbExitEdit}>Exit</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default GoodsEdit;

  