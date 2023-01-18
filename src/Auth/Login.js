import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
export default function Login() {
  const [formData, setFormData] = useState({username:'',password:''});
  const [formError, setFormError] = useState({});
  let history = useHistory();
  function handleChange(event) {
   setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event){
       event.preventDefault();
       if (!formData.username || !formData.password) {
           setFormError({ ...formError, usernameError: "Username is required" });
           setFormError({ ...formError, passwordError: "Password is required" });
           return;
       } else if (formData.password && formData.username) {
           console.log(formData);
           setFormError({usernameError: "",passwordError: ""});
           setFormData({username:"",password:""});
           history.push("/mcq-exam");
       }
   
  }
  function signUp(){
    history.push("/signup");
  }


  return (
    <>
    <div className='vh-100 d-flex justify-content-between align-items-center'>
    
      <form className="input-container d-flex m-auto justify-content-center box-shadow-light">
        <img alt='logo' src="../Coffee-cup.svg" height={'150px'}/>
        <h2 className="text-center line-in-text">LOGIN</h2>
        
        <div>
          <p>Enter Your Username</p> 
          <input className='form-input w-100 ' name='username' onChange={handleChange} value={formData.username}/>
          {formError.usernameError && <p className='text-red mt-1'>{formError.usernameError}</p>}
        </div>

        <div>
          <p>Enter Your Password</p>
          <input className='form-input w-100 ' name="password" onChange={handleChange} value={formData.password}/>
          {formError.passwordError && <p className='text-red mt-1'>{formError.passwordError}</p>}
        </div>

        <a disabled={true} className="mb-1 text-decoration-underline cursor-pointer">Forgot Username or Password?</a> 
        <button className="btn  btn-black" disabled={!formData.username || !formData.password} onClick={handleSubmit}> Start Exam</button>
       
       
        
        <div className="line-in-text">or sign in with</div>
        <button className="btn d-flex justify-content-center align-items-center " disabled={true}>
         <img src="../google.svg" alt='Google'/>&nbsp;Google
        </button>
        {/* <div className="text-center cursor-pointer">Need help? <a className="text-decoration-underline">Visits our help center</a> </div> */}
        <div className="text-center cursor-pointer">Need an account? <a onClick={signUp} className="text-decoration-underline">Sign Up</a></div>
      </form>

    
      <img alt='login_boy' src="../login_boy.svg"  />
  
  </div>
    </>
  );
}
