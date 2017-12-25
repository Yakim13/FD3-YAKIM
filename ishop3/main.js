"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import iShop3 from './components/iShop3';


function initiate(){
    var product=require('./product.json');
    ReactDOM.render(
        React.createElement(iShop3,{goods:product}), 
        document.querySelector('section') 
    );
}
addEventListener('load',initiate);