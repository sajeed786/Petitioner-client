import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import CustomSelect from './CustomSelect'
import { getRecipients } from '../../api/index'
import { storeRecipients } from '../../actions/petition'

const Tip = [
   {
      heading: "Many petitions have companies or businesses as targets",
      content: "Examples: 'Microsoft' or 'Divya’s Beauty Salon'. Feel free to also list the CEO or another company official."
   },
   {
        heading: "Politicians, legislatures, or government agencies are also common",                                                          
        content: "Examples: 'Mumbai City Council', your Sabha representative’s name, or the Ministry of Health and Family Welfare."
    },
    {
        heading: "Don’t overthink it",
        content: "You can add or change targets later. For now, just make your best guess and write the rest of your petition!"
    }
]

const StepForm = (props) => {
   const dispatch = useDispatch();
   const recipients = useSelector(state => state.petition.recipients);

   useEffect(() => {
      
      async function fetchData() {
         try{
            const {data} = await getRecipients();
            
            const action = storeRecipients();
            dispatch({ ...action, data: data.options});
         }
         catch(error)
         {
            console.log(error);
         }
      }

      fetchData();

   }, []);   

   return (
            <div className="page">
                  <div className="field">
                     <div className="label">
                        {props.form.label}
                     </div>
                     <div className="info">{props.form.info}</div>
                     <div className={(props.form.fieldError) ? "fieldError" : "fieldInput"} style={{padding: "0px"}}>
                        <div className="error" style={{display: (props.form.fieldError)?"block":"none"}}>{props.form.fieldError}</div>
                        <CustomSelect 
                           isMulti={true}
                           name="petitionRecipients"
                           placeholder={props.form.placeholder}
                           handleChange={props.handleChange}
                           options={recipients}
                        />
                     </div>  
                  </div>

                  <div className="btns">
                     <button onClick={props.handleBack} className="prev">Back</button>
                     <button onClick={(e) => props.handleNext(e, "thirdStep")} className="next">Continue</button>
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

export default StepForm;