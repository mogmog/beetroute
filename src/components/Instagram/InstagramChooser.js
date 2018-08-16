import React, {Component} from 'react';
import {List, Button } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class InstagramChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {

    const { data, onSelect } = this.props;

    return (

      <List renderHeader={() => 'Select Instagram'} className="my-list">

        {data && data.map((e, i)=> <Item key={'item_' + i} extra={<Button onClick={(f) => onSelect(e)}>Add</Button>}><img style={{width : '100px', height : '100px'}} src={e.images.thumbnail.url}/> </Item>)}

      </List>)
  }
}

export default InstagramChooser;
