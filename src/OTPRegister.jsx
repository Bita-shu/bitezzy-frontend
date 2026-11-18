import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
const Reg=()=>{
    const navs=useNavigate();
    const[Values,setValues]=useState({
        file:"",
        email:"",
        name:"",
        password:"",
        age:"",
        phone: ""
    })
    const handleChange=(e)=>{
     const{name,value}=e.target;
     setValues({...Values, [name]:value})
    }
    const [Error,setError]=useState({
        email:"",
        name:"",
        password:"",
        age:"",
        phone:"" 
    })
    const formSubmit=async (e)=>{
        e.preventDefault();
        let error={}

      if (!Values.email) {
        error.email="Email is Required"
      } else if(!/\S+@\S+\.\S+/.test(Values.email)){
        error.email="Email is Invalid"
      }
    if (!Values.name) {
      error.name="Name is required";
    }else if (!/^[a-zA-Z\s]+$/.test(Values.name)) {
      error.name="Name Should contan only letters";
    }
     
      if (!Values.password) {
        error.password="Password is required"
      } else if(Values.password.length<6){
        error.password="password must contains more than 6 character "
      }
     if (!Values.age) {
      error.age="Age is Required";
     }else if (Values.age <18) {
      error.age="Age Invalid";
     }
      if (!Values.phone) {
      error.phone="Number is Required";
     }
     
   
        if (Object.keys(error).length>0) {
        setError(error)
      } else {
        setError({})
      }
      if (Object.keys(error).length>0) {
        
      } else {

          
          
        try {
          
       const formData=new FormData();
       
       formData.append("file",Values.file);
       formData.append("email",Values.email);
       formData.append("name",Values.name); 
       formData.append("password",Values.password);
       formData.append("age", Values.age);
       formData.append("phone", Values.phone);

        const response= await fetch("http://localhost:8080/Email/Register",
          {method:"POST", 
           body:formData});
         
          const message= await response.text();
          if (response.ok) {
            
           navs("/verify",{state:{email: Values.email}})
          } else {
           alert(message)
          }
       } catch (error) {
          console.error("Error Occured : ",error)
        }
      }
    }
    return(
        <div className="wrapper">
            <div className="card">
                <div>
                    <h2 className="title">Create Account</h2>
                    <p className="sub">Join us today to get started</p>
                </div>
                <div>
                    <form onSubmit={formSubmit} >
                       <div className="inputgroup">
                        <label className="label">User Profile (Optional)</label>
                        <div className="file-upload-wrapper">
                        <input className="hidden-file-input" type="file" name="file" 
                        id="file-input"                    
                        accept="image/*"
                        onChange={(e)=>{
                          if (e.target.files && e.target.files[0]) {
                            setValues({...Values,file:e.target.files[0]})
                          }
                        }}/>
                        <label htmlFor="file-input" className="custom-file-btn">
                          {Values.file? ( <span className="file-name">{Values.file.name}</span>) : (<span>📷 choose Profile Picture</span> )}                        
                        </label>
                        </div>
                        </div>
                        <div className="inputgroup">
                        <label className="label">Enter UserEmail</label>
                        <input className="custom-input" type="email" name="email" 
                        id="t"
                        placeholder="Enter Email"
                        value={Values.email} 
                        onChange={handleChange}/>
                        {Error.email && <span className="error" > {Error.email}</span>}
                        </div>
                        <div className="inputgroup">
                            <label className="label">Enter UserName</label>
                            <input className="custom-input" type="text" name="name" 
                            placeholder="Enter Name" id="e" value={Values.name} onChange={handleChange}/>
                            {Error.name && <span className="error" > {Error.name}</span>}
                        </div>
                        <div className="inputgroup">
                            <label className="label">Enter Password</label>
                            <input className="custom-input" type="password" name="password" 
                            placeholder="Enter Password" id="pass" value={Values.password} onChange={handleChange}/>
                            {Error.password && <span className="error" > {Error.password}</span>}
                        </div>
                        <div className="inputgroup">
                            <label className="label">Enter Age</label>
                            <input className="custom-input" type="number" name="age"
                             placeholder="Enter Age" id="conPass" value={Values.age} onChange={handleChange}/>
                            {Error.age && <span className="error" > {Error.age}</span>}
                        </div> 
                        <div className="inputgroup">
                            <label className="label">Enter Phone</label>
                            <input className="custom-input" type="text" name="phone"
                             placeholder="Enter phone" id="conPass" value={Values.phone} onChange={handleChange}/>
                            {Error.phone && <span className="error" > {Error.phone}</span>}
                        </div> 
                        <button className="btn-pry">Sign Up</button>
                    </form>
                    <p className="footer">Already have an account<Link className="app-link" to='/emailLoginPage'>sign in</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Reg;