import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

import ColorFrame from './ColorFrame';

class RainbowFrame extends React.Component{

    static propTypes = {
        colorList:PropTypes.arrayOf(
            PropTypes.string.isRequired
         )
    }

    state = {
        triggerRender: false,        
    }

    intColorsArr=[]                             //массив с которым будет работать компонент

    buttonHandler=()=>{                         //запускаем новый рендеринг
        let revKey=!this.state.triggerRender;
        this.setState({triggerRender:revKey});
    }

    componentWillMount(){                       //клонируем массив цветов props
        this.intColorsArr=this.props.colorList.map(v=>v);
    }

    componentWillUpdate(){                  //рандомизируем цветрамок перед очередным рендер
        this.intColorsArr.sort((a,b)=>Math.random()-0.5);
    }

    RepeatFrameBuild(arrPos) {              //построение элемента - рекурсия
        return( 
            <ColorFrame color={this.intColorsArr[arrPos]}>
                {arrPos===0
                    ?<button onClick={this.buttonHandler}>Change!</button>
                    :this.RepeatFrameBuild(arrPos-1)
                }
            </ColorFrame>
        );
    }

    render(){
        if (this.intColorsArr===undefined||this.intColorsArr.length==0)
            return(
                <span>Нет данных</span>
            )
            else return this.RepeatFrameBuild(this.intColorsArr.length-1);
    }
};

export default RainbowFrame;
