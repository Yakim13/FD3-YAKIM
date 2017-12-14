var goodsEdit = React.createClass({

    propTypes:{
        defValue:React.PropTypes.shape({
            name:React.PropTypes.string.isRequired,
            desc:React.PropTypes.string,
            price:React.PropTypes.number.isRequired,
            qnt:React.PropTypes.number.isRequired,
        }),
        statusButtonOk:React.PropTypes.string,
        cbExitEdit:React.PropTypes.func.isRequired,
    },

    render: function(){
        return  React.DOM.div(null,
                    React.DOM.label(null,
                        React.DOM.span(null,'Название товара: '),
                        React.DOM.input({type:'text', defaultValue:this.props.defValue.name}),
                        React.DOM.br(null)
                    ),
                    React.DOM.label(null,
                        React.DOM.span(null,'Цена: '),
                        React.DOM.input({type:'text', defaultValue:this.props.defValue.price}),
                        React.DOM.br(null)
                    ),
                    React.DOM.label(null,
                        React.DOM.span(null,'Количество: '),
                        React.DOM.input({type:'text', defaultValue:this.props.defValue.qnt}),
                        React.DOM.br(null)
                    ),
                    React.DOM.label(null,
                        React.DOM.span(null,'Описание: '),
                        React.DOM.textarea({defaultValue:this.props.defValue.desc}),
                        React.DOM.br(null)
                    ),
                    React.DOM.div(null,
                        React.DOM.button(null,this.props.statusButtonOk),
                        React.DOM.button({onClick:this.props.cbExitEdit},'Exit')
                    )
        )
    }
});

  