import React from 'react';
import PropTypes from 'prop-types';

import './ishop3.css';

import GoodsEdit from './GoodsEdit';
import GoodsItem from './GoodsItem';

class IShop3 extends React.Component{

    static propTypes = {
        goods:PropTypes.arrayOf(
            PropTypes.shape({
                name:PropTypes.string.isRequired,
                code:PropTypes.number.isRequired,
                desc:PropTypes.string,
                price:PropTypes.number.isRequired,
                qnt:PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        keyEdit: false,                                 //ключ для появления поля редактирования параметров
        triggerState:false,                             //триггер запуска render                        
        intGoodsArr:this.props.goods.map(v =>v),         //создаем рабочий массив, клонируем массив props
    }

    statusButtonOk=''      //текстовая надпись для кнопки ok окна редактирования

    formValue={}           //транспортировочный хэш для передачи параметров товара из функций наружу

    newCode=0              //переменная для трансляции кода для нового товара

    getCode=()=>{                    //функция присваивания уникального номера новому члену массива
        let code=this.state.intGoodsArr.length+1;
        while(this.state.intGoodsArr.some(v => v.code==code)) code--;
        return code;
    }

    getNewGoods=()=>{            //новый товар
        this.statusButtonOk='Add';
        this.newCode=this.getCode();
        this.setState({keyEdit:true});
    }

    exitEditGoods=()=>{                      //выход меню редактирования
        this.setState({keyEdit:false});
    }

    saveNewGoods=(hashArg)=>{                //сохранение нового товара
        this.state.intGoodsArr.push(hashArg);
        this.setState({keyEdit:false});
    }

    saveEditGoods=(hashArg)=>{                   //сохранение редактирования существующего товара
        var index;
        this.state.intGoodsArr.some(function(v,i,a){
            index=i;
            return v.code==hashArg.code;
        });
        this.state.intGoodsArr[index]=hashArg;
        this.setState({keyEdit:false});               
    }

    editGoodsInList=(arg)=>{             //вызов редактирования существующего элемента
        var index;
        this.state.intGoodsArr.some(function(v,i,a){    //ищем элемент удовлетворяющий условию - code вызвавшего поля
            index=i;                                    
            return v.code==arg;
        });
        this.formValue={
            code:this.state.intGoodsArr[index].code,
            name:this.state.intGoodsArr[index].name,
            desc:this.state.intGoodsArr[index].desc,
            price:this.state.intGoodsArr[index].price,
            qnt:this.state.intGoodsArr[index].qnt
        };   
        this.statusButtonOk='Save'; 
        this.setState({keyEdit:true});
    }

    delGoodsinList=(arg)=>{                      //вызов удаления существующего элемента
        if (confirm('Are You sure?')){
            var index;
            this.state.intGoodsArr.some(function(v,i,a){    //ищем элемент удовлетворяющий условию - code вызвавшего поля
                index=i;                                    //индекс элемента массива с требуемым полем "code" для удаления
                return v.code==arg;
            });
            this.state.intGoodsArr.splice(index,1);                     //удаляем элемент
            this.setState({triggerState:!this.state.triggerState});     //обновляем страницу
        }    
    }

    render(){
        if (this.state.intGoodsArr.length>0){
            this.state.intGoodsArr.sort(function(a,b){                             //храним масиив state в сортированном виде
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;         //регистронезависимая сортировка для красивого вывода
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
            var outTableCode=this.state.intGoodsArr.map(v =>
                <GoodsItem
                    key={v.code}
                    name={v.name}
                    code={v.code}
                    desc={v.desc}
                    price={v.price}
                    qnt={v.qnt}
                    keyEdit={this.state.keyEdit}
                    cbEditClick={this.editGoodsInList}
                    cbDelClick={this.delGoodsinList}
                />   
            );
            var tableBlock=(
                <table>
                    <caption>Товары на складе</caption>
                    <tbody>
                        <tr> 
                            <th>Товар</th>
                            <th>Описание</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <td></td>
                        </tr>
                        {outTableCode}
                    </tbody>
                </table>                
            );
            if (!this.state.keyEdit){               //окна редактирования нет
                return(
                    <div>
                        {tableBlock}
                        <div>
                            <button className='newButton' onClick={this.getNewGoods}>New position</button>
                        </div>
                    </div>
                )
            }
            else                                    //окно редактирования есть
                if (this.statusButtonOk=="Add")                 //режим нового товара
                    return( 
                        <div>
                            {tableBlock}
                            <GoodsEdit
                                statusButtonOk={this.statusButtonOk}
                                code={this.newCode}
                                cbSaveEdit={this.saveNewGoods}
                                cbExitEdit={this.exitEditGoods}
                            />
                        </div>
                    )
                else return(                //режим вызова существующего товара
                    <div>
                        {tableBlock}
                        <GoodsEdit                  
                            statusButtonOk={this.statusButtonOk}
                            code={this.formValue.code}
                            name={this.formValue.name}
                            desc={this.formValue.desc}
                            qnt={this.formValue.qnt}
                            price={this.formValue.price}
                            cbSaveEdit={this.saveEditGoods}
                            cbExitEdit={this.exitEditGoods}
                        />
                    </div>
                )
        }                
        else return (<div><span>Нет товаров</span></div>);             //нет товаров в списке вообще
    }
};

export default IShop3;
