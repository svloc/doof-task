import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './SignUp.css';
export default function Signup() {
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", gender: "", username: "", password: "", confirmPassword: "" });

  let history = useHistory();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError({});

    if (!formData.firstName || formData.firstName.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, firstNameError: 'First name is required', }));
      return;
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      setFormError((prevErrors) => ({ ...prevErrors, firstNameError: 'First name must contain only letters', }));
      return;
    } else if (formData.firstName.length < 3) {
      setFormError((prevErrors) => ({ ...prevErrors, firstNameError: 'First name must be at least 3 characters long', }));
      return;
    } else {
      setFormError({});
    }

    if (!formData.lastName || formData.lastName.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, lastNameError: 'Last name is required', firstNameError: '', }));
      return;
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      setFormError((prevErrors) => ({ ...prevErrors, lastNameError: 'Last name must contain only letters', }));
      return;
    } else if (formData.lastName.length < 3) {
      setFormError((prevErrors) => ({ ...prevErrors, lastNameError: 'Last name must be at least 3 characters long', }));
      return;
    } else if (formData.firstName === formData.lastName) {
      setFormError((prevErrors) => ({ ...prevErrors, lastNameError: 'First name and Last nam must be different' }));
      return;
    } else {
      setFormError({});
    }


    if (!formData.email || formData.email.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, emailError: 'Email is required', lastNameError: '', }));
      return;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      setFormError((prevErrors) => ({ ...prevErrors, emailError: 'Invalid email address' }));
      return;
    } else {
      setFormError({});
    }

    if (!formData.phoneNumber || formData.phoneNumber.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, phoneNumberError: 'Phone number is required', emailError: '', }));
      return;
    } else if (! /^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      setFormError((prevErrors) => ({ ...prevErrors, phoneNumberError: 'Invalid Indian phone number' }));
      return;
    } else {
      setFormError({});
    }

    if (!formData.gender || formData.gender.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, genderError: 'Gender is required', phoneNumberError: '', }));
      return;
    } else {
      setFormError({});
    }

    if (!formData.username || formData.username.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, usernameError: 'Username is required', genderError: '', }));
      return;
    } else if (formData.username.length < 6) {
      setFormError({ ...formError, usernameError: "Username must be at least 6 characters long" });
      return;
    } else {
      setFormError({});
    }

    if (!formData.password && formData.username || formData.password.trim().length === 0) {
      setFormError((prevErrors) => ({ ...prevErrors, passwordError: 'Password is required', usernameError: '', }));
      return;
    } else if (formData.password.length < 8) {
      setFormError({ ...formError, passwordError: "Password must be at least 8 characters long" });
      return;
    } else {
      setFormError({});
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError((prevErrors) => ({ ...prevErrors, confirmPasswordError: 'Passwords do not match', passwordError: '', }));
      return;
    } else {
      setFormError({});
    }

    if (!Object.keys(formError).length) {
      console.log(formData);
      handleSignUp();
    }
  };


  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8000/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const json = await response.json();

      if (json.isSignup) {
        alert(json.message);
        history.push("/");
        setFormData({});
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='signup-container box-shadow-light'>
      <h2 className="text-center line-in-text">SignUp</h2>
      <div>First Name:
        <input className='form-input w-100' name='firstName' type="text" value={formData.firstName} onChange={handleChange} />
        {formError.firstNameError && <p className='text-red mt-1'>{formError.firstNameError}</p>}
      </div>
      <div> Last Name:
        <input className='form-input w-100 ' name='lastName' type="text" value={formData.lastName} onChange={handleChange} />
        {formError.lastNameError && <p className='text-red mt-1'>{formError.lastNameError}</p>}
      </div>
      <div> Email:
        <input className='form-input w-100 ' name='email' type="email" value={formData.email} onChange={handleChange} />
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
  )

}