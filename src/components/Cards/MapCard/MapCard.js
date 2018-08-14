import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

class MapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {modal: false};
  }

  componentDidMount() {

    const browser = window.vts.browser(this.map, {
      map: 'https://cdn.melown.com/mario/store/melown2015/map-config/melown/VTS-Tutorial-Map-4/mapConfig.json',
      position : [ 'obj', 2.3514992,48.8566101, 'float', 0.00, 0.00, -60.00, 0.00, 21255.06, 55.00 ]
    });
  }

  render() {

    const {data, onClick, extra, clickevents, index} = this.props;

    const {modal} = this.state;

    return (<Card full>
      <Card.Body >
        <div ref={(e)=> this.map = e} style={{'width':'100vw', 'height': '100vh'}}></div>
      </Card.Body>
      <Card.Footer content="footer content" extra={<div>extra footer content</div>}/>
    </Card>);
  }
}

MapCard.defaultProps = {
  data: {},
}

export default MapCard;
