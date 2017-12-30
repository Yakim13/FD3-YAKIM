"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShop3 from './components/iShop3';


function initiate(){
    let product=require('./product.json');
    ReactDOM.render(
        <IShop3 goods={product}/>, 
        document.querySelector('section') 
    );
}
addEventListener('load',initiate);