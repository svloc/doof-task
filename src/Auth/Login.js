import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Signup from "./SignUp";
export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState({});
  const [isLogin, setLogin] = useState(true);

  let history = useHistory();
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.username || formData.username.trim().length === 0) {
      setFormError({ ...formError, usernameError: "Username is required" });
      return;
    } else if (formData.username.length < 6) {
      setFormError({ ...formError, usernameError: "Username must be at least 6 characters long" });
      return;
    } else {
      setFormError({});
    }
    if (!formData.password || formData.password.trim().length === 0) {
      setFormError({ ...formError, passwordError: "Password is required" });
      return;
    } else if (formData.password.length < 8) {
      setFormError({ ...formError, passwordError: "Password must be at least 8 characters long" });
      return;
    } else {
      setFormError({});
    }
    if (!Object.keys(formError).length) {
      history.push("/mcq-exam");
      handleLogin();
    }

  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const json = await response.json();
      if (json.loginData.isLogin) {
        localStorage.setItem("loginData", JSON.stringify(json.loginData))
        alert(json.message);
        history.push("/mcq-exam");
        setFormData({});
        setFormError({});
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function signUp() {
    setLogin(false);
  }


  return (
    <div className='vh-100 d-flex justify-content-between align-items-center'>
      {isLogin ?
        <div className="d-flex justify-content-center align-items-center login-form-wrapper">
          <form className="input-container d-flex m-auto justify-content-center box-shadow-light">
            <img alt='logo' src="../Coffee-cup.svg" height={'150px'} />
            <h2 className="text-center line-in-text">LOGIN</h2>

            <div>
              <p>Enter Your Username</p>
              <input className='form-input w-100 ' name='username' onChange={handleChange} value={formData.username} />
              {formError.usernameError && <p className='text-red mt-1'>{formError.usernameError}</p>}
            </div>

            <div>
              <p>Enter Your Password</p>
              <input className='form-input w-100 ' name="password" onChange={handleChange} value={formData.password} />
              {formError.passwordError && <p className='text-red mt-1'>{formError.passwordError}</p>}
            </div>

            <a disabled={true} className="mb-1 text-decoration-underline cursor-pointer">Forgot Username or Password?</a>
            <button className="btn  btn-black" disabled={!formData.username || !formData.password} onClick={handleSubmit}> Start Exam</button>

            <div className="line-in-text">or sign in with</div>
            <button className="btn d-flex justify-content-center align-items-center " disabled={true}>
              <img src="../google.svg" alt='Google' />&nbsp;Google
            </button>
            {/* <div className="text-center cursor-pointer">Need help? <a className="text-decoration-underline">Visits our help center</a> </div> */}
            <div className="text-center cursor-pointer">Need an account? <a onClick={signUp} className="text-decoration-underline">Sign Up</a></div>
          </form>
        </div>
        :
        <div className="d-flex justify-content-center align-items-center login-form-wrapper">
          <Signup />
        </div>
      }
      <div className="login-img-wrapper">
        <img alt='login_boy' src="../login_boy.svg" className="login-img" />
      </div>
    </div>
  );
}
