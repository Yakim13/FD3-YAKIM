var iShop = React.createClass({

    propTypes:{
        goods:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string,
                fotoLink: React.PropTypes.string,
                price: React.PropTypes.number,
                qnt: React.PropTypes.number,
            })
        )
    },

    render: function(){
        if (this.props.goods.length>0){
            var outTableCode=this.props.goods.map(function(v,i,a){
                return  React.DOM.tr({key:v.uniqueCode},
                            React.DOM.td(null,v.name),
                            React.DOM.td(null,
                                React.DOM.a({href:v.fotoLink,target:"blank"},"ссылка")),
                            React.DOM.td(null,v.price),
                            React.DOM.td(null,v.qnt),
                        )
                }
            );
            console.log(outTableCode);
            return  React.DOM.table(null,
                        React.DOM.caption(null, "Товары на складе"),
                        React.DOM.tbody(null,
                            React.DOM.tr(null, 
                                React.DOM.th(null,"Товар"),
                                React.DOM.th(null,"Описание"),
                                React.DOM.th(null,"Цена"),
                                React.DOM.th(null,"Количество")),
                            outTableCode
                        )
                    );
        }                
        else return React.DOM.div(null,
                        React.DOM.span(null,'Нет товаров')
                    );
    },

    //array.forEach
    /*
    render: function(){
        var outTableCode=[];
        this.props.goods.forEach(function(v,i,a){
              var block=React.DOM.tr({key:v.uniqueCode},
                            React.DOM.td(null,v.name),
                            React.DOM.td(null,
                                React.DOM.a({href:v.fotoLink,target:"blank"},"ссылка")),
                            React.DOM.td(null,v.price),
                            React.DOM.td(null,v.qnt),
                        )
                outTableCode.push(block);
            }
        );
        return  React.DOM.table(null,
                    React.DOM.caption(null, "Товары на складе"),
                    React.DOM.tbody(null,
                        React.DOM.tr(null, 
                            React.DOM.th(null,"Товар"),
                            React.DOM.th(null,"Описание"),
                            React.DOM.th(null,"Цена"),
                            React.DOM.th(null,"Количество")),
                        outTableCode
                    )
                );    
    },
    */

    //array.map - callback (function arrow)
    /*
    render: function(){
        var outTableCode=this.props.goods.map( v =>
            React.DOM.tr({key:v.uniqueCode},
                React.DOM.td(null,v.name),
                React.DOM.td(null,
                    React.DOM.a({href:v.fotoLink,target:"blank"},"ссылка")),
                React.DOM.td(null,v.price),
                React.DOM.td(null,v.qnt),
            )
        );
        return React.DOM.table(null,
                React.DOM.caption(null, "Товары на складе"),
                React.DOM.tr({key:01}, 
                  React.DOM.th(null,"Товар"),
                  React.DOM.th(null,"Описание"),
                  React.DOM.th(null,"Цена"),
                  React.DOM.th(null,"Количество")),
                outTableCode
            );    
    },
    */

});