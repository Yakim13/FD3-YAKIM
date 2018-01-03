import React from 'react';
import PropTypes from 'prop-types';

import './ColorFrame.css';

class ColorFrame extends React.Component{

    static propTypes={
        color:PropTypes.string,
    }
   
    render() {
        return (
            <div style={{border:"solid 3px "+this.props.color, padding:"5px"}}>
                {this.props.children}
            </div>
        )
    }
    
}

export default ColorFrame;

  