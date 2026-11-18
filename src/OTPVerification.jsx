import React, { useEffect, useState } from "react";
import { Navigate, PrefetchPageLinks, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Verification=()=>{
    const loca=useLocation();
    const navigation=useNavigate();
    const getEmail=loca.state.email;
    const [data,setData]=useState({

        email:loca.state?.email  || "",
        otp:""
    })
    const [error,setError]=useState({
        email:"",
        otp:""
    })
  let ema=()=>{
    data.email=getEmail
  }
    let change=(e)=>{
        const {name,value}=e.target;
        setData({...data, [name]:value})  
    }

    let VerificationSubmit= async (e)=>{
       
        e.preventDefault()
        try {
            const verifyParam=new URLSearchParams();
            verifyParam.append("email",data.email);
            verifyParam.append("otp",data.otp);
            const response =await fetch(`http://localhost:8080/OTP/Verification`,
                {method:"POST",
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                body:verifyParam.toString()
                })
                  
                const verificationMessage=await response.text();
                if (response.ok) {
                    alert(verificationMessage)
                    navigation("/emailLoginPage")
                } else {
                   
                    let backendError={email:"",otp:""}

                    if (verificationMessage.includes("Account")) {
                        backendError.email=verificationMessage;
                    }else if(verificationMessage.includes("OTP")){
                        backendError.otp=verificationMessage;
                    }
                    setError(backendError)
                }
            
        } catch (error) {
            console.error(`Error Occured ${error}`)
        }
    }
    return(
    <div className="wrapper">
        <div className="card">
            <div>
            <h2 className="title">Verify your OTP</h2>
            </div>
            <div>
                <form onSubmit={VerificationSubmit}>
                    <div className="inputgroup">
                        <label className="label">Email Address</label>
                        <input className="custom-input" type="email" name="email" value={data.email} onChange={change} />
                        {error.email && <span className="error">{error.email}</span>}
                    </div>
                    <div>
                        <label className="label">Enter OTP</label>
                        <input className="custom-input" type="text" name="otp" value={data.otp} onChange={change}/>
                        {error.otp && <span className="error">{error.otp}</span>}
                    </div>
                    <button className="btn-pry" type="submit">Verify</button>
                </form>
            </div>
        </div>
    </div>
)}
export default Verification;