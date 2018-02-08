import React from 'react';

import RecordInput from '../components/RecordInput';
import RecordControl from '../components/RecordControl';

class Page_Record extends React.PureComponent {
      
  render() {

    return(
      <div className='PageRecord'>
        <RecordInput/>
        <RecordControl/>
      </div>
    )

  }

}
    
export default Page_Record;
    