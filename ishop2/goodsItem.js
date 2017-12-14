var goodsItem = React.createClass({

    propTypes:{
        name:React.PropTypes.string.isRequired,
        code:React.PropTypes.number.isRequired,
        desc:React.PropTypes.string,
        qnt:React.PropTypes.number.isRequired,
        price:React.PropTypes.number.isRequired,
        cbEditClick:React.PropTypes.func.isRequired,
        cbDelClick:React.PropTypes.func.isRequired,
    },

    handlerButtonDel: function(){
        this.props.cbDelClick(this.props.code);
    },

    handlerButtonEdit: function(){
        this.props.cbEditClick(this.props.code);
    },

    render: function(){
        return  React.DOM.tr(null,
                            React.DOM.td(null,this.props.name),
                            React.DOM.td(null,this.props.desc),
                            React.DOM.td(null,this.props.price),
                            React.DOM.td(null,this.props.qnt),
                            React.DOM.td(null,
                                React.DOM.button({onClick:this.handlerButtonEdit},'Edit'),
                                React.DOM.button({onClick:this.handlerButtonDel},'Delete'),
                            )
        )
    }
});

  