import './App.css'
import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
const Forgot=()=>{
  const [Values,setValues]=useState({
    email:""
  })
  const[error,setError]=useState({
    email:""
  })
  const[success,setSuccess]=useState({
    email:""
  })
  const nav=useNavigate();
const handlechange=(e)=>{
  const{name,value}=e.target
      setValues({...Values,[name]:value})
}
 const resetDone=async(e)=>{
e.preventDefault();
try {
const params=new URLSearchParams();
params.append("email",Values.email)

const response=await fetch(`http://localhost:8080/forgot/password`,
  {method:"POST",
  headers:{"Content-Type":"application/x-www-form-urlencoded"},
  body:params.toString()
});

const message=await response.text();

if (response.ok) {
  let resetSuccess={email:""};
  if (message.includes("successfully")) {
    resetSuccess.email=message
  }
  setError({});
   setSuccess(resetSuccess)

}else{
  let resetError={email:""}; 
  if (message.includes("Account")) {
   resetError.email=message 
  }
  setSuccess({})
  setError(resetError)

}} catch (error) {
  console.error("Error Occured: "+error)
}

 } 
  return(
    <div className='wrapper'>
      <div className='card'>
        <div>
          <h2 className='title'>Reset Password</h2>
          <p className='sub'>Enter your registered email address below and we'll send you a link to reset your password</p>
        </div>
    <form onSubmit={resetDone}>
      <div className='inputgroup'>
      <input  className='custom-input' type='email' name='email'placeholder='Enter Email' value={Values.email} onChange={handlechange}
      required
      /> 
      {error.email && <span className="error">{error.email}</span>}
      {success.email && <span style={{color:'lightgreen',fontSize:13, fontWeight:500, marginTop:"2px"}}>{success.email}</span>}

      </div>
      <button type='submit' className='btn-pry'>Send Resend Link</button>
    </form>
       <button className='btn-sec' onClick={()=>nav('/emailLoginPage')}>Return to login Page</button>
       </div>
       </div>
  )
}
export default Forgot;