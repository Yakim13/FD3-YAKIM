"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame';

function initiate(){
    let colorArr=require('./colors.json');
    ReactDOM.render(
        <RainbowFrame colorList={colorArr}/>, 
        document.querySelector('section') 
    );
}
addEventListener('load',initiate);