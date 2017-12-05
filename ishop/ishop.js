var iShop = React.createClass({
    displayName: 'ishop',

    render:function(){
        return React.DOM.table('null',
            React.DOM.caption('null', "Товары на складах"),
            React.DOM.tr('null', 
                React.DOM.th('null',"Товар"),
                React.DOM.th('null',"Фото"),
                React.DOM.th('null',"Цена"),
                React.DOM.th('null',"Количество"),
            ),
            React.DOM.tr('null',
                React.DOM.td('null',"11"),
                React.DOM.td('null',"12"),
                React.DOM.td('null',"13"),
                React.DOM.td('null',"14"),        
            ),
            React.DOM.tr('null',
                React.DOM.td('null',"21"),
                React.DOM.td('null',"22"),
                React.DOM.td('null',"23"),
                React.DOM.td('null',"24"),        
            ),
            React.DOM.tr('null',
                React.DOM.td('null',"31"),
                React.DOM.td('null',"32"),
                React.DOM.td('null',"33"),
                React.DOM.td('null',"34"),        
            ),
            React.DOM.tr('null',
                React.DOM.td('null',"41"),
                React.DOM.td('null',"42"),
                React.DOM.td('null',"43"),
                React.DOM.td('null',"44"),        
            ),
        )   
    }
    
    // render:function(){
    //     return React.DOM.h1(
    //         {id:"red"}, 
    //         React.DOM.span('null',
    //             React.DOM.em('null',"Hell"),
    //             " o"),
    //         " world", 
    //         " что-то еще",
    //         React.DOM.br(null),
    //         React.DOM.a({href:"http://vk.com",target:"blank"}," ссылка VK"),
    //     );
    // },
    
});