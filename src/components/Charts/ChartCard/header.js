import React, {Component} from 'react';
import { Tooltip, Icon } from 'antd';
import styles from './header.less';

export default class ChartCardHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { text, icon, thin, colorIndex, tooltip } = this.props;
    return (<div style={{'padding-bottom' : '0px', 'border-bottom-width' : (thin ? '1px' : '4px') }} className={styles.header + ' colorIndex_' + colorIndex} >
      { icon && <span> {icon} <span style={{marginLeft : '-2px'}}>{ text }</span></span> }
      {!icon && (  <span style={{marginLeft : '0px'}}>{ text }</span>) }

      <span className={styles.tooltip}>

        {
          tooltip && <Tooltip title={tooltip}>
            <Icon type="info-circle-o" />
          </Tooltip>
        }

      </span>
    </div>)
  }

}

ChartCardHeader.defaultProps = {
  colorIndex : null
}


