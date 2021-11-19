import React, {useState} from 'react'
import QuillEditor from './editor/QuillEditor';

const Tip = [
   {
      heading: "Describe the people involved and the problem they are facing",
      content: "Readers are most likely to take action when they understand who is affected."
   },
   {
        heading: "Describe the solution",
        content: "Explain what needs to happen and who can make the change. Make it clear what happens if you win or lose."
   },
   {
        heading: "Make it personal",
        content: "Readers are more likely to sign and support your petition if it’s clear why you care."
    },
    {
        heading: "Respect others",
        content: "Don't bully, use hate speech, threaten violence or make things up."
    }

]


const StepForm = (props) => {
   const counterRef = React.useRef();

   const onEditorChange = (text, html) => {
      // console.log(html);
      // console.log(text);
      props.handleTextChange(html);
      counterRef.current.innerText = 1001 - text.length;
   }

   return (
            <div className="page">
                  <div className="field">
                     <div className="label">
                        {props.form.label}
                     </div>
                     <div className="info">{props.form.info}</div>
                     <div className={(props.form.fieldError) ? "fieldError" : "fieldInput"} >
                        <div className="error" style={{display: (props.form.fieldError)?"block":"none"}}>{props.form.fieldError}</div>
                        <QuillEditor 
                           className="qeditor"
                           name="petitionText"
                           placeholder={"Compose your petition..."}
                           onEditorChange={onEditorChange}
                        />
                     </div>
                     <div ref={counterRef} /> 
                  </div>

                  <div className="btns">
                     <button onClick={props.handleBack} className="prev">Back</button>
                     <button onClick={props.handleNext} className="next">Continue</button>
                  </div>

                  <div className="explainStep">
                     <div>
                        <span>{Tip[0].heading}</span>
                        <p>{Tip[0].content}</p>
                     </div>
                     <div>
                        <span>{Tip[1].heading}</span>
                        <p>{Tip[1].content}</p>
                     </div>
                     <div>
                        <span>{Tip[2].heading}</span>
                        <p>{Tip[2].content}</p>
                     </div>
                     <div style={{display: (props.form.id === 3)?"block":"none"}}>
                        <span>{Tip[3].heading}</span>
                        <p>{Tip[3].content}</p>
                     </div>
                  </div>
            </div>
    )
}

export default StepForm;