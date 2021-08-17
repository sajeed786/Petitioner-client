import React from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  //const counterRef = React.useRef();

  const { quill, quillRef, Quill } = useQuill({
    modules: {
      toolbar: '#toolbar',
      counter: true
    },
    formats: [
      "size", "script",
      "header",
      "bold", "italic", "underline", "strike",
      "image", "link","code-block", "blockquote", "clean"
    ], // Important
    placeholder: props.placeholder,
  });

  if (Quill && !quill) {
    // For execute this line only once.
    Quill.register('modules/counter', function(quill, options) {
      quill.on('text-change', function() {
        const text = quill.getText();
        const html = quill.root.innerHTML;
        props.onEditorChange(text, html);
        //console.log(text);  
      });
    });
  }

  return (
    <div style={{ width: "inherit", height: "inherit" }}>

      <div id="toolbar">
      <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    
                    <button className="ql-link" />
                    <button className="ql-script" value="sub" />
                    <button className="ql-script" value="super" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />
      </div>
      <div className={props.className} ref={quillRef} />
      <div id="editor" />
    </div>
  );
};

export default QuillEditor;