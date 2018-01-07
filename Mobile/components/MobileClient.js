import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    cbSelectClient:PropTypes.func.isRequired,
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fio: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  state = {
    info: this.props.info,
  };

  componentWillReceiveProps = (newProps) => {
    console.log("MobileClient id="+this.props.info.id+" componentWillReceiveProps");
    this.setState({info:newProps.info});
  };

  selectClient=()=>{
    this.props.cbSelectClient(this.state.info)
  }

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");
    
    return (
      <div className='MobileClient' onClick={this.selectClient}>
        <span className='MobileClientFIO'>{this.state.info.fio}</span>
        <span className={this.state.info.balance<0?'MobileClientBalance Blocked':'MobileClientBalance'}>{this.state.info.balance}</span>
      </div>
    );

  }

}

export default MobileClient;
