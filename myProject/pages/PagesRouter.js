import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import Page_Record from './Page_Record';
import Page_Check from './Page_Check';
import Page_About from './Page_About';


class PagesRouter extends React.Component{
          
  render(){

    return(
      <div>
        <Route path="/record" component={Page_Record}/>
        <Route path="/check" component={Page_Check}/>
        <Route path="/" exact component={Page_About}/>
        <Route path="/about" component={Page_About}/>
      </div>
    );
  
  }

}
    
export default PagesRouter;
    