var BoxInputText = React.createClass({
    
    propTypes:{
        defValue:React.PropTypes.string.isRequired,
        cbReturnValue:React.PropTypes.func.isRequired,
    },

    sendTxt: function(EO){
        this.props.cbReturnValue(EO.target.value);
    },

    render: function(){
        return React.DOM.div({className:'BoxInputText'},
                React.DOM.label(null,
                    React.DOM.span(null,'Поиск: '),
                    React.DOM.input({type:'text', defaultValue:this.props.defValue, onChange:this.sendTxt}),
                )
        );
    },

});