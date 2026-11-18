import { useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";

function Register(){

    const navigateLogin=useNavigate();
    const[regData, setRegData]=useState({
        file:"",
        email:"",
        name:"",
        password:"",
        confirmPassword:"",
        age:"",
        phone:""
    })
   const handleChange=(e)=>{
    const {name, value}=e.target
    setRegData({...regData,[name]:value})
   }
   const [error, setError]=useState({
        email:"",
        name:"",
        password:"",
        confirmPassword:"",
        age:"",
        phone:""
   })
   let submitValidation= async (i)=>{
    i.preventDefault();
    let err={}
    if (!regData.email) {
        err.email="Email Required"
    }
    else if (!/\S+@\S+\.\S+/.test(regData.email)) {
        err.email="Invalid Email"
    }
    if (!regData.name) {
        err.name="Name Required"
    }
    else if (!/^[a-zA-Z ]+$/.test(regData.name)) {
        err.name="Name only with letters"
    }
    if (!regData.password) {
        err.password="Password Required"
    }else if (regData.password.length<6) {
        err.password="Password must contains more than 6 letters"
    }
    if (!regData.confirmPassword) {
        err.confirmPassword="Confirm the Password"
    }else if (regData.password !== regData.confirmPassword) {
        err.confirmPassword="Incorrcet Confirm Password"
    }
    if (!regData.age) {
        err.age="Age Required"
    }
    else if (regData.age<18) {
        err.age="Older than 18 are Allowed"
    }
    if (!regData.phone) {
        err.phone="Phone Number Required"
    }
    else if (regData.phone.length!==10) {
        err.phone="Invalid and Inorder Phone number"
    }
    if (Object.keys(err).length>0) {
        setError(err)
    } else {
        setError({})
     try {
        
        const data=new FormData()
        data.append("file",regData.file);
        data.append("email",regData.email);
        data.append("name",regData.name);
        data.append("password",regData.password);
        data.append("confirmPassword", regData.confirmPassword);
        data.append("age", regData.age);
        data.append("phone", regData.phone);
        const response=await fetch(`https://13.239.252.125.sslip.io:8080/register/User-Detail/`,{
            method:"POST",
            body:data
        })
        const message= await response.text();
        
        if (response.ok) {
            navigateLogin("/verify", {state:{email:regData.email}})
        }else{
            let backendErr={}
            if (message.includes("Account")) {
                backendErr.email=message
            }else if (message.includes("password")) {
                backendErr.confirmPassword=message
            }
        }
           } catch (error) {
        console.error("error occured in this: ",error)
     }
    } 
   }
    return(
        <div>
            <div>
                <h2>User Registration</h2>
            </div>
            <form onSubmit={submitValidation}>
                <label>User Profile:</label>
                <input type="file" placeholder="Upload profile" name="file" accept="image/*" 
                onChange={(e)=>{
                    if (e.target.files && e.target.files[0]) {
                        setRegData({...regData,file:e.target.files[0]})
                    }
                }}/><br/><br/>
                <label>Enter Email:</label>
                <input type="email" placeholder="Email" name="email" value={regData.email} onChange={handleChange}/>
                {error.email && <span style={{color:"red"}}>{error.email}</span>}
                <br/><br/>
                <label>Enter Name:</label>
                <input type="text" placeholder="UserName" name="name" value={regData.name} onChange={handleChange}/>
                {error.name && <span style={{color:"red"}}>{error.name}</span>}
                <br/><br/>
                <label>Enter Password:</label>   
                <input type="password" placeholder="Create Password" name="password" value={regData.password} onChange={handleChange}/>
                {error.password && <span style={{color:"red"}}>{error.password}</span>}
                <br/><br/>
                <label>Enter ConfirmPassword:</label>
                <input type="password" placeholder="Confirm Password" name="confirmPassword" value={regData.confirmPassword} onChange={handleChange}/>
                {error.confirmPassword && <span style={{color:"red"}}>{error.confirmPassword}</span>}
                <br/><br/>
                <label>Enter Age:</label>
                <input type="text" placeholder="User Age" name="age" value={regData.age} onChange={handleChange}/>
                {error.age && <span style={{color:"red"}}>{error.age}</span>}
                <br/><br/>
                <label>Enter Phone:</label>
                <input type="text" placeholder="mobile.no" name="phone"value={regData.phone} onChange={handleChange}/>
                {error.phone && <span style={{color:"red"}}>{error.phone}</span>}
                <br/><br/>

                <button type="submit">Submit</button>
            </form>
            <div>
                <p>Already have an Account?<Link to={"/"}>Sign in</Link></p>
            </div>
        </div>
    )
}
export default Register;