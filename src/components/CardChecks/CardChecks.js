import React, {Component} from 'react';
import {Row, Col, Card, Tooltip, Button, Modal, Tabs, Icon, Avatar, Table} from 'antd';

const { Meta } = Card;

import {render} from "react-dom";
import CardLoader from "../../components/CardLoader/CardLoader";
const TabPane = Tabs.TabPane;

var CodeMirror = require('react-codemirror');

require('codemirror/lib/codemirror.css');

class CardChecks extends Component {

  constructor(props) {
    super(props);
    this.state = {  };
  }



  render() {

    const { checksvisible } = this.props;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Position',
      dataIndex: 'address',
    }];
    const data2 = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'Analyst',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'Analyst',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Intern',
    }];

// rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        checked : record.key > 2,

        name: record.name,
      }),
    };

    const checkmodal = (<Modal bodyStyle={{height : '40vh'}} visible={checksvisible} footer={[
      <Button key="submit" type="primary" >
        Save
      </Button>,
    ]} width={'40vw'} >

      <Table rowSelection={rowSelection} columns={columns} dataSource={data2} pagination={false} />

    </Modal>);

    return (checkmodal);
  }
}

export default CardChecks;
