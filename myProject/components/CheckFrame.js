import React from 'react';
import PropTypes from 'prop-types';

import './CheckFrame.css';
import FrameBoxContent from './FrameBoxContent';

class CheckFrame extends React.PureComponent {

  constructor(props){
    super(props);
    this.state={
      outputInfo:this.OUTPUT_INFO_DEFAULT,        //статус получения информации
      flagFrameBox: false,                        //флаг вывода информационного окна
    };
    this.loadData();
  }

  OUTPUT_INFO_DEFAULT='Ожидается ввод серийного номера'     //начальное значение переменной state
  innerBoxContent=''            //элемент внутреннего содержимого всплывающего компонента FrameBoxContent
  snArr=[]                      //массив для хранения полученных с сервера через AJAX значений серийных номеров
  messageBox=''                 //переменная для передачи тектового заголовка всплывающего компонента FrameBoxContent
  timer=0                      //таймер для алгоритма закрытия всплывающего компонента FrameBoxContent

  loadData=()=>{
    let url="http://localhost/hndlrout.php";
    //let url="http://ljanka.by/testwork/hndlrout.php"
    let request=new XMLHttpRequest();
    request.responseType='json';
    request.addEventListener('load',this.endRequest);
    //request.addEventListener('loadstart',this.startRequest);	
    //request.addEventListener('progress',this.statusRequest);
    request.open("POST", url, true);
    request.send(null);
  }
  
  startRequest=()=>{          //метод для отображения процесса загрузки ?перспектива
    this.innerBoxContent=(<progress value="0" max="100">0%</progress>);
  }

  statusRequest=(EO)=>{       //метод для отображения процесса загрузки ?перспектива
    if (EO.lengthComputable){
      let per=parseInt(EO.loaded/EO.total*100);
      this.innerBoxContent=(<progress value={per} max="100">{per}%</progress>);
    }
  }

  endRequest=(EO)=>{
    let data=EO.target;
    if (data.status==200){
      this.snArr=data.response;
      this.messageBox="Данные успешно загружены!";
      this.innerBoxContent=`Код ответа сервера:${data.status}, Статус:${data.statusText}`;
      setTimeout(this.closeFrameBox,500);
      this.setState({flagFrameBox:true});
    }
    else{
      this.messageBox="Ошибка загрузки!";      
      this.innerBoxContent=`Код ответа сервера:${data.status}, Статус:${data.statusText}`;
      setTimeout(this.closeFrameBox,1000);
      this.setState({flagFrameBox:true});      
    }
  }

  closeFrameBox=()=>{
    if (this.timer){
      clearTimeout(this.timer);
      this.timer=0;
    }
    this.setState({flagFrameBox:false});
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
        {this.state.flagFrameBox&&
          <FrameBoxContent message={this.messageBox}>
            {this.innerBoxContent}
          </FrameBoxContent>
        }
      </div>
    )
  
  }
}

export default CheckFrame;