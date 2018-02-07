import React from 'react';
import PropTypes from 'prop-types';
import { myEvents } from './Events';

import './CheckInfo.css';

class CheckInfo extends React.PureComponent {

  static propTypes={
    CheckText: PropTypes.string.isRequired,
    QueryMaster: PropTypes.string.isRequired,
    QueryEvent: PropTypes.string.isRequired,     //привязка к событию, инициирующему окно
    CheckType: PropTypes.string,                //если 'confirm' выводит окно с двумя кнопками 'ок' и 'нет'
  };

  static defaultProps={
    CheckType:'',                               //по умолчанию выводит обычное окно предупреждения с кнопкой 'ok'
  }

  TYPE_QUERY_MASTER=['RecordControl','RecordInput']

  pushButtonOK=()=>{
    switch (this.props.QueryMaster){
      case this.TYPE_QUERY_MASTER[0]:
        myEvents.emit('InfoFrameControl', true, this.props.QueryEvent);        
        break;
      case this.TYPE_QUERY_MASTER[1]:
        myEvents.emit('InfoFrameInput', true, this.props.QueryEvent);
        break;
    }
  }

  pushButtonNO=()=>{
    switch (this.props.QueryMaster){
      case this.TYPE_QUERY_MASTER[0]:
        myEvents.emit('InfoFrameControl', false, this.props.QueryEvent);        
        break;
      case this.TYPE_QUERY_MASTER[1]:
        myEvents.emit('InfoFrameInput', false, this.props.QueryEvent);
        break;
    }    
  } 

  render() {

    console.log('Render CheckInfo');

    let buttonBlock=(
      <div className="ButtonBlock">
        <div className="Button" onClick={this.pushButtonOK}>OK</div>
        {this.props.CheckType=='confirm'&&
          <div className="Button" onClick={this.pushButtonNO}>Нет</div>
        }
      </div>
    )  

    return (
      <div className="HideBlock">
        <div className="CheckInfo">
          <div>
            <span>{this.props.CheckText}</span>
          </div>
          {this.props.children}
          {buttonBlock}
        </div>
      </div>
    )

  }

}

export default CheckInfo;