"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import PagesRouter from './pages/PagesRouter';
import PagesLinks from './pages/PagesLinks';

import './main.css';
import'./fonts/oswald/Oswald-Regular.ttf';

function initiate(){
  ReactDOM.render(
    <BrowserRouter>
      <div>
        <PagesLinks/>
        <PagesRouter/>
      </div>
    </BrowserRouter>,
    document.querySelector('section')
  );
}
addEventListener('load',initiate);