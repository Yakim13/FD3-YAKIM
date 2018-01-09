import React from 'react';
import PropTypes from 'prop-types';

import './ClientEdit.css';

class ClientEdit extends React.PureComponent{

    static propTypes = {
        id:PropTypes.number.isRequired,
        fio:PropTypes.string,
        balance:PropTypes.number,
        statusButtonOk:PropTypes.string,
        cbExitEdit:PropTypes.func.isRequired,
        cbSaveEdit:PropTypes.func.isRequired,
    }

    static defaultProps ={
        fio:'',
        balance:0,
    }

    statePseudo={
        id:this.props.id,
        fio:this.props.fio,
        balance:this.props.balance,
    }

    validKey={}                                //хэш ключей валидации

    fioNewRef=null;                             //ссылка на поле ввода фамилии

    balanceNewRef=null;                         //ссылка на поле ввода баланса

    set_balanceNewRef=(ref)=>{
        this.balanceNewRef=ref;
    };

    set_fioNewRef=(ref)=>{
      this.fioNewRef=ref;
    };
  
    fioHandler=()=>{                        //в боевой версии обязательно завернуть в if(this.fioNewRef)!!!
        if (this.fioNewRef.value==''){                  
            this.fioNewRef.style.background='#FCC';
            this.validKey.name=false;
        }
        else{
            this.fioNewRef.style.background='#FFF';
            this.validKey.name=true;           
        };
        this.statePseudo.fio=this.fioNewRef.value.trim().toLowerCase().split(' ').map(v=>v.charAt(0).toUpperCase()+v.slice(1)).join(' ');
    }

    balanceHandler=()=>{                            //в боевой версии обязательно завернуть в if(this.balanceNewRef)!!!            
        if (/[^0-9.-]/.test(this.balanceNewRef.value||this.balanceNewRef.value=='')){
            this.balanceNewRef.style.background='#FCC';
            this.validKey.price=false;
        }
        else{
            this.balanceNewRef.style.background='#FFF';
            this.validKey.price=true;           
        };
        this.statePseudo.balance=Math.round(Number(this.balanceNewRef.value)*100)/100;    
    }

    saveFormDate=()=>{                                  //отправляем данные родителю, предварительно очищаем хэш флагов валидации
        for (let k in this.validKey) delete this.validKey[k];
        this.props.cbSaveEdit(this.statePseudo)
    }
    
    checkValidDate=()=>{                     //используем для проверки хэш флагов, проверяем их наличие и состояние
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
            if (Object.keys(this.validKey).length==2){
                var joinKey=true;
                for (let k in this.validKey) joinKey=joinKey&&this.validKey[k]; 
                if (joinKey) this.saveFormDate()                
            }
        }
    }


    render(){
        console.log('ClientEdit render');
        return(
            <div className='hideBlock'>
                <div className='Edit'>
                    <div className='Input'>
                        <label htmlFor='name'>Фамилия:</label>
                        <input type='text' id='name' defaultValue={this.statePseudo.fio} 
                            ref={this.set_fioNewRef} onChange={this.fioHandler}/>
                    </div>
                    <div className='Input'>
                        <label htmlFor='balance'>Баланс:</label>
                        <input type='text' id='balance' defaultValue={this.statePseudo.balance==0?'':this.statePseudo.balance} 
                            ref={this.set_balanceNewRef} onChange={this.balanceHandler}/>
                    </div>         
                    <div>
                        <button onClick={this.checkValidDate}>{this.props.statusButtonOk}</button>
                        <button onClick={this.props.cbExitEdit}>Exit</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default ClientEdit;

  