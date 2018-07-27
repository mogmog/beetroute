import React from 'react';

import { Tag, Divider } from 'antd';

import {DraftJS, MegadraftEditor, editorStateFromRaw, editorStateToJSON, createTypeStrategy} from "megadraft";

class PageLinkInput extends React.Component {
  constructor(props) {
    super(props);
    // load pages from somewhere
    this.pages = [
      { url: "/home", title: "Home"},
      { url: "/about", title: "About"},
      { url: "/my/subpage", title: "Subpage"},
      // ...
    ]
  }

  onPageChange = (event) => {
    const url = event.target.value;
    this.props.setEntity({url});
  }

  render() {
    return (
      <select className="toolbar__input" onChange={this.onPageChange}>
        <option>Please select page...</option>
        {
          this.pages.map(
            ({url, title}, index) => (
              <option key={index} value={url}>{title}</option>
            )
          )
        }
      </select>
    );
  }
}


const myDecorator = new DraftJS.CompositeDecorator([
  {
    strategy: createTypeStrategy("INTERNAL_PAGE_LINK"),
    component: PageLinkInput,
  },
])



export default class HeadlineSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {editorState: editorStateFromRaw(props.item.raw)};
  }

  onChange = (editorState) => {

    const { save } = this.props;

    this.setState({editorState});

    save(editorStateToJSON(editorState));
  }

  render() {

    //this.setState({editorState: editorStateFromRaw(this.props.item.raw)});

    const {editorState} = this.state;


    const {item} = this.props;

    return (
      <div>
        <h3> { item.headline } </h3>

        <a> view on the map </a>

        <MegadraftEditor

          editorState={editorState}
          sidebarRendererFn={() => <span/> }
          onChange={this.onChange.bind(this)}/>

      </div>
    )
  }
}

