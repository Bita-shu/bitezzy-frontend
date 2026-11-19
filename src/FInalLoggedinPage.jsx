import { useEffect, useState } from "react"
import "./Demo.module.css"
function LoggedPage(){
    const[logData,setLogData]=useState({})
   const email=localStorage.getItem("email")
   const [isEdit, setIsEdit]=useState(false);
   const [prof, setProf]=useState(false);
    useEffect(()=>{
   const submitionValidate= async (i)=>{
        const response=await fetch(`https://13.239.252.125.sslip.io/user-detail/${email}`)
       
         if (response.ok) {
            const userData=await response.json()
            setLogData(userData)
         }
    }
    if (email) {
        submitionValidate()
    }
    },[email])
    const [data,setData]=useState({
        file:"",
        email: "",
        name:"",
        age:"",
        phone: ""
    })
    useEffect((i)=>{
        if (logData) {
            setData({
                file:logData.userProfile || "",
                email:logData.email || "",
                name: logData.name || "",
                age: logData.age || "",
                phone: logData.phone ||""
            });
        }
    }, [logData])
    const handleChange=(i)=>{
        const{name,value}=i.target
        setData({...data,[name]:value})
    }
    const [error, setError]=useState({
        name:"",
        age:"",
        phone:""
    })
    const updateValidation= async (i)=>{
        i.preventDefault()
        let err={}
        if (!data.name) {
           err.name="Name Required" 
        }else if (!/^[a-zA-Z ]+$/.test(data.name)) {
            err.name="Name only with letters"
        }
        if (!data.age) {
            err.age="Age Required"
        }else if (data.age<18) {
            err.age="Older than 18 are Allowed"
        }
        if (!data.phone) {
            err.phone="Number Required"
        }else if (data.phone.length!==10) {
           err.phone="Invalid and Inorder Phone number"
        }
        if (Object.keys(err).length>0) {
            setError(err)
            return;
        } else {
            setError({})
            try { 
                 
                const param=new FormData();
                if (data.file instanceof File) {
                    param.append("file",data.file);
                }
                param.append("email", data.email);
                param.append("name", data.name);
                param.append("age", data.age);
                param.append("phone", data.phone);

                const response=await fetch(`https://13.239.252.125.sslip.io/Edit/user-profile/`, {
                    method:"PUT",
                    body:param
                })
                
                const message=await response.text()
               
                if (response.ok) {
                    alert(message)
                    setIsEdit(false);
                } else {
                    let backendErr={}
                   backendErr.email=message
                   setError(backendErr)
                }
            } catch (error) {
                console.error("error occured in updated page: ",error)
            }
        }
    }
     let deleteValidation =async function(i){
            i.preventDefault()

            const confirm= window.confirm("Are you sure, You want to delete the User account..?")
            if (!confirm) {
                return;
            }

            try {
                const response=await fetch(`https://13.239.252.125.sslip.io/delete/user-account/${email}`,{
                    method:"DELETE"
                })
                const message=await response.text();
                if (response.ok) {
                   
                    alert(message)
                } else {
                 setError({})
                    if (message.includes("not")) {
                        let backendErr={}
                        backendErr.email=message
                        setError(backendErr)
                    }
                }
            } catch (error) {
                console.error("Error occured in the delete validation : ", error)
            }
         

        }
    return(
        <div className="mainClass">
        {prof ? (<div>  
             
    <div className="container">
         <div className="anotherContainer">  
          {prof && isEdit ? (()=>{}):(<button type="button" className="anotherEditBack" onClick={()=>{setProf(false) } }>Back</button>)}
        </div>
         <div className="anotherContainer">  
          {isEdit && <button type="button" className="anotherEditBack" onClick={()=>{setIsEdit(false)}}>Back</button>}
        </div>

        <div className="welcomeHeader">
            <h2>Welcome, {logData?.name || "User"}</h2>
        </div>
        <div className="actionContainer">
          {!isEdit && <button type="button" className="editButton" onClick={()=>setIsEdit(true)}>
                Edit Profile
            </button> }
        </div>

    
        <form onSubmit={updateValidation} className="form">
            <label className="label">User Profile:</label>
            <div>
                {isEdit ? (
                    <input
                        type="file" 
                        accept="image/*" 
                        name="file" 
                        className="input"
                        onChange={(i)=>{
                            if (i.target.files && i.target.files[0]) {
                                setData({...data, file: i.target.files[0]})
                            }
                        }}
                    />
                ):(
                    <img src={data.userProfile} alt="Profile" className="profileImg" />
                )}
            </div>

            <label className="label">Email:</label>
            <input 
                type="email" 
                name="email" 
                value={data.email} 
                disabled={!isEdit} 
                className="input"
            />

            <label className="label">Name:</label>
            <input 
                type="text" 
                name="name" 
                value={data.name} 
                disabled={!isEdit} 
                onChange={handleChange} 
                className="input"
            />
            {error.name && <span className="errorText">{error.name}</span>}

            <label className="label">Age:</label>
            <input 
                type="text" 
                name="age" 
                value={data.age} 
                disabled={!isEdit} 
                onChange={handleChange} 
                className="input"
            />
            {error.age && <span className="errorText">{error.age}</span>}

            <label className="label">Phone:</label>
            <input 
                type="text" 
                name="phone" 
                value={data.phone} 
                disabled={!isEdit} 
                onChange={handleChange} 
                className="input"
            />
            {error.phone && <span className="errorText">{error.phone}</span>}

            {isEdit && <button type="submit" className="saveButton">Save Changes</button>}
        </form>

            
      {!isEdit && <div className="deleteContainer">
            <button type="button" className="deleteButton" onClick={deleteValidation}>
                Delete Account
            </button>
        </div> }
      
    </div>
        </div>) : (<div className="profileDiv"><button type="button" className="profileShower" onClick={()=>{setProf(true)}}>User Profile</button> </div>  )}
      </div>
);
}
export default LoggedPage