import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import imgUpload from '../../images/imageUpload.png';
import DividerWithText from '../Auth/DividerWithText';

const Tip = [
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


const FifthStep = (props) => {
   const styles = {
      border: "3px dashed lightgrey"
   }

   const [image, setImage] = useState();
   const [imageUrl, setImageUrl] = useState();
   const [fieldError, setFieldError] = useState(props.form.fieldError);
   const [suggestion, setSuggestion] = useState("");
   const [btnState, setBtnState] = useState(true);
   const [preview, setPreview] = useState("");
   const imgRef = React.useRef(null);

   const imgSelectedHandler = (e) => {
      setFieldError(props.form.fieldError);
      const file = e.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
         setImage(file);
       } else {
         setImage(null);
       }
      props.mediaHandler(file);
   }

   const checkDimensions = ({target:img}) => {
      // console.log(img.naturalHeight);
      // console.log(img.naturalWidth);
      if(img.naturalWidth < 1200 || img.naturalHeight < 675)
         setSuggestion("You may want to try to Upload a Larger photo. The best photos are at least 1200 pixels wide and 675 pixels tall");
      else
         setSuggestion("");
   }

   const fetchImage = (event) => {
      // console.log("In click handler");
      // console.log("Image Url : " + imageUrl);
      event.preventDefault();
      var image = new Image();
      image.src = imageUrl;

      image.addEventListener('load', () => {
         setPreview(imageUrl);
         setFieldError(props.form.fieldError);
         props.mediaHandler(imageUrl);
      });
      image.addEventListener('error', () => setFieldError("Sorry, the system could not fetch the image from the given url. Try entering a valid url"));
   }

   const imgUrlHandler = (e) => {
      if(e.target.value !== "")
      {
         setBtnState(false);
         setImageUrl(e.target.value);
      }
      else
         setBtnState(true);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if(fieldError)
         alert("Please try to fix all the errors on screen");
      else
         props.handlePetitionSubmit();
   }

   useEffect(() => {
      if (image) {
         //console.log(image);
         //console.log(image.clientHeight);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
      }
    }, [image]);
   
    return (
            <div className="page">
                  <div className="field">
                     <div className="label">
                        {props.form.label}
                     </div>
                     <div className="info">{props.form.info}</div>
                     <div className={(fieldError) ? "fieldError" : "fieldInput"} 
                          style={(fieldError) ? null : styles}
                     >
                        <div className="error" style={{display: (fieldError)?"block":"none"}}>{fieldError}</div>
                        
                        {preview ? (
                           <div className="imgPreview">
                              <img className={ suggestion ? "displayImgSmall" : "displayImg"}
                                 src={preview}
                                 style={{ objectFit: "cover" }}
                                 onLoad={checkDimensions}
                              />
                              <button className="closebtn" onClick={(e) => {
                                                      e.preventDefault();
                                                      if(!image && imageUrl === preview)
                                                         setPreview(null);
                                                      else
                                                         setImage(null);
                              }}>&times;</button>

                              {suggestion && 
                                 <div className="suggestText">
                                    {suggestion}
                                 </div>}
                           </div>
                        ) : (
                           <div className="imgContainer">
                              <img src={imgUpload} alt="image upload logo"/>
                              <input 
                                 style={{display: "none"}}
                                 type="file" 
                                 accept="image/*"
                                 name="Add Photo"
                                 onChange={imgSelectedHandler}
                                 ref={imgRef}
                              />
                              <button className="imgBtn" onClick={(e) => {
                                 e.preventDefault();
                                 imgRef.current.click();
                              }} >Add Photo</button>
                              <DividerWithText>or</DividerWithText>
                              <div className="imgByUrl">
                                 <input type="url" onChange={imgUrlHandler}/>
                                 <button disabled={btnState} onClick={fetchImage}>Add</button>
                              </div>
                           </div>
                        )}                        
                     </div>   
                  </div>

                  <div className="btns">
                     <button onClick={props.handleBack} className="prev">Back</button>
                     <button onClick={handleSubmit} className="next">{`Save & Preview`}</button>
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

export default FifthStep;