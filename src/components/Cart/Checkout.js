import classes from './Checkout.module.css';
import { useState,useRef } from 'react';

const Checkout = (props) => {
    const [formValid,setFormValid]=useState({
        validname:true,
        validpost:true,
        validstreet:true,
        validcity:true

    })
   
 
    const nameinpref=useRef()
    const streetinpref=useRef()
    const postalinpref=useRef()
    const cityinpref=useRef()

    

   
  const confirmHandler = (event) => {

    event.preventDefault();
    
    const name=nameinpref.current.value
    const street=streetinpref.current.value
    const postal=postalinpref.current.value
    const city=cityinpref.current.value

   

    

    const  validityofname=name.trim().length!==0
    const validityofpostalcode=postal.trim().length===6
    const validityofcity=city.trim().length!==0
    const validityofstreet=street.trim().length!==0
    const formisvalid=validityofname && validityofpostalcode  && validityofcity && validityofstreet
    console.log("form is "+formisvalid)

   
   
       setFormValid({
        validname:validityofname,
        validpost:validityofpostalcode,
        validcity:validityofcity,
        validstreet:validityofstreet

       })

       if(formisvalid){
        props.onSubmit({
            name,
            street,
            postal,
            city
        })
       }
      

      
     
    
  
    
   
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control}  ${formValid.validname? '':classes.invalid}  `}>
      
        <label htmlFor='name'>Your Name</label>
        <input type='text' ref={nameinpref} id='name' />
        {!formValid.validname &&  <p> Invalid name </p>}
      </div>
      <div className={`${classes.control}  ${formValid.validstreet? '':classes.invalid}  `}>
        <label htmlFor='street'>Street</label>
        <input type='text' ref={streetinpref} id='street' />
        {!formValid.validstreet &&  <p> Invalid street </p>}
      </div>
      <div className={`${classes.control}  ${formValid.validpost? '':classes.invalid}  `}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' ref={postalinpref} id='postal' />
        {!formValid.validpost &&  <p> Invalid post </p>}
      </div>
      <div className={`${classes.control}  ${formValid.validcity? '':classes.invalid}  `}>
        <label htmlFor='city'>City</label>
        <input type='text' ref={cityinpref} id='city' />
         {!formValid.validcity &&  <p> Invalid city </p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;