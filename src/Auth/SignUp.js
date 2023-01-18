import React, { useState } from 'react';
import { useHistory,Link } from 'react-router-dom';
import './SignUp.css';
export default function Signup() {
  const [formError, setFormError] = useState({});
  const [formData,setFormData]=useState({firstName:"",lastName:"",email:"",phoneNumber:"",gender:"",username:"",password:"",confirmPassword:""});
  let history = useHistory();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormError({});

    if (!formData.firstName) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        firstNameError: 'First name is required',
      }));
      return;
    }

    if (!formData.lastName && formData.firstName) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        lastNameError: 'Last name is required',
        firstNameError:'',
      }));
      return;
    }

    if (!formData.email && formData.lastName) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        emailError: 'Email is required',
        lastNameError:'',
      }));
      return;
    }

    if (!formData.phoneNumber && formData.email) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        phoneNumberError: 'Phone number is required',
        emailError:'',
      }));
      return;
    }

    if (!formData.gender&&formData.phoneNumber ) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        genderError: 'Gender is required',
        phoneNumberError:'',
      }));
      return;
    }

    if (!formData.username && formData.gender) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        usernameError: 'Username is required',
        genderError:'',
      }));
      return;
    }

    if (!formData.password && formData.username) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        passwordError:'Password is required',
        usernameError:'',
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        confirmPasswordError:'Passwords do not match',
        passwordError:'',
      }));
      return;
    }

    if (!Object.keys(formError).length) {
      alert("success");
      history.push("/");
    }
  };


  return (
    <div className='vh-100 d-flex justify-content-between align-items-center'>
     
    <form onSubmit={handleSubmit} className='signup-container box-shadow-light'>
    <h2 className="text-center line-in-text">SignUp</h2>
      <div>First Name:
        <input className='form-input w-100' name='firstName' type="text" value={formData.firstName} onChange={handleChange}/>
        {formError.firstNameError && <p className='text-red mt-1'>{formError.firstNameError}</p>}
      </div>
      <div> Last Name: 
        <input className='form-input w-100 ' name='lastName' type="text" value={formData.lastName} onChange={handleChange} />
        {formError.lastNameError && <p className='text-red mt-1'>{formError.lastNameError}</p>}
      </div>
      <div> Email: 
        <input className='form-input w-100 'name='email' type="email" value={formData.email} onChange={handleChange} />
        {formError.emailError && <p className='text-red mt-1'>{formError.emailError}</p>}
      </div>
      <div> PhoneNumber: 
        <input className='form-input w-100 ' name='phoneNumber' type="tel" value={formData.phoneNumber} onChange={handleChange} />
        {formError.phoneNumberError && <p className='text-red mt-1'>{formError.phoneNumberError}</p>}
      </div>
      <div>Gender:
        <select className='form-input w-100 ' name='gender' value={formData.gender} onChange={handleChange}>
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formError.genderError && <p className='text-red mt-1'>{formError.genderError}</p>}
      </div>
      <div>Username:<input className='form-input w-100 ' name='username' type="text" value={formData.username} onChange={handleChange} />
       {formError.usernameError && <p className='text-red mt-1'>{formError.usernameError}</p>}
      </div>
      <div>Password:<input className='form-input w-100 ' name='password' type="password" value={formData.password} onChange={handleChange} />
       {formError.passwordError && <p className='text-red mt-1'>{formError.passwordError}</p>}
      </div>
      <div>confirm Password:<input className='form-input w-100 ' name='confirmPassword' type="text" value={formData.confirmPassword} onChange={handleChange} />
       {formError.confirmPasswordError && <p className='text-red mt-1'>{formError.confirmPasswordError}</p>}
      </div>
      
      <button className='btn btn-blue' type='submit' >Submit</button>
  
    </form>
    </div>
  )

}