import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

let Verification = function(){

    const locate= useLocation()
    const userEmail=locate.state.email;
     const navigate=useNavigate();
    const[verData, setverData]=useState({
        email:locate.state?.email || "" ,
        otp:""
    })
    const handleChange=(e)=>{
     const{name,value}=e.target
     setverData({...verData,[name]:value})
    }
    const[error,setError]=useState({
        email:"",
        otp:""
    })
    let submitValidation = async (i)=>{
      i.preventDefault()
      let err={}
      if (!verData.email || verData.email !== userEmail) {
        err.email="Invalid Email"
      }
      if (!verData.otp) {
        err.otp="Invalid OTP"
      }
      if (Object.keys(err).length>0) {
        setError(err)
      }else{
        setError({})
        let param= new URLSearchParams()
        param.append("email", verData.email)
        param.append("otp", verData.otp)

        const response =await fetch(`https://13.239.252.125.sslip.io/OTP-verification/`,{
            method:"POST",
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            body:param.toString()
        })
        const message= await response.text()

        if (response.ok) {
            navigate("/")
        }else{
            let backendErr={}
            setError({})
            if (message.includes("Account")) {
                backendErr.email=message
            }
            else if (message.includes("Please")) {
                backendErr.otp=message
            }
        
            setError(backendErr)

        }

      }
    }
    return(
        <div>
            <div>
                <h3>Verify the Email with OTP</h3>

                <form onSubmit={submitValidation}>
                    <label>Email:</label>
                    <input type="email" name="email" value={verData.email} onChange={handleChange}/>
                    {error.email && <span style={{color:"red"}}>{error.email}</span>}
                    <label>Enter OTP: </label>
                    <input type="text" placeholder="OTP" name="otp" value={verData.otp} onChange={handleChange} />
                    {error.otp && <span style={{color:"red"}}>{error.otp}</span>}
                   <button type="Submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Verification;