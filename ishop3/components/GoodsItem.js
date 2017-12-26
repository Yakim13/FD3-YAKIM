import React from 'react';

import './GoodsItem.css';

class GoodsItem extends React.Component{

    static propTypes = {
        name:React.PropTypes.string.isRequired,
        code:React.PropTypes.number.isRequired,
        desc:React.PropTypes.string,
        qnt:React.PropTypes.number.isRequired,
        price:React.PropTypes.number.isRequired,
        keyEdit:React.PropTypes.bool.isRequired,
        cbEditClick:React.PropTypes.func.isRequired,
        cbDelClick:React.PropTypes.func.isRequired,
    }

    handlerButtonDel(){
        if (!this.props.keyEdit) this.props.cbDelClick(this.props.code);
    }

    handlerButtonEdit(){
        if (!this.props.keyEdit) this.props.cbEditClick(this.props.code);
    }

    render(){
        return  React.DOM.tr({className:'goodsItem'},
                            React.DOM.td(null,this.props.name),
                            React.DOM.td(null,this.props.desc),
                            React.DOM.td(null,this.props.price.toFixed(2)),
                            React.DOM.td(null,this.props.qnt),
                            React.DOM.td(null,
                                React.DOM.button({onClick:this.handlerButtonEdit},'Edit'),
                                React.DOM.button({onClick:this.handlerButtonDel},'Delete'),
                            )
        )
    }
};

export default GoodsItem;

  