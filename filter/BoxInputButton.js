var BoxInputButton = React.createClass({

    propTypes:{
        defValue:React.PropTypes.bool.isRequired,
        cbReturnValue:React.PropTypes.func.isRequired,
    },

    sendKey: function(EO){
        this.props.cbReturnValue(EO.target.checked);
    },

    render: function(){
        return React.DOM.div({className:'BoxInputButton'},
                React.DOM.label(null,
                    React.DOM.input({type:'checkbox', checked:this.props.defValue, onChange:this.sendKey}),
                    React.DOM.span(null,' - сортировать по алфавиту')
                )
        );
    },
}); 