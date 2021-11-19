import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import Axios from 'axios';

import * as api from '../../api/index';
import { savePetitionData } from '../../actions/petition';
import ProgressStep from './ProgressStep'
import FirstStep from './FirstStep';
import FifthStep from './FifthStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

import './styles.css';
import { toast } from 'react-toastify';

const initialFormState = [
   {
      id: 1,
      active: true,
      completed: false,
      disabled: false,
      fieldError: "",
      stepName: "Category",
      info: "Selecting a topic allows Change.org to recommend your petition to interested supporters.",
      label: "What kind of issue are you petitioning on?",
   },
   {
      id: 2,
      active: false,
      completed: false,
      disabled: true,
      fieldError: "",
      placeholder: "What do you want to achieve",
      stepName: "Title",
      info: "This is the first thing people will see about your petition. Get their attention with a short title that focusses on the change you’d like them to support.",
      label: "Write your petition title"
   },
   {
      id: 3,
      active: false,
      completed: false,
      disabled: true,
      fieldError: "",
      placeholder: "Petition Target (e.g., Tata or Your Mayor)",
      stepName: "Address To",
      info: "Choose the recipient(s) of your petition. These are people or organisations with the power to solve your problem or take the action you’re demanding.",
      label: "Great! Who has the power to make this change?"
   },
   {
      id: 4,
      active: false,
      completed: false,
      disabled: true,
      fieldError: "",
      stepName: "Draft",
      info: "People are more likely to support your petition if it’s clear why you care. Explain how this change will impact you, your family, or your community.",
      label: "Explain the problem you want to solve"
   },
   {
      id: 5,
      active: false,
      completed: false,
      disabled: true,
      fieldError: "",
      stepName: "Media",
      info: "Petitions with a photo or video receive six times more signatures than those without. Include one that captures the emotion of your story.",
      label: "Add a photo or video"
   }
];

const TipStep5 = [
   {
      heading: "Choose a photo that captures the emotion of your petition",
      content: "Photos of people or animals work well."
   },
   {
        heading: "Try to upload photos that are 1600 x 900 pixels or larger",
        content: "Large photos look good on all screen sizes."
   },
   {
        heading: "Keep it friendly for all audiences",
        content: "Make sure your photo doesn't include graphic violence or sexual content."
   }
]

const formFieldErrors = [
   "Please select an appropriate category",
   "Please enter a petition title",
   "Please select or create at least one petition recipient",
   "Please write the petition issue",
   ""
];

let petitionForm = []; //array to set the field error in each step of the multi-step form separately on clicking "Next" button
petitionForm.length = 5; //setting the length of the array to the number of steps in the form

//const initialPetitionData = { userId:"", petitionCategory: "", petitionTitle: "", petitionRecipients: [], petitionText: "" , petitionMedia: ""};

const Form = (props) => {
   const  user = useSelector((state) => state.auth.authData);

   const dispatch = useDispatch();
   //let formData = new FormData();

   const [currentStep, setCurrentStep] = useState(1);
   const [formState, setFormState] = useState(initialFormState);
   const [leftMargin, setLeftMargin] = useState(0);

   const [petitionCategory, setPetitionCategory] = useState();
   const [petitionTitle, setPetitionTitle] = useState();
   const [petitionRecipients, setPetitionRecipients] = useState();
   const [petitionText, setPetitionText] = useState();
   const [petitionMedia, setPetitionMedia] = useState();

  // const [petitionData, setPetitionData] = useState(initialPetitionData);

   // useEffect( () => {
   //    console.log(user);
   //    //setUser(JSON.parse(localStorage.getItem('profile')));
   // }, [])

   const handleProgressForward = (id) => {
      console.log(id, "next");
      setFormState(prevFormState => {
         const updatedFormState = prevFormState.map(form => {
            if(form.id === id+1)
            {
               return {
                  ...form,
                  active: !form.active,
                  disabled: !form.disabled
               }
            }
            else if(form.id === id)
            {
               return {
                  ...form,
                  active: !form.active,
                  completed: !form.completed
               }
            }
            return form;
         });
         // console.log("updated: " + updatedFormState);
         // console.log("previous: " + prevFormState);
         return updatedFormState;
      });
   }

   const handleProgressBackward = (id) => {
      //console.log(currentStep, "back");
      setFormState(prevFormState => {
         const updatedFormState = prevFormState.map(form => {
            if(form.id === id-1)
            {
               return {
                  ...form,
                  active: !form.active,
                  completed: !form.completed
               }
            }
            else if(form.id === id)
            {
               return {
                  ...form,
                  active: !form.active,
                  disabled: !form.disabled
               }
            }
            return form;
         });
         return updatedFormState;
      });
   }

   const handleNext = (e) => {
      e.preventDefault();
      
      if(!petitionForm[currentStep-1] || !petitionForm[currentStep-1].length || (petitionForm[currentStep-1] === "<p><br></p>"))
      {
         setFormState(prevFormState => {
            const updatedFormState = prevFormState.map(form => {
               if(form.id === currentStep)
               {
                  return {
                     ...form,
                     fieldError: formFieldErrors[currentStep-1]
                  }
               }
               return form;
            });
            return updatedFormState;
         });
      }
      else
      {
         setCurrentStep((prevStep) => prevStep + 1 );
         setLeftMargin(prevLeftMargin => prevLeftMargin - 20);

         handleProgressForward(currentStep);
      }
   }

   const handleBack = (e) => {
      e.preventDefault();
      setCurrentStep((prevStep) => prevStep - 1);
      setLeftMargin(prevLeftMargin => prevLeftMargin + 20);
      handleProgressBackward(currentStep);
   }

   const handleChange = (e) => {

      petitionForm[currentStep-1] = e.target.value;
      if(petitionForm[currentStep-1])
      {
         setFormState(prevFormState => {
            const updatedFormState = prevFormState.map(form => {
               if(form.id === currentStep)
               {
                  return {
                     ...form,
                     fieldError: ""
                  }
               }
               return form;
            });
            return updatedFormState;
         });
      }
      setPetitionTitle(e.target.value);
   }

   const handleChangeSelect = (option) => {
      if(currentStep === 1)
      {
         petitionForm[currentStep-1] = option.value;
         if(petitionForm[currentStep-1])
         {
            setFormState(prevFormState => {
               const updatedFormState = prevFormState.map(form => {
                  if(form.id === currentStep)
                  {
                     return {
                        ...form,
                        fieldError: ""
                     }
                  }
                  return form;
               });
               return updatedFormState;
            });
         }
         setPetitionCategory(option.value);
      }   

      if(currentStep === 3)
      {
         const recipients = option.map(item => item.value);
         setPetitionRecipients(recipients);

         petitionForm[currentStep-1] = recipients;  
         if(petitionForm[currentStep-1].length)
         {
            setFormState(prevFormState => {
               const updatedFormState = prevFormState.map(form => {
                  if(form.id === currentStep)
                  {
                     return {
                        ...form,
                        fieldError: ""
                     }
                  }
                  return form;
               });
               return updatedFormState;
            });
         }
      }
   }

   const handleTextChange = (value) => {
      petitionForm[3] = value;
      setCurrentStep(4); //work around for abnormal change of currentStep value to 1
      
      if(petitionForm[3])
      {
         //console.log("in if - ");
         setFormState(prevFormState => {
            const updatedFormState = prevFormState.map(form => {
               if(form.id === 4)
               {
                  return {
                     ...form,
                     fieldError: ""
                  }
               }
               return form;
            });
            return updatedFormState;
         });
      }
      setPetitionText(value);
   }

   const mediaHandler = (image) => {
      setPetitionMedia(image);
   }

   const handlePetitionSubmit = async(e) => {
      e.preventDefault();
      let formData = new FormData();

      formData.append('userId', user._id);
      formData.append('petitionCategory', petitionCategory);
      formData.append('petitionTitle', petitionTitle);
      formData.append('petitionRecipients', petitionRecipients);
      formData.append('petitionText', petitionText);
      formData.append('petitionMedia', petitionMedia);

      // Axios.post('https://httpbin.org/anything', formData)
      // .then(res => console.log(res))
      // .catch(err => console.log(err));

      try{
         const {data} = await api.submitPetition(formData);
         const action = savePetitionData();
         dispatch({...action, data: data.resultData});

         //console.log(data.resultData);
         console.log(data.message);

         setTimeout(() => {
            props.history.push('/petition/review');
         }, 2000);
      }
      catch(error){
         console.log(error.message);
         toast.error(error.response.data.message);
      }
      
   }

   const progressSteps = formState.map(form => <ProgressStep key={form.id} 
      id={form.id} active={form.active} completed={form.completed} disabled={form.disabled} stepName={form.stepName} />)
   
   //console.log(formState);
   return (
      <div className="container">
         <div className="progress-bar">
            {progressSteps}
         </div>
         <div className="form-outer">
            <form method="post" encType="multipart/form-data" onSubmit={handlePetitionSubmit}>
               <FirstStep form={formState[0]} leftMargin={leftMargin} handleChange={handleChangeSelect} handleNext={handleNext} handleBack={handleBack} />
               <SecondStep form={formState[1]} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />
               <ThirdStep form={formState[2]} handleChange={handleChangeSelect} handleNext={handleNext} handleBack={handleBack} />
               <FourthStep form={formState[3]} handleTextChange={handleTextChange} handleNext={handleNext} handleBack={handleBack} />
               
               <div className="page">
                  <FifthStep form={formState[4]} mediaHandler={mediaHandler} />
               
                  <div className="btns">
                     <button onClick={handleBack} className="prev">Back</button>
                     <button type="submit" className="next">{`Save & Preview`}</button>
                  </div>

                  <div className="explainStep">
                     <div>
                        <span>{TipStep5[0].heading}</span>
                        <p>{TipStep5[0].content}</p>
                     </div>
                     <div>
                        <span>{TipStep5[1].heading}</span>
                        <p>{TipStep5[1].content}</p>
                     </div>
                     <div>
                        <span>{TipStep5[2].heading}</span>
                        <p>{TipStep5[2].content}</p>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
    )
}

export default Form;