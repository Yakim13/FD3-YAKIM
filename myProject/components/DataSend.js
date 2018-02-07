import React from 'react';
import PropTypes from 'prop-types';
import {myEvents} from './Events';

import './DataSend.css';

class DataSend extends React.PureComponent{

  static propTypes={
    item:PropTypes.shape({
        sn: PropTypes.string.isRequired,
        vendor: PropTypes.string.isRequired,
        class: PropTypes.string.isRequired,
        subclass: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
  };

  checkBoxHandler=(EO)=>{
    myEvents.emit('checkItemControl', this.props.item.sn, EO.target.checked);
  }  

  render() {

    console.log('Render DataSend');

    return (
      <div className="DataSend">
        <label>
          <div className="ControlCheckBox">
            <input type="checkbox" onChange={this.checkBoxHandler}/>
          </div>
          <div className="ControlInfo">
            <span>
              SN:{this.props.item.sn} - {this.props.item.vendor} {this.props.item.name} ({this.props.item.class} {this.props.item.subclass})
            </span>
          </div>
        </label>
      </div>
    )

  }

}

export default DataSend;