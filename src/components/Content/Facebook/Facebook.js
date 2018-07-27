import React from 'react';
import {Icon } from 'antd';

import styles from './Facebook.less';

const Facebook = ({name, date, content, content_en , ...rest}) => (
  <div className={styles.facebook}>

    <div className="fb" >
      <div className="post">
        <div className="top">
          <div className="img fileinput-preview">

          </div>
          <div className="name">
              <Icon style={{ fontSize: 32 }} type={'facebook'}/>
              <span className="text-name"> {name} </span>
            <div className="date">
              <span className="text-when">Posted on {date}  </span> ·
            </div>
            <div className="top_arrow"></div>
          </div>
        </div>
        <div className="clearfix"></div>
        <div className="img_message"></div>
        <span className="text-message">{content_en}
       </span>

      </div>

    </div>
  </div>

);

export default Facebook;

Facebook.defaultProps = {
  name : 'Mark Zuvkerberg', date : '12/12/2017', content : 'blah blah', content_en : 'in english',
};
