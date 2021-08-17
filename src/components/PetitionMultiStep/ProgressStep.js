import React from 'react';

const ProgressStep = (props) => {
   let extraClass = "";
   if(props.active)
      extraClass = "active";
   else if(props.completed)
      extraClass= "completed";
   else if(props.disabled)
      extraClass = "disabled";

   //console.log(props);
    return (
        <div className="step">
            <p className={extraClass}>
               {props.stepName}
            </p>
            <div className={`bullet ${extraClass}`}>
               <span>{props.id}</span>
            </div>
            <div className={`check fa fa-check ${extraClass}`}></div>
        </div>
    )
}

export default ProgressStep