import React from "react";
import Quill from 'quill';
import styles from './CustomEditor.less';

class Editor extends React.Component {
  constructor() {
    super();
    this.editor = null;
  }

  componentDidMount() {

    const { onChange, index } = this.props;

    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [ 'link', 'image', 'video', 'formula' ],          // add's image support
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ];

    var quill = new Quill(this.editor, {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: '...',
      theme: 'snow',
    });

    quill.on('text-change', function() {
      console.log(onChange);
      onChange(index, quill.getContents());

    });

    quill.setContents(this.props.data);

    quill.focus();

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
