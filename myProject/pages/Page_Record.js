import React from 'react';

import RecordInput from '../components/RecordInput';
import RecordControl from '../components/RecordControl';

let goods=require('./base_sn.json');

class Page_Record extends React.PureComponent {
      
  render() {

    return(
      <div className='PageRecord'>
        <RecordInput goods={goods}/>
        <RecordControl/>
      </div>
    )

  }

}
    
export default Page_Record;
    