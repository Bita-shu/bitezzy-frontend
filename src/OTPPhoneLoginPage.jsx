import { useNavigate } from "react-router-dom";
import { useState } from "react";
function PhoneLogin(){
 const navig=useNavigate();
    const [Values, setValues]=useState({
       phone:""
    })
    let handleChange= (e)=>{
       const{name ,value}=e.target
       setValues({...Values, [name]:value})
    }
    const [Error, setError]=useState({
       phone:""
    })
    const FormSubmit= async (e)=>{
        e.preventDefault();
        let er={}
    if (!Values.phone) {
      er.phone="Number is required"
    } else if(!/^\d+$/.test(Values.phone)) {
      er.phone="Number is inavlid"
    }else if (Values.phone.length>10 || Values.phone.length<10) {
        er.phone ="Number is invalid"
    }
   

    if (Object.keys(er).length>0) {
      setError(er)
    } else {
      setError({})
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
            <label className="label">Phone Number</label>
            <input className="custom-input" type="text" name="phone" id="e" 
            placeholder="Enter number" 
            value={Values.phone}      
            onChange={handleChange}/>
            {Error.phone && <span className="error">{Error.phone}</span>}
           </div>
           <div>
         </div>
         <button type="submit" className="btn-pry">Verify OTP</button>
            </form>
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
export default PhoneLogin;