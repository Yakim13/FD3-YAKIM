import React from 'react';
import PropTypes from 'prop-types';

import './GoodsItem.css';

class GoodsItem extends React.Component{

    static propTypes={
        name:PropTypes.string.isRequired,
        code:PropTypes.number.isRequired,
        desc:PropTypes.string,
        qnt:PropTypes.number.isRequired,
        price:PropTypes.number.isRequired,
        keyEdit:PropTypes.bool.isRequired,
        cbEditClick:PropTypes.func.isRequired,
        cbDelClick:PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
        this.handlerButtonDel=this.handlerButtonDel.bind(this);
        this.handlerButtonEdit=this.handlerButtonEdit.bind(this);
     }

    handlerButtonDel(){
        if (!this.props.keyEdit) this.props.cbDelClick(this.props.code);
    }

    handlerButtonEdit(){
        if (!this.props.keyEdit) this.props.cbEditClick(this.props.code);
    }

    render(){
        return(
            <tr className='goodsItem'>
                <td>{this.props.name}</td>
                <td>{this.props.desc}</td>
                <td>{this.props.price.toFixed(2)}</td>
                <td>{this.props.qnt}</td>
                <td>
                    <button onClick={this.handlerButtonEdit}>Edit</button>
                    <button onClick={this.handlerButtonDel}>Delete</button>
                </td>
            </tr>
        )                
    }
};

export default GoodsItem;

  