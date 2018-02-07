import React from 'react';
import PropTypes from 'prop-types';

import './CheckFrame.css';

class CheckFrame extends React.PureComponent {

  constructor(props){
    super(props);
    this.state={
      outputInfo:this.OUTPUT_INFO_DEFAULT,
    };
    //this.loadData();
  }

  OUTPUT_INFO_DEFAULT='Ожидается ввод серийного номера'     //начальное значение переменной state
  loadStatusInner=''

  snArr=[             //временное использование - пока для тестирования!!!
    {"sn":"000001","vendor":"NEOLINE","class":"Радар-детектор","subclass":"с GPS","name":"X-COP 7500s"},
    {"sn":"000002","vendor":"ALLIGATOR","class":"Автосигнализация","subclass":"двусторонняя","name":"SP-75RS"},
    {"sn":"000003","vendor":"ADVOCAM","class":"Автомобильный видеорегистратор","subclass":"без GPS","name":"FD BLACK"},
    {"sn":"000004","vendor":"PROLOGY","class":"Автомобильный ресивер","subclass":"USB/SD","name":"CMX-120"},
    {"sn":"000004","vendor":"PROLOGY","class":"Автомобильный ресивер","subclass":"USB/SD","name":"CMX-150"},
  ]

  loadData=()=>{
    let url="http://ljanka.by/testwork/serial.dat";
    //let url="base_sn.json";
    let request=new XMLHttpRequest();
    request.responseType='json';
    //request.addEventListener('loadstart',this.startRequest);	
    //request.addEventListener('progress',this.statusRequest);	
    request.addEventListener('load',this.endRequest);
    request.open("GET", url, true);
    request.send(null);
  }

  startRequest=()=>{
    this.loadStatusInner=(<progress value="0" max="100">0%</progress>);
  }

  statusRequest=(EO)=>{
    if (EO.lengthComputable){
      let per=parseInt(EO.loaded/EO.total*100);
      this.loadStatusInner=(<progress value={per} max="100">{per}%</progress>);
    }
  }

  endRequest=(EO)=>{
    let data=EO.target;
      if (data.status==200){
        this.snArr=data.response;
        console.log(this.snArr);            //убрать после тестирования!!
      }
  }
  
  inputSnHandler=(EO)=>{
    if (EO.charCode==13){               //запускаем процесс только по нажатию по нажатию enter
      let result=EO.target.value.trim();
      let text;
      let recordData=this.snArr.find(v=>v.sn==result);
      if (recordData===undefined){
        text=(
          <div>
          <p>К сожалению, серийный номер:</p>
          <p><strong>{result}</strong></p>
          <p>в базе отсутствует!!</p>
          </div>);
        this.setState({outputInfo:text});       
      }
      else {
        text=(
          <div>
            <p>Введенный серийный номер:</p>
            <p><strong>{recordData.sn}</strong></p>
            <p>есть в базе!!</p>
            <p>Описание продукта: {recordData.vendor} {recordData.name} ({recordData.class} {recordData.subclass})</p>
          </div>);
        this.setState({outputInfo:text});
      }
      EO.target.value='';
    }
  }

  nullSnHandler=(EO)=>{           //добавляем обработчик ввода номера, который возвращает начальный текст, если введенного значения не будет
    if (EO.target.value=='') this.setState({outputInfo:this.OUTPUT_INFO_DEFAULT});
  }

  render() {

    console.log('Render CheckFrame');

    return (
      <div className="CheckFrame">
        <h3>Проверка серийных номеров устройств:</h3>
        <br/>
        <p>Для проверки серийного номера устройства введите данные в окно ввода и нажмите "Enter"</p>
        <br/>
        <input type="text" autoFocus onKeyPress={this.inputSnHandler} onChange={this.nullSnHandler}/>
        <div className="OutputCheck">
          {this.state.outputInfo}
        </div>
      </div>
    )
  
  }
}

export default CheckFrame;