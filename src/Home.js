import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
export default function Home() {
  const [username,setUsername]= useState('')
  const [password, setPassword] = useState('')
  const [feedbackText, setFeedbackText] =useState('');
  let history = useHistory();

  const handleUsername=(e)=>{
    setUsername(e.target.value)
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit=(e)=>{
   e.preventDefault();
   if(username===''){
    setFeedbackText('Please fill Username');
    return;
   }

   if(password===''){
    setFeedbackText('Please fill Password');
    return;
   }
   
   if(username=='admin' && password=='Password'){
    setFeedbackText('')
    history.push("/exam");
   }
  else{
    setFeedbackText('Invalid Username or password')
  }
   
  }

  return (
    <>
    <div className='vh-100 d-flex justify-content-between align-items-center'>
    
      <form className="input-container d-flex m-auto justify-content-center ">
        <img alt='logo' src="../Coffee-cup.svg" height={'200px'}/>
        <h2 className="text-center line-in-text">LOGIN</h2>
        <div>Enter Your Username</div> 
        <input className='form-input w-100 ' type="text" name='username ' onChange={handleUsername} value={username}/>
        <div>Enter Your Password</div>
        <input className='form-input w-100 ' type="text"  name="password" onChange={handlePassword} value={password}/>
        <a className="mb-1 text-decoration-underline cursor-pointer">Forgot Username or Password?</a> 
        <button className="btn  btn-black"  onClick={handleSubmit}> Start Exam</button>
        <p className='text-red mt-1'>{feedbackText}</p>
        <div className="line-in-text">or sign in with</div>
        <button className="btn d-flex justify-content-center align-items-center " disabled={true}>
         <img src="../google.svg" alt='Google'/>&nbsp;Google
        </button>
        <div className="text-center cursor-pointer">Need help? <a className="text-decoration-underline">Visits our help center</a> </div>
      </form>

    
      <img alt='login_boy' src="../login_boy.svg"  />
  
  </div>
    </>
  );
}
