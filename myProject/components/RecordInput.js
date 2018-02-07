import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents, myEvents} from './Events';

import './RecordInput.css';
import CheckInfo from './CheckInfo';

class RecordInput extends React.PureComponent {

  static propTypes={                  //ajax здесь прикрутить!!
    goods:PropTypes.arrayOf(
        PropTypes.shape(
          {
            sn: PropTypes.string.isRequired,
            vendor: PropTypes.string.isRequired,
            class: PropTypes.string.isRequired,
            subclass: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
          }
        )
    )
  }

  DEFVAL='none'                         //константа для значения невыбранного значения (значения по умолчанию) select
  FIELD_ADD_TEXT='Новое значение'       //константа для значения поля ADD в select

  constructor(props){
    super(props);
    this.state={
      vendor:this.DEFVAL,
      class:this.DEFVAL,      
      name:this.DEFVAL,
      subclass:this.DEFVAL,
      flagInfoRender:false,
      flagExtRender:false,
    };
    this.workDateArr=this.props.goods.map(v=>v);
    this.vendorArr=this.setArray('vendor');       //массив вендоров текущей сессии (выдается в select)
    this.vendorArr.push(this.FIELD_ADD_TEXT);
  }

  nameArr=[]              //массив имен текущей сессии (выдается в select)
  classArr=[]             //массив классов товара текущей сессии (выдается в select)
  subclassArr=[]          //массив подклассов товара текущей сессии (выдается в select)
  prevGoods={}            //хэш для хранения данных первого товара при групповой записи с ключом keyGroupFill=true
  keyEdit=false           //ключ, запускающий всплывющие окна, в т.ч. ввода новых значений
  keyComplete=false       //ключ, открывающий окно введения кода, когда описания товара выставлены верно
  keyGroupFill=false      //ключ, запускающий режим групповой записи
  keySecondCycleGroupFill=false  //ключ 2 этапа режима групповой записи

  QueryTypeAction=['noActionRecordInput','formInputVendor','formInputName','formInputClass','formInputSubclass']         //типы событий инициирующих диалоговое окно
  currentQueryType=''                                         //переменная для передачи текущего типа события в компонент "CheckInfo"
  infoWindowText=''     //переменная для текста всплывающих окон confirm,input 
  infoWindowType=''     //переменная для задания типа всплывающего окна; либо 'confirm', либо простое окно с одной кнопкой OK при любом другом значении

  componentDidMount=()=>{
    myEvents.addListener('InfoFrameInput',this.infoWindowHandler);
  }

  componentWillUnmount=()=>{
    myEvents.removeListener('InfoFrameInput',this.infoWindowHandler);    
  }

  componentDidUpdate=()=>{
    if(this.RefSnField) this.RefSnField.focus();
  }

  validationRE=(re,val)=>{
    if (val!='')
      if (!re.test(val))
        return true;
    return false;
  }

  infoWindowHandler=(flag, typeEvent)=>{
    let valueInput;
    if (this.RefInputField) valueInput=this.RefInputField.value;  //для окон с input предаем значение ниже
    switch (typeEvent){
      case this.QueryTypeAction[0]:                       //реакция на обычное информационное окно
        this.setState({flagInfoRender:false});            
        break;
      case this.QueryTypeAction[1]:                       //реакция на окно добавления vendor
        if (flag&&(valueInput.trim().length>0)&&this.validationRE(/[а-яА-ЯЁё<>]/,valueInput)
          &&(this.vendorArr.find(v=>v==valueInput)===undefined)){
          let valueInputModify=valueInput.trim().toUpperCase();
          this.vendorArr.pop();
          this.vendorArr.push(valueInputModify);
          this.vendorArr.sort();
          this.vendorArr.push(this.FIELD_ADD_TEXT);
          this.nameArr.push(this.FIELD_ADD_TEXT);
          this.setState({flagInfoRender:false, vendor:valueInputModify});         
        }
        else{
          this.RefVendor.options[0].selected=true;
          this.nameArr=[];
          this.currentQueryType=this.QueryTypeAction[0];
          this.infoWindowType='';
          this.infoWindowText='Некорректный ввод! Попробуйте еще раз!';
          if (flag) this.setState({flagExtRender:!this.state.flagExtRender})
          else this.setState({flagInfoRender:false});
        }    
        break;
      case this.QueryTypeAction[2]:             //реакция на окно добавления name
        if (flag&&(valueInput.trim().length>0)&&this.validationRE(/[а-яА-ЯЁё<>]/,valueInput)
            &&(this.nameArr.find(v=>v==valueInput)===undefined)){
          let valueInputModify=valueInput.trim().toUpperCase();
          this.nameArr.pop();
          this.nameArr.push(valueInputModify);
          this.nameArr.sort();
          this.nameArr.push(this.FIELD_ADD_TEXT);
          this.classArr=this.setArray('class');
          this.classArr.push(this.FIELD_ADD_TEXT);   
          this.setState({flagInfoRender:false, name:valueInputModify});         
        }
        else{
          this.classArr=[];
          this.subclassArr=[];
          this.RefName.options[0].selected=true;
          this.currentQueryType=this.QueryTypeAction[0];
          this.infoWindowType='';
          this.infoWindowText='Некорректный ввод! Попробуйте еще раз!';
          if (flag) this.setState({name:this.DEFVAL, flagExtRender:!this.state.flagExtRender})
          else this.setState({name:this.DEFVAL, flagInfoRender:false});
        }    
        break;
        case this.QueryTypeAction[3]:             //реакция на окно добавления class
        if (flag&&(valueInput.trim().length>0)&&(this.classArr.find(v=>v==valueInput)===undefined)){
          let valueInputModify=valueInput.trim();
          this.classArr.pop();
          this.classArr.push(valueInputModify);
          this.classArr.sort();
          this.classArr.push(this.FIELD_ADD_TEXT);
          this.subclassArr=[];
          this.subclassArr.push(this.FIELD_ADD_TEXT);   
          this.setState({flagInfoRender:false, class:valueInputModify});         
        }
        else{
          this.subclassArr=[];
          this.RefClass.options[0].selected=true;
          this.currentQueryType=this.QueryTypeAction[0];
          this.infoWindowType='';
          this.infoWindowText='Некорректный ввод! Попробуйте еще раз!';
          if (flag) this.setState({flagExtRender:!this.state.flagExtRender, class:this.DEFVAL})
          else this.setState({flagInfoRender:false, class:this.DEFVAL});
        }    
        break;
        case this.QueryTypeAction[4]:             //реакция на окно добавления subclass
        if (flag&&(valueInput.trim().length>0)&&(this.subclassArr.find(v=>v==valueInput)===undefined)){
          let valueInputModify=valueInput.trim();
          this.subclassArr.pop();
          this.subclassArr.push(valueInputModify);
          this.subclassArr.sort();
          this.subclassArr.push(this.FIELD_ADD_TEXT);
          this.keyComplete=true;
          this.workDateArr.push({             //добавляем новый продукт в текущую сессию
            sn:'',
            vendor:this.state.vendor,
            name:this.state.name,
            class:this.state.class,      
            subclass:valueInputModify
          });
          this.setState({flagInfoRender:false, subclass:valueInputModify});         
        }
        else{
          this.RefSubClass.options[0].selected=true;
          this.currentQueryType=this.QueryTypeAction[0];
          this.infoWindowType='';
          this.infoWindowText='Некорректный ввод! Попробуйте еще раз!';
          if (flag) this.setState({flagExtRender:!this.state.flagExtRender, subclass:this.DEFVAL})
          else  this.setState({flagInfoRender:false, subclass:this.DEFVAL});
        }    
        break;
      }
  }

  //обработчик связанных значений массива workDateArr; выдает массив по ключам 'name' у которых значения ключей 'nameParent' равны
  //'valueParent'; если два последних аргумента отсутствуют - выдает массив неповторяющихся отсортированных значение ключей 'name'
  setArray=(name, valueParent, nameParent)=>{       //  
    let tmpArr=[];                                 //
    this.workDateArr.forEach(v=>{
      if (valueParent&&nameParent){
          if (v[nameParent]==valueParent)
            tmpArr.push(v[name]);
      }
      else tmpArr.push(v[name]);
    });
    let outArr=[];
    for (let val of tmpArr){ 
      if (!outArr.some(v=>v==val)) outArr.push(val);
    }
    outArr.sort((a,b)=>{                             
      if (a.toLowerCase() > b.toLowerCase()) return 1;         
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      return 0;
    });
    return outArr;
  }

  vendorHandler=(EO)=>{
    this.keyComplete=false;
    this.keyGroupFill=false;
    this.keySecondCycleGroupFill=false;
    let val=EO.target.value;
    if (val==this.FIELD_ADD_TEXT){
      this.currentQueryType=this.QueryTypeAction[1];
      this.infoWindowText='Введите новое имя вендора:';
      this.infoWindowType='confirm';
      this.nameArr=[];
      this.classArr=[];
      this.subclassArr=[];
      this.setState({flagInfoRender:true, name:this.DEFVAL, class:this.DEFVAL, subclass:this.DEFVAL});
    }
    else{
      this.nameArr=this.setArray('name',val,'vendor');
      this.nameArr.push(this.FIELD_ADD_TEXT);
      this.classArr=[];
      this.subclassArr=[];
      this.setState({vendor:val, name:this.DEFVAL, class:this.DEFVAL, subclass:this.DEFVAL});
    }
  }

  nameHandler=(EO)=>{
    this.keyComplete=false;
    this.keyGroupFill=false;
    this.keySecondCycleGroupFill=false;
    let val=EO.target.value;
    if (val==this.FIELD_ADD_TEXT){
      this.currentQueryType=this.QueryTypeAction[2];
      this.infoWindowText=`Введите новый товар для вендора ${this.state.vendor}:`;
      this.infoWindowType='confirm';
      this.classArr=[];
      this.subclassArr=[];
      this.setState({flagInfoRender:true, class:this.DEFVAL, subclass:this.DEFVAL});
    }
    else{
      let recordDate=this.workDateArr.find(v=>v.vendor==this.state.vendor&&v.name==val);
      if (recordDate===undefined){
        this.classArr=this.setArray('class');
        this.classArr.push(this.FIELD_ADD_TEXT);
        this.subclassArr=[];
        this.setState({name:val, class:this.DEFVAL, subclass:this.DEFVAL});
      }
      else{
        this.classArr=[recordDate.class];
        this.subclassArr=[recordDate.subclass];
        this.keyComplete=true;
        this.setState({name:val,class:recordDate.class,subclass:recordDate.subclass});
      }
    }
  }

  classHandler=(EO)=>{
    this.keyComplete=false;
    this.keyGroupFill=false;
    this.keySecondCycleGroupFill=false;
    let val=EO.target.value;
    if (val==this.FIELD_ADD_TEXT){
      this.currentQueryType=this.QueryTypeAction[3];
      this.infoWindowText='Введите новую группу товара';
      this.infoWindowType='confirm';
      this.subclassArr=[];
      this.setState({flagInfoRender:true, subclass:this.DEFVAL});
    }
    else{
      let recordDate=this.workDateArr.find(v=>v.class==val);
      if (recordDate===undefined){
        this.subclassArr=[];
        this.subclassArr.push(this.FIELD_ADD_TEXT);
        this.setState({class:val, subclass:this.DEFVAL});
      }
      else{
        this.subclassArr=this.setArray('subclass',val,'class');
        this.subclassArr.push(this.FIELD_ADD_TEXT);
        this.setState({class:val,subclass:this.DEFVAL});
      }
    }
  }

  subclassHandler=(EO)=>{
    this.keyComplete=false;
    this.keyGroupFill=false;
    this.keySecondCycleGroupFill=false;
    let val=EO.target.value;
    if (val==this.FIELD_ADD_TEXT){
      this.currentQueryType=this.QueryTypeAction[4];
      this.infoWindowText=`Введите новую подгруппу для группы:${this.state.class}`;
      this.infoWindowType='confirm';
      this.setState({flagInfoRender:true});
    }
    else{
      this.keyComplete=true;
      this.workDateArr.push({             //добавляем новый продукт в текущую сессию
        sn:'',
        vendor:this.state.vendor,
        name:this.state.name,
        class:this.state.class,      
        subclass:val
      });
      this.setState({subclass:val});
    }
  }

  radioInputSingleHandler=(EO)=>{
    if (EO.target.value=='on'){
      this.keyGroupFill=false;
      this.keySecondCycleGroupFill=false;
    }
    this.RefSnField.focus();
  }

  radioInputGroupHandler=(EO)=>{
    if (EO.target.value=='on'){
      this.keyGroupFill=true;
      this.keySecondCycleGroupFill=false;
    }
    this.RefSnField.focus();
    this.currentQueryType=this.QueryTypeAction[0];
    this.infoWindowType='';
    this.infoWindowText='Включен режим сканирования группы!';
    this.setState({flagInfoRender:true});
  } 

  //выдает массив данных по интервалу между vStart и vStop(включительно) при условии различия только последних разрядов 
  //lastDigit - количество последних разрядов, по которым идет сравнение
  fillNumber=(vStart,vStop,lastDigit)=>{  
    let resultArr=[];
    if ((vStart.length==vStop.length)&&
        (vStart.slice(0, -lastDigit)===vStop.slice(0, -lastDigit))&&
        (Number.isInteger(parseInt(vStart.substr(-lastDigit), 10)))&&
        (Number.isInteger(parseInt(vStop.substr(-lastDigit), 10)))){
        let beginPart=vStart.slice(0,-lastDigit);
        let indexStart=parseInt(vStart.substr(-lastDigit), 10);
        let indexStop=parseInt(vStop.substr(-lastDigit), 10);
        let indexBegin;
        let indexEnd;
        if (indexStart<indexStop){
          indexBegin=indexStart+1;        //значение с номером соответсвующим indexStart уже передано в inputControl
          indexEnd=indexStop;
        }
        else{
          indexBegin=indexStop;
          indexEnd=indexStart-1;
        }
        for (let i=indexBegin; i<=indexEnd; i++){
          let addNull='00000000000000000';            //добиваем нулями слева до необходимой длины
          let str=(addNull+i).slice(-lastDigit);
          resultArr.push(beginPart+str);
        }
    }
    return resultArr;
  }

  inputSnHandler=(EO)=>{
    if (EO.charCode==13){
      if (this.validationRE(/[а-яА-Я<>//='"]/, EO.target.value)){
        let newGoodsArr=[];
        let newGoods={
          sn: EO.target.value.trim(), 
          vendor: this.state.vendor,
          name: this.state.name,
          class: this.state.class, 
          subclass: this.state.subclass
        };
        if (this.keyGroupFill){
          if (this.keySecondCycleGroupFill){
            let arrGroupSn=[];
            if ((this.prevGoods.vendor==newGoods.vendor)&&(this.prevGoods.name==newGoods.name)&&
                (this.prevGoods.class==newGoods.class)&&(this.prevGoods.subclass==newGoods.subclass)){
                  arrGroupSn=this.fillNumber(this.prevGoods.sn, newGoods.sn, 2);
            };
            if (arrGroupSn.length>0){
              this.keySecondCycleGroupFill=false;
              for (let v in arrGroupSn){
                newGoodsArr.push({
                  sn:arrGroupSn[v],
                  vendor:this.prevGoods.vendor,
                  name:this.prevGoods.name,
                  class:this.prevGoods.class,
                  subclass:this.prevGoods.subclass
                });
              }
              EO.target.value='';
              myEvents.emit('dataSnReceive', newGoodsArr);
              this.currentQueryType=this.QueryTypeAction[0];
              this.infoWindowType='';
              this.infoWindowText='Групповой режим! Последний серийный номер группы принят!';
              this.setState({flagInfoRender:true});
            }
            else{
              this.keySecondCycleGroupFill=false;
              this.currentQueryType=this.QueryTypeAction[0];
              this.infoWindowType='';
              this.infoWindowText='Групповой режим! Ошибка заполнения! Номера не идентичны, либо изменено описание товара! Ппоробуйте еще раз!';
              this.setState({flagInfoRender:true});
            }
          }
          else {
            this.prevGoods=newGoods;
            this.keySecondCycleGroupFill=true;
            newGoodsArr.push(newGoods);
            EO.target.value='';
            myEvents.emit('dataSnReceive', newGoodsArr);
            this.currentQueryType=this.QueryTypeAction[0];
            this.infoWindowType='';
            this.infoWindowText='Групповой режим! Первый серийный номер группы принят!';
            this.setState({flagInfoRender:true});
          }
        }
        else{
          newGoodsArr.push(newGoods);
          EO.target.value='';
          myEvents.emit('dataSnReceive', newGoodsArr);
        }
      }
      else{
        this.currentQueryType=this.QueryTypeAction[0];
        this.infoWindowType='';
        this.infoWindowText='Введенный номер не соответствует формату или значение не введено! Проверьте правильность ввода и убедитесь, что латинский алфавит включен!';
        this.setState({flagInfoRender:true});
      }
    }
  }

  render() {

    console.log('Render RecordInput');

    let vendorRender=this.vendorArr.map(v=>{
      let selectFlag;
      if ((v==this.state.vendor)){
        selectFlag=true;
      }
      else selectFlag=false;
      return(
        <option key={v} value={v} selected={selectFlag}>{v}</option>
      )
    });
    vendorRender.unshift(<option className="title" key={this.DEFVAL} value={this.DEFVAL} disabled>Выберите производителя</option>);

    let nameRender=this.nameArr.map(v=>{
      let selectFlag;
      if ((v==this.state.name)){
        selectFlag=true;
      }
      else selectFlag=false;
      return(
        <option key={v} value={v} selected={selectFlag}>{v}</option>
      )
    });
    nameRender.unshift(<option className="title" key={this.DEFVAL} value={this.DEFVAL}>Выберите модель</option>);

    let classRender=this.classArr.map(v=>{
      let selectFlag;
      if ((v==this.state.class)){
        selectFlag=true;
      }
      else selectFlag=false;
      return(
        <option key={v} value={v} selected={selectFlag}>{v}</option>
      )
    });

    let subclassRender=this.subclassArr.map(v=>{
      let selectFlag;
      if ((v==this.state.subclass)){
        selectFlag=true;
      }
      else selectFlag=false;
      return(
        <option key={v} value={v} selected={selectFlag}>{v}</option>
      )
    });

    if (!this.keyComplete){
      classRender.unshift(<option className="title" key={this.DEFVAL} value={this.DEFVAL}>Выберите тип</option>);
      subclassRender.unshift(<option className="title" key={this.DEFVAL} value={this.DEFVAL}>Выберите подтип</option>);
    }

    let myAddInput=<input type="text" ref={(ref)=>{this.RefInputField=ref}}/>;

    return (
      <div className="RecordInput">
        <div className="RecordInputForm">
          <h3>Данные товара:</h3>
          <div className="InputBox">
            <div>
              <span>Производитель</span><br/>
              <select ref={(ref)=>{this.RefVendor=ref}} defaultValue={this.state.vendor} onChange={this.vendorHandler}>
                {vendorRender}
              </select>
            </div>
            <div>
              <span>Модель</span><br/>
              <select ref={(ref)=>{this.RefName=ref}} onChange={this.nameHandler}>
                {nameRender}
              </select>
            </div>
            <div>
              <span>Группа</span><br/>
              <select ref={(ref)=>{this.RefClass=ref}} onChange={this.classHandler}>          
                {classRender}
              </select>
            </div>
            <div>
              <span>Подгруппа</span><br/>
              <select ref={(ref)=>{this.RefSubClass=ref}} defaultValue={this.state.subclass} onChange={this.subclassHandler}>
                {subclassRender}
              </select>
            </div>
          </div>
        </div>
        <div className="RecordInputField">
        <h3>Ввод серийного номера:</h3>        
          {this.keyComplete
          ? <div>
              <input type="text" className="Sn" ref={(ref)=>{this.RefSnField=ref}} onKeyPress={this.inputSnHandler}/>
              <div className="radioBlock">
                <label><input type="radio" defaultChecked name="browser" onChange={this.radioInputSingleHandler}/><span>сканировать поэлементно</span></label>
                <br/>
                <label><input type="radio" name="browser" onChange={this.radioInputGroupHandler}/><span>сканировать группу</span></label>
              </div>
              <div className='InfoBar'>
                <h4>Вввод серийного номера для товара:</h4>
                <p><i>{`${this.state.vendor} ${this.state.name} (${this.state.class} ${this.state.subclass})`}</i></p>
              </div>
            </div>
          : <div>
              <input type="text" className="Sn" disabled/>
              <p className="waitingGoods">Ожидание ввода данных товара</p>
            </div>
          }
          {this.state.flagInfoRender&&
           <CheckInfo CheckType={this.infoWindowType} QueryEvent={this.currentQueryType} QueryMaster='RecordInput' CheckText={this.infoWindowText}>
              {(this.currentQueryType!=this.QueryTypeAction[0])&&myAddInput}
           </CheckInfo>
          }
        </div>
      </div>
    )

  }
}

export default RecordInput;