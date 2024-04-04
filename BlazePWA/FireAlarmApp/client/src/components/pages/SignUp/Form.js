import React, { useState, useEffect } from 'react';
import bgImg from "../../../assets/BlazeSite.jpg";
import siteIcon from "../../../assets/BlazeIcon.png";
import { useForm } from "react-hook-form";

export default function Form() {
  const [isNewUser, setIsNewUser] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  // Loads the specialized css for the blaze login/register page and unloads it after done since css is global
  useEffect(() => {
    document.body.classList.add('blaze-page');
    return () => {
      document.body.classList.remove('blaze-page');
    };
  }, []);

  // Resets form fields based on if it is on the Sign In or Sign Up page
  const toggleForm = () => {
    setIsNewUser(!isNewUser);
    reset(); 
  };

  const onSubmit = data => {
    console.log(data);
  
    // Extract form data 
    const { username, email, password, confirmPassword } = data;
    
    // Construct a response message that includes some of the form data
    // THIS WHERE YOU COULD CALL THE API THAT AUTHENTICATES THE PASSWORD!
    let mockServerResponse;
    if (isNewUser) {
      mockServerResponse = `User registered successfully. Welcome, ${username}! Your email is ${email}.`;
      // Check if passwords match for new users
      if(password !== confirmPassword) {
        alert("Passwords do not match.");
        return; // Stop the form submission process
      }
    } else {
      mockServerResponse = `User logged in successfully. Welcome back, ${username}!`;
    }
    
    alert(mockServerResponse);
  
    // Reset form after submission for demonstration
    reset();
  };
  return (
    <section>
      <div className="register">
        <div className="col-1">
          <img src={siteIcon} alt="blaze-icon" className="blaze-icon"/>
          <h2>{isNewUser ? "Sign Up" : "Sign In"}</h2>
          <span>{isNewUser ? "Create your account" : "Welcome back to Blaze!"}</span>
          <form id='form' className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username', { required: true })} type="text" placeholder='username'/>
            {errors.username && <p>Username is required</p>}
            {isNewUser && <input {...register('email', { required: true })} type="text" placeholder='email'/>}
            {isNewUser && errors.email && <p>Email is required</p>}
            <input {...register('password', { required: true })} type="password" placeholder='password'/>
            {errors.password && <p>Password is required</p>}
            {isNewUser && <input {...register('confirmPassword', { required: true })} type="password" placeholder='confirm password'/>}
            {isNewUser && errors.confirmPassword && <p>Confirm Password is required</p>}
            <button type='submit' className='btn'>{isNewUser ? "Sign Up" : "Log in"}</button>
            <button type='button' onClick={toggleForm} className='btn toggle'>
              {isNewUser ? "Already have an account? Sign In!" : "New User? Click here to Sign Up!"}
            </button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt=""/>
        </div>
      </div>
    </section>
  );
}
