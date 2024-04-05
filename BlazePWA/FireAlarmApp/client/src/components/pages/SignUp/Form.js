import React, { useState, useEffect } from 'react';
import bgImg from "../../../assets/BlazeSite.jpg";
import siteIcon from "../../../assets/BlazeIcon.png";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; 

export default function Form() {
  const [isNewUser, setIsNewUser] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate()


  // Loads the specialized css for the blaze login/register page and unloads it after done since css is global
  useEffect(() => {
    document.body.classList.add('blaze-page');
    return () => {
      document.body.classList.remove('blaze-page');
    };
  }, []);

  // If new User is true, it will show the sign up form. Else, it will show the sign in form.
  const toggleForm = () => {
    setIsNewUser(!isNewUser);
    reset(); 
  };

  // This code is ran when the user clicks the Sign Up or Log in Button
  const onSubmit = async data => {
    console.log(data);
    
  // These variables hold the data entered into the fields by the user if they click register
  const { firstName, lastName, username, email, password, confirmPassword } = data;
  
    
    //If the user is registering a new account, we will enter this if-block.
    if (isNewUser) {
      if(password !== confirmPassword) {
        alert("Passwords do not match.");
        return; 
      }
      
      // API endpoint for registration and its relevant data
      const registrationEndpoint = 'http://localhost:4000/register';
      const registrationData = {
        firstName,
        lastName,
        username,
        email,
        password,
      };

      // We make a call to the register API and receive a response
      try {
        const response = await fetch(registrationEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });
  
        if (!response.ok) {
          throw new Error('Registration failed');
        }
  
        // Check if the response is JSON
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const responseData = await response.json();
          console.log(responseData);
          alert(`User registered successfully. Welcome, ${username}! Your email is ${email}.`);
        } else 
        {
          // Handle non-JSON responses here and displays its message to the server
          const textResponse = await response.text();
          console.log(textResponse);
          alert(textResponse); 
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    } 
    
    
    //If the user clicked the login form, this code will execute.
    else 
    {

      // API endpoint for logging in and its relevant data
      const loginEndpoint = 'http://localhost:4000/login';
      const loginData = {
        username,
        password,
      };
  
      try {
        const response = await fetch(loginEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const responseData = await response.json();
        // Here, we store the login token in local storage 
        localStorage.setItem('token', responseData.token); 
        navigate('/home');
      } catch (error) {
        alert(error.message);
      }
    }
    // Reset form after submission
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
            {isNewUser && (
              <>
                <input {...register('firstName', { required: true })} type="text" placeholder='First Name'/>
                {errors.firstName && <p>First name is required</p>}
                <input {...register('lastName', { required: true })} type="text" placeholder='Last Name'/>
                {errors.lastName && <p>Last name is required</p>}
              </>
            )}
            <input {...register('username', { required: true })} type="text" placeholder='Username'/>
            {errors.username && <p>Username is required</p>}
            {isNewUser && <input {...register('email', { required: true })} type="email" placeholder='Email'/>}
            {isNewUser && errors.email && <p>Email is required</p>}
            <input {...register('password', { required: true })} type="password" placeholder='Password'/>
            {errors.password && <p>Password is required</p>}
            {isNewUser && <input {...register('confirmPassword', { required: true })} type="password" placeholder='Confirm Password'/>}
            {isNewUser && errors.confirmPassword && <p>Confirm password is required</p>}
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
