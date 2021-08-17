import React, {useState} from 'react';
import ProgressStep from './ProgressStep'
import FirstStep from './FirstStep';
import FifthStep from './FifthStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

import './styles.css';

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
      stepName: "Media",
      info: "Petitions with a photo or video receive six times more signatures than those without. Include one that captures the emotion of your story.",
      label: "Add a photo or video"
   }
];

const initialPetitionData = { petitionCategory: "", petitionTitle: "", petitionRecipients: [], petitionText: "" , petitionMedia: ""};
const Form = () => {
   const [currentStep, setCurrentStep] = useState(1);
   const [formState, setFormState] = useState(initialFormState);
   const [leftMargin, setLeftMargin] = useState(0);
   const [petitionData, setPetitionData] = useState(initialPetitionData);

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
      })
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
      })
   }

   const handleNext = (e, value="default") => {
      e.preventDefault();
      console.log(value);
      setCurrentStep((prevStep) => prevStep + 1 );
      setLeftMargin(prevLeftMargin => prevLeftMargin - 20);
      //console.log(currentStep);
      handleProgressForward(currentStep);
   }

   const handleBack = (e) => {
      e.preventDefault();
      setCurrentStep((prevStep) => prevStep - 1);
      setLeftMargin(prevLeftMargin => prevLeftMargin + 20);
      handleProgressBackward(currentStep);
   }

   const handleChange = (e) => {
      //console.log(e.target.value);
      //setPetitionData({ ...petitionData, [e.target.name]: e.target.value});
      petitionData.petitionTitle = e.target.value;
   }

   const handleChangeSelect = (option) => {
      if(currentStep === 1)
         petitionData.petitionCategory = option.value;
         //setPetitionData({ ...petitionData, petitionCategory: option.value});   

      if(currentStep === 3)
         petitionData.petitionRecipients = option.map(item => item.value);   
   }

   const handleTextChange = (value) => {
      setPetitionData({ ...petitionData, petitionText: value});
   }

   const mediaHandler = (image) => {
      setPetitionData({ ...petitionData, petitionMedia: image});
   }

   const handlePetitionSubmit = () => {
      console.log(petitionData);
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
            <form>
               <FirstStep form={formState[0]} leftMargin={leftMargin} handleChange={handleChangeSelect} handleNext={handleNext} handleBack={handleBack} />
               <SecondStep form={formState[1]} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />
               <ThirdStep form={formState[2]} handleChange={handleChangeSelect} handleNext={handleNext} handleBack={handleBack} />
               <FourthStep form={formState[3]} handleTextChange={handleTextChange} handleNext={handleNext} handleBack={handleBack} />
               <FifthStep form={formState[4]} mediaHandler={mediaHandler} handlePetitionSubmit={handlePetitionSubmit} handleNext={handleNext} handleBack={handleBack} />
            </form>
         </div>
      </div>
    )
}

export default Form;