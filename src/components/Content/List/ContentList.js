import React from 'react';
import {Icon } from 'antd';

import styles from './ContentList.less';
import Facebook from "../Facebook/Facebook";
import Twitter from "../Twitter/Twitter";

const ContentList = ({posts , ...rest}) => (
  <div className={styles.contentlist}>

    <ul>
      {posts.map((post, key) =>
        <li>
          {post.type === 'facebook' &&
          <Facebook key={key} name={post.name} content={post.content} content_en={post.content_en} date={post.date}/>}
          {post.type === 'twitter' &&
          <Twitter key={key} name={post.name} content={post.content} content_en={post.content_en} date={post.date}/>}
        </li>
      )}

    </ul>

  </div>

);

export default ContentList;


