import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import ClientEdit from './ClientEdit';
import DialogBox from './DialogBox';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent{

  static propTypes = {
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fio: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    clients: this.props.clients,
    keyEdit: false,                   //ключ ренедеринга окна редактирования
    keyDialog: false,                 //ключ рендеринга диалогового окна при выборе клиента из списка
    keyWarning: false,                //ключ окна "Are You Sure?" подтверждения удаления клиента
    sortFioKey: false,                //ключ рендеринга - сортировка по ФИО
    sortBalanceKey: false,            //ключ рендеринга - сортировка по заблокированным клиентов
  };

  selectClientData = {};              //хэш для транзитного хранения данных выбранного (clicked) клиента

  modeEdit='';                        //режим отображения окна edit - компонент ClientEdit

  getID = ()=>{                       //получение id для нового добавлякмого клиента
    if (this.state.clients.length>0)
      return Math.max.apply(null, this.state.clients.map(v=>v.id))+1
      else return 100;
  }

  goEditAdd=()=>{                //запуск ренедеринга ClientEdit в режиме "добавление клиента"
    this.modeEdit='Add';
    this.setState({keyEdit:true});
  };

  goEditChange=()=>{            //запуск ренедеринга ClientEdit в режиме "редатирование клиента"
    this.modeEdit='Save';
    this.setState({keyEdit:true,keyDialog:false});
  }; 
  
  exitEdit=()=>{                      //выход из меню редактирования
    this.setState({keyEdit:false,keyDialog:false});
  }

  addNewClient=(receiveData)=>{                //callback - добавление нового клиента
    this.state.clients.push(receiveData);
    this.setState({keyEdit:false});
  }

  selectClient=(receiveData)=>{               //callback - получение данных выбранного (clicked) клиента
    this.selectClientData=receiveData;
    this.setState({keyDialog:true});
  }

  delClient=()=>{                             //удаление клиента
    let newClients=this.state.clients.filter(v=>v.id!=this.selectClientData.id);
    this.setState({clients:newClients,keyDialog:false,keyEdit:false,keyWarning:false});
  }

  editOldClient=(receiveData)=>{            //callback - изменение данных существующего клиента
    let changed=false;
    let newClients=[...this.state.clients];
    let index=newClients.findIndex((v)=>v.id==receiveData.id);
    if (index!=-1) 
      if ((newClients[index].fio!=receiveData.fio)||(newClients[index].balance!=receiveData.balance)) changed=true;
    if (changed){
      newClients[index]=receiveData;
      this.setState({clients:newClients});
    }
    this.setState({keyEdit:false});  
  }

  sortFio=(EO)=>{
    this.setState({sortFioKey:EO.target.checked});
  }

  sortBalance=(EO)=>{
    this.setState({sortBalanceKey:EO.target.checked});
  }  

  render(){
    console.log("MobileCompany render");

    let tempStateClients=this.state.clients.map(v=>v);

    if (this.state.sortFioKey)
      tempStateClients.sort((a,b)=>{
        if (a.fio.toLowerCase() > b.fio.toLowerCase()) return 1;
        if (a.fio.toLowerCase() < b.fio.toLowerCase()) return -1;
        return 0;
      });
    if (this.state.sortBalanceKey){
      let filterArr=tempStateClients.filter(v=>v.balance<0);
      tempStateClients=filterArr;
    }

    var clientsCode=tempStateClients.map(client=>
      <MobileClient key={client.id} info={client} cbSelectClient={this.selectClient}/>
    );
    if (clientsCode.length==0) clientsCode=<div>Нет данных</div>;   //случай когда заблокированных клиентов не будет
    let mode=(this.modeEdit=='Add');        //boolean variable - соблюдение принципа DRY
    return(
        <div className='MobileCompany'>
          <div className="propertySort">
            <span>Сортировка по имени </span><input type="checkbox" onChange={this.sortFio}/>
            <span>Только заблокированные</span><input type="checkbox" onChange={this.sortBalance}/>
          </div>
          <div className='MobileCompanyClients'>
            {clientsCode}
          </div>
          <button onClick={this.goEditAdd}>Add</button>
          {
            (this.state.keyEdit)&&
              <ClientEdit
                id={mode?this.getID():this.selectClientData.id}
                fio={mode?'':this.selectClientData.fio}
                balance={mode?0:this.selectClientData.balance}
                statusButtonOk={this.modeEdit}
                cbExitEdit={this.exitEdit}
                cbSaveEdit={mode?this.addNewClient:this.editOldClient}        
              />
          } 
          {
            (this.state.keyDialog)&&
              <DialogBox>
                <p>Данные клиента: {this.selectClientData.fio}</p>
                <div>
                  <button onClick={this.goEditChange}>Edit</button>
                  <button onClick={()=>{this.setState({keyWarning:true})}}>Delete</button>
                  <button onClick={()=>{this.setState({keyEdit:false,keyDialog:false})}}>Exit</button>
                </div>
              </DialogBox>
          }
          {
            (this.state.keyWarning)&&
              <DialogBox>
              <p>Вы уверены? Удалить?</p>
              <div>
                <button onClick={this.delClient}>Yes</button>
                <button onClick={()=>{this.setState({keyWarning:false})}}>No</button>
              </div>
            </DialogBox>            
          }          
        </div>
      );
 }
}

export default MobileCompany;
