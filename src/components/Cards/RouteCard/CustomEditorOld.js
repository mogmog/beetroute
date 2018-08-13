import React from "react";
import Quill from 'quill';
import styles from './CustomEditor.less';
console.log(Quill);


class Editor extends React.Component {
  constructor() {
    super();
    this.editor = null;
  }

  componentDidMount() {

    var quill = new Quill(this.editor, {
      modules: {
        toolbar: '#quilltoolbar'
      },
      placeholder: '...',
      theme: 'snow'  // or 'bubble'
    });

    quill.on('text-change', function() {
      var delta = quill.getContents();
    });

    quill.setContents({"ops":[{"insert":"!!!!!!!frg dfgfdg dfgdfgfdgdfgfdgfgg\n\nfghfgfgfgfgfgfgfg"},{"attributes":{"header":1},"insert":"\n"},{"insert":"\nthisdfgfgfgfgfgfgfgfg is a test \n"}]});

  }


  render() {
    return (
      <div className={styles.customeditor}>
        <div ref={editor => this.editor = editor} id="test" ></div>
      </div>
    );
  }
}

export default Editor;
