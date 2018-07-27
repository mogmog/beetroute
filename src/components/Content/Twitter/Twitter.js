import React from 'react';
import {Row, Col, Icon } from 'antd';

import styles from './Twitter.less';

const Twitter = ({name, date, content , ...rest}) => (
  <div className={styles.twitter}>

    <div class="modal tw" id="download">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="content clearfix">

              <Row>
                <Col span={2}>
                  <Icon style={{ fontSize: 32 }} type={'twitter'}/>
                </Col>

                <Col span={4} >
                  @{name}
                </Col>

                <Col span={18} >
                </Col>



              </Row>

            </div>

          </div>
          <div class="modal-body">
            <p class="tweet-text text-message max">{content}  </p>

            <div class="client-and-actions">
                        <span class="metadata">
                        	<span class="text-date">{date}</span>
                        </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

);

export default Twitter;
