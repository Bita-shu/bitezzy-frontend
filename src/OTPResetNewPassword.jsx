import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
function ResetLink(){
const [data,setData]=useState({
    newPassword:"",
    confirmPassword:""
})
const [searchParams]=useSearchParams();
const realToken=searchParams.get("token")
const[error,setError]=useState({
    newPassword:"",
    confirmPassword:"",
    backendError:""
})
const navi=useNavigate();
const[success,setSuccess]=useState({
     backendSuccess:""
})
const change=(e)=>{
const{name,value}=e.target;
setData({...data,[name]:value})
}
let formSubmit= async(e)=>{
    e.preventDefault()
    let err={};
    if (!data.newPassword) {
        err.newPassword="Password required"
    }else if(data.newPassword.length<6){
        err.newPassword="Password must contains more than 6 character"
    }
    if (!data.confirmPassword) {
        err.confirmPassword="Confirm password required"
    }else if(data.newPassword!=data.confirmPassword){
        err.confirmPassword="Password do not match!"
       
    }
    if (Object.keys(err).length>0) {
        setError(err)
    } else {

        setError({})

        try {

const url=`http://localhost:8080/reset-password?token=${encodeURIComponent(realToken)}&newPassword=${encodeURIComponent(data.newPassword)}&confirmPassword=${encodeURIComponent(data.confirmPassword)}`;
    const response =await fetch(url,
        {method:"POST",
        })
            const message=await response.text();
           
            if (response.ok) {
                
                setError({})
               setSuccess({...success,backendSuccess:message})

               navi("/emailLoginPage")

            }else{
               
                setSuccess({})
                setError({...error,backendError:message})
                
            }
        } catch (error) {
            console.error("Error Occured in ResetNewPassword:",error);
        }
    } 
}
return (
    <div className="wrapper">
        <div className="card">
            <div>
            <h3 className="title">Reset Forgot Email Password</h3>
            </div>
            <div>
            <form onSubmit={formSubmit}>
                <div className="inputgroup">
                    <label className="label">Enter Password</label>
                    <input className="custom-input" type="password" name="newPassword" id="pass"
                    placeholder="New Password" 
                    value={data.newPassword}
                    onChange={change}
                    />
                    {error.newPassword && <span className="error">{error.newPassword}</span>}
                </div>
                <div className="inputgroup">
                    <label className="label">Enter Confirm Password</label>
                    <input className="custom-input" type="password" name="confirmPassword" id="conPass" 
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={change}
                    />
                    {error.confirmPassword && <span className="error">{error.confirmPassword}</span>}
                </div>
                <button type="submit" className="btn-pry">Submit</button>
                {error.backendError && <span  className="error">{error.backendError}</span>}
                {success.backendSuccess && <span  style={{color:'lightgreen',fontSize:13, fontWeight:500, marginTop:"2px"}}>{success.backendSuccess}</span>}
            </form>
            </div>
        </div>
    </div>
  )
}
export default ResetLink;