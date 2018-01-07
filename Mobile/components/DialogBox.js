import React from 'react';
import PropTypes from 'prop-types';

import './DialogBox.css';

class DialogBox extends React.PureComponent{

    static propTypes = {
        id:PropTypes.number,
        fio:PropTypes.string,
        buttonResume:PropTypes.arrayOf(PropTypes.string),    //количество и надпись на кнопках диалогового окна
        noticeText:PropTypes.string,
        statusButtonOk:PropTypes.string,
        cbExitEdit:PropTypes.func,
        cbSaveEdit:PropTypes.func,
    }

    state = {
        id:this.props.id,
        fio:this.props.fio,
        balance:this.props.balance,
    }

    render(){
        console.log('DialogBox render');
        return(
            <div className='hideBlock'>
                <div className='Edit'>
                    {this.props.children}
                </div>
            </div>
        )
    }
};

export default DialogBox;