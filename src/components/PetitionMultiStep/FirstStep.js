import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from './CustomSelect'
import { getCategories } from '../../api/index'
import { storeCategories } from '../../actions/petition'

const FirstStep = (props) => {
   const dispatch = useDispatch();
   const categories = useSelector(state => state.petition.category);

   useEffect(() => {
      async function fetchData(){
         try{
            const {data} = await getCategories();
            const action = storeCategories();
            dispatch({ ...action, data: data.options});
            //console.log(recipients);
         }
         catch(error)
         {
            console.log(error);
         }
      }
      fetchData();
   }, []); 

   
    return (
            <div className="page" style={{marginLeft: `${props.leftMargin}%`, justifyContent:'stretch'}}>
                  <div className="field">
                     <div className="label">
                        {props.form.label}
                     </div>
                     <div className="info">{props.form.info}</div>
                     <div className={(props.form.fieldError) ? "fieldError" : "fieldInput"} >
                        <div className="error" style={{display: (props.form.fieldError)?"block":"none"}}>{props.form.fieldError}</div>
                        <CustomSelect 
                           isMulti={false}
                           placeholder={props.form.placeholder}
                           handleChange={props.handleChange}
                           options={categories}
                        />
                     </div>
                  </div>

                  <div className="btns" style={{marginTop: "20px"}}>
                     <button disabled={true} onClick={props.handleBack} className="firstprev">Back</button>
                     <button onClick={props.handleNext} className="next">Continue</button>
                  </div>

            </div>
    )
}

export default FirstStep;