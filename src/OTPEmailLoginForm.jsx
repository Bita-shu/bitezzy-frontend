import { useState } from "react";
import { Navigate, Link, useNavigate} from "react-router-dom";
import "./App.css"
const LoginForm=()=>{
    const navig=useNavigate();
    const [Values, setValues]=useState({
        email:"",
        password:""
    })
    let handleChange= (e)=>{
       const{name ,value}=e.target
       setValues({...Values, [name]:value})
    }
    const [Error, setError]=useState({
        email:"",
        password:""
    })
    const FormSubmit= async (e)=>{
        e.preventDefault();
        let er={}
    if (!Values.email) {
      er.email="Email is required"
    } else if(!/\S+@\S+\.\S+/.test(Values.email)) {
      er.email="Email is inavlid"
    }
    if (!Values.password) {
      er.password="Password is required"
    } else if(Values.password.length<6){
      er.password="Password must contains more than 6 character"
    }

    if (Object.keys(er).length>0) {
      setError(er)
    } else {
      setError({})
      try {
      const response= await fetch(`http://localhost:8080/loginPage`,{method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(Values)
      })
      const loginMessage=await response.text();
      if (response.ok) {
         localStorage.setItem("userEmail", Values.email);                 
        navig("/LoggedPage",{state:{email:Values.email}})
      } else {
        let backEndError={email:"", password:""}

        if (loginMessage.includes("Account")) {
          
          backEndError.email=loginMessage
          
        }else if(loginMessage.includes("Password")){
          backEndError.password=loginMessage
        }
        setError(backEndError);
       
      } } catch (e) {
        console.error(`Error occured in Loginform: ${e}`)
      }
    }
    }
    return(
        <div className="wrapper">
           <div className="card">
           <div >
            <h1 className="title">Welcome Back</h1>
            <p className="sub"> we're glad to see you again</p>
        </div>
        <div >
            <form  onSubmit={FormSubmit}>
           <div className="inputgroup">
            <label className="label">UserEmail</label>
            <input className="custom-input" type="email" name="email" id="e" 
            placeholder="Enter Email" 
            value={Values.email}      
            onChange={handleChange}/>
            {Error.email && <span className="error">{Error.email}</span>}
           </div>
           <div className="inputgroup">
            <label className="label">Password</label>
            <input className="custom-input" type="password" name="password" id="pass"
             placeholder="Enter Password" 
             value={Values.password} 
            onChange={handleChange}/>
           {Error.password && <span className="error">{Error.password}</span>}
           <div className="Link">
            <Link to="/ForgotPassword" className="app-link">Forgot password</Link>
           </div>
         </div>
         <button type="submit" className="btn-pry">Sign In</button>
            </form>
            <p className="footer">
                Don't have an account? <Link to="/Register" className="app-link">Register</Link>
            </p>
            <div className="divider-box">
                <span className="divider-line"></span>
                <span className="divider-text">OR</span>
                <span className="divider-line"></span>
            </div>
             <div className='social'>
              <button className='social-btn'>
                <span className='google'>G</span>Google
              </button>
              <button className='social-btn'>
                <span className='facebook'>F</span>Facebook
              </button>
             </div>
        </div>
     </div>
     </div>
    )
}
export default LoginForm;