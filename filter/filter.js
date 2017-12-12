var Filter = React.createClass({

    propTypes:{
        textBlock:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                text: React.PropTypes.string,
                code: React.PropTypes.number,
            })
        )
    },

    getInitialState: function(){
        return{
            textSearch:'',              //текст поиска
            keySort:false,              //ключ сортировки по алфавиту
        }
    },

    receiverTxt: function(userInputTxt){            //callback для строки поиска
        this.setState({textSearch:userInputTxt});
    },

    receiverKey: function(userInputKey){        //calback для ключа сортировки по алфавиту
        this.setState({keySort:userInputKey});
    },

    render: function(){
        if (this.props.textBlock.length>0){
            var cloneTextSearch=this.state.textSearch;                   //!!??выужден ввести переменную, поскольку не смог затащить this.state.xx в callback-функцию для filter (?c помощью thisArg?)
            var arrChanged=this.props.textBlock.filter(function(v,i,a){            //клонируем массив с помощью filter с учетом данных строки поиска
                return v.text.toLowerCase().indexOf(cloneTextSearch.toLowerCase())!==-1;    //поиск регистронезависимый
                }
            );
            if (this.state.keySort){                        //сортируем полученный после filter массив, если необходимо
                arrChanged.sort(function(a,b){
                    if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;         //регистронезависимая сортировка
                    if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
                    return 0;
                });
            };
            var outListCode=arrChanged.map(function(v,i,a){
                    return  React.DOM.option({key:v.code}, v.text);
                    }
            );
            return React.DOM.div(null,                  //рисуем блок
                React.createElement(BoxInputText,{defValue:this.state.textSearch,cbReturnValue:this.receiverTxt}),
                React.createElement(BoxInputButton,{defValue:this.state.keySort, cbReturnValue:this.receiverKey}),
                React.DOM.div({className:'BoxList'}, React.DOM.select({size:"8"}, outListCode))
                );
        }                
        else return React.DOM.div({className:'BoxList'},        //другой сценарий вывода, если массив данных пустой
                        React.DOM.span(null,'Нет данных!')
                    );
    },
});