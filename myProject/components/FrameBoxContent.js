import React from 'react';
import PropTypes from 'prop-types';

import './FrameBoxContent.css';

class FrameBoxContent extends React.PureComponent {

    static propTypes={
        message: PropTypes.string,    //текст сообщения окна, если он нужен
    };

    static defaultProps={
      message:'',         
    }

    render() {

      console.log('Render ProgressBar');

      return (
        <div className="HideBlock">
          <div className="FrameBoxContent">
            <div>
              <h4>{this.props.message}</h4>
            </div>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      )

    }

}

export default FrameBoxContent;