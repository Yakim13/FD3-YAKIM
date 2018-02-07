import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './PagesLinks.css';

class PagesLinks extends React.Component {
          
  render() {

    return (
      <nav>
        <div>
          <NavLink to="/record" className="PageLink" activeClassName="ActivePageLink">Запись S/N</NavLink>
        </div>
        <div>
          <NavLink to="/check" className="PageLink" activeClassName="ActivePageLink">Проверить S/N</NavLink>          
        </div>
        <div>
          <NavLink to="/about" className="PageLink" activeClassName="ActivePageLink">About</NavLink>
        </div>
      </nav>
    );
    
  }

}
    
export default PagesLinks;
    