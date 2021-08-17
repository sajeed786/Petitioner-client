import React from 'react'

const Tip = [
   {
      heading: "Keep it short and to the point",
      content: "Example: 'Buy organic, free-range eggs for your restaurants' \
               Not: 'Stop the inhumane treatment of chickens in battery farms that are force-fed...'"
   },
   {
        heading: "Focus on the solution",
        content: "Example: 'Raise the minimum wage in to 300₹ a day' \
                  Not: 'Stop rising income inequality'"
   },
   {
        heading: "Communicate urgency",
        content: "Example: 'Approve life-saving medication for my daughter's insurance before it’s too late'"
    }
]


const SecondStep = (props) => {
    return (
            <div className="page">
                  <div className="field">
                     <div className="label">
                        {props.form.label}
                     </div>
                     <div className="info">{props.form.info}</div>
                     <div className={(props.form.fieldError) ? "fieldError" : "fieldInput"} >
                        <div className="error" style={{display: (props.form.fieldError)?"block":"none"}}>{props.form.fieldError}</div>
                        <input type="text" placeholder={props.form.placeholder} name="petitionTitle" onChange={props.handleChange} required/>
                     </div>
                       
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
                     
                  </div>
            </div>
    )
}

export default SecondStep;