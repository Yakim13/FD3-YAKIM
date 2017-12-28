import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

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
        return  DOM.tr({className:'goodsItem'},
                            DOM.td(null,this.props.name),
                            DOM.td(null,this.props.desc),
                            DOM.td(null,this.props.price.toFixed(2)),
                            DOM.td(null,this.props.qnt),
                            DOM.td(null,
                                DOM.button({onClick:this.handlerButtonEdit},'Edit'),
                                DOM.button({onClick:this.handlerButtonDel},'Delete'),
                            )
        )
    }
};

export default GoodsItem;

  