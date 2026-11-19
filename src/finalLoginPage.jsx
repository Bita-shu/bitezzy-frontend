import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
function LoginPage(){
    const navi=useNavigate()
    const[data, setData]=useState({
        email:"",
        password:""
    })
    let handleChange=(e)=>{
        const {name,value}=e.target
        setData({...data,[name]:value})
    }

    const [error, setError]=useState({
        email:"",
        password:""
    })
   let submitionForm= async (i)=>{
    i.preventDefault();
    setError({})
    let err={};
    if (!data.email) {
        err.email="Email Required"
    }else if (!/\S+@\S+\.\S+/.test(data.email)) {
        err.email="Invalid email Formate"
    }
    if (!data.password) {
        err.password="Password Required"
    }else if (data.password.length<6) {
        err.password="Password must be in greater than 6 letters"
    }
    if (Object.keys(err).length>0) {
        setError(err)
    }else{
        
         setError({})
        try {
            
        const response=await fetch(`https://13.239.252.sslip.io/Login-page/` ,{
            method:"post",
           headers:{"Content-Type": "application/json"},
           body:JSON.stringify(data)
        })
        const message=await response.text();
        if (response.ok) {
        
            navi("/User-LoggedPage")
        }else{
            
            setError({})
            let backendError={}
            if (message.includes("not")) {
                backendError.email=message
            }else if (message.includes("Invalid")) {
                backendError.password=message
            }
            setError(backendError)
        }
             
        } catch (error) {
           console.error("error Occured: ", error) 
        }
    }
   }

    return(
        <div>
            <div>
                <h2>Welcome to Login Page</h2>

                <div>
                    <form onSubmit={submitionForm}>
                         <label> Summa:</label>
                         <input type="text"/>
                        <label>Enter UserEmail</label>
                        <input type="email" name="email" id="emailID" placeholder="Email" value={data.email} onChange={handleChange}/>
                         {error.email && <span style={{color:"red"}}>{error.email}</span>}<br/><br/>
                        <label>Enter Password</label>
                        <input type="password" name="password" id="passwordID" placeholder="Password" value={data.password} onChange={handleChange}/>
                        {error.password && <span style={{color:"red"}}>{error.password}</span>}<br/>
                        <div>
                            <Link >forgot Password</Link>
                        </div><br/>
                        <button type="submit">Submit</button>
                          
                    </form>
                       <p>Did'nt have an account? <Link to="/registerPage">Register</Link></p>
                </div>
            </div>
        </div>
    )
}
export default LoginPage