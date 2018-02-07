import React from 'react';
import PropTypes from 'prop-types';
import DataSend from '../components/DataSend';
import {myEvents} from './Events';

import './RecordControl.css';
import CheckInfo from './CheckInfo';

class RecordControl extends React.PureComponent{

  constructor(props){
    super(props);
    this.state={
      flagRender:false,
      flagInfoRender:false,       //флаг, запускающий всплытие информационного блока CheckInfo
    };
    this.newSnArr=[];             //массив для хранения отсканированных в данной сессии номеров
  }

  QueryTypeAction=['noActionRecordControl','deleteItem','pushToServer']           //типы событий инициирующих диалоговое окно
  currentQueryType=''                                                             //переменная для передачи текущего типа события в компонент "CheckInfo"
  arrCheckedSn=[]       //массив помеченных на удаление отсканированных в данной сессии номеров
  infoWindowText=''     //переменная для текста всплывающих окон confirm 
  infoWindowType=''     //переменная для задания типа всплывающего окна; либо 'confirm', либо простое окно с одной кнопкой OK при любом другом значении

  componentDidMount=()=>{
    myEvents.addListener('dataSnReceive',this.receiveData);
    myEvents.addListener('checkItemControl',this.getChecked);
    myEvents.addListener('InfoFrameControl',this.infoWindowHandler);
  };

  componentWillUnmount=()=>{
    myEvents.removeListener('dataSnReceive',this.receiveData);
    myEvents.removeListener('checkItemControl',this.getChecked);
    myEvents.removeListener('InfoFrameControl',this.infoWindowHandler);    
  };

  receiveData=(acceptArr)=>{      //прием массива значений от компонента input, проверка на повторное значение, контроль обновления 
    if (acceptArr.length>0){
      let renderCycle=false;
      for (let val of acceptArr){ 
        if (this.newSnArr.find(v=>v.sn==val.sn)===undefined){
          this.newSnArr.push(val);
          renderCycle=true;               //массив изменился, флаг поднят, будем рендерить
        }
      }
      if (renderCycle){
        this.newSnArr.sort((a,b)=>{                            
        if (a.sn.toLowerCase() > b.sn.toLowerCase()) return 1;
        if (a.sn.toLowerCase() < b.sn.toLowerCase()) return -1;
        return 0;
        });
        this.setState({flagRender:!this.state.flagRender});
      }
    }
  }

  getChecked=(valSn, flag)=>{             //получает от DataSend данные по отмеченным записям
    if (flag) 
      this.arrCheckedSn.push(valSn)
    else 
      this.arrCheckedSn.splice(this.arrCheckedSn.findIndex(v=>v==valSn),1);
  }

  infoWindowHandler=(flag, typeEvent)=>{
    switch (typeEvent){
      case this.QueryTypeAction[0]:
        this.setState({flagInfoRender:false});            
        break;
      case this.QueryTypeAction[1]:
        if (flag) this.deleteItem();
        this.setState({flagInfoRender:false});            
        break;
      case this.QueryTypeAction[2]:
        if (flag) this.pushToServer();
        this.setState({flagInfoRender:false});
        break;
      }
  }

  deleteItem=()=>{
    let controlLength=(this.arrCheckedSn.length>0);
    for (let val of this.arrCheckedSn){
      this.newSnArr.splice(this.newSnArr.findIndex(v=>v.sn==val),1);
    }
    this.arrCheckedSn=[];
    if (controlLength)
      this.setState({flagRender:!this.state.flagRender});
  }

  deleteItemQuery=()=>{
    if (this.arrCheckedSn.length>0){
      this.infoWindowText='Выделенные записи будут удалены из списка!! Вы уверены?'
      this.infoWindowType='confirm';
    }
    else{
      this.infoWindowText='Нет выделенных записей!!'
      this.infoWindowType='';
    }
    this.currentQueryType=this.QueryTypeAction[1];
    this.setState({flagInfoRender:true});
  }

  pushToServerQuery=()=>{
    this.infoWindowText='Записать данные?'
    this.infoWindowType='confirm';
    this.currentQueryType=this.QueryTypeAction[2];
    this.setState({flagInfoRender:true});
  }

  sendDataToServer=()=>{
    let data=new FormData();
    let sendData=JSON.stringify(this.newSnArr);
    data.append('data', sendData);
    let url="http://ljanka.by/testwork/hndlrin.php"
    let request=new XMLHttpRequest();
    request.addEventListener('load',this.showProcess);
    request.open("POST", url, true);
    request.send(data);
  }

  showProcess=(EO)=>{
    let data=EO.target;
    if(data.status==200) console.log('JS код 200');
  }

  pushToServer=()=>{
    this.sendDataToServer();
    this.arrCheckedSn=[];
    this.newSnArr=[];
    console.log('Данные отправлены');
  }

  render(){

    console.log('Render RecordControl');

    let newSnArrRender;
    let buttonBlock;
    if (this.newSnArr.length>0){
      newSnArrRender=this.newSnArr.map(v=><DataSend key={v.sn} item={v}/>);
      buttonBlock=(
        <div className="ButtonBlock">
          <div className="Button" onClick={this.deleteItemQuery}>Удалить выделенные записи</div>
          <div className="Button" onClick={this.pushToServerQuery}>Записать данные</div>
        </div>
      )
    }
    else {
      newSnArrRender=<div>нет данных сканирования кодов</div>;
      buttonBlock='';
    }

    return(
      <div className="RecordControl">
        <div>
          <h3>Контроль сканированных серийных номеров:</h3>
          <div className="ScanList">
            {newSnArrRender}
          </div>
          <p><i>{`Количество записей, подготовленных к отправке на сервер:${this.newSnArr.length}`}</i></p>
          {buttonBlock}
          {this.state.flagInfoRender&&<CheckInfo CheckType={this.infoWindowType} QueryMaster='RecordControl' QueryEvent={this.currentQueryType} CheckText={this.infoWindowText}/>}
        </div>
      </div>
    )

  }

}

export default RecordControl;