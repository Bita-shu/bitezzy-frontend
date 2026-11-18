import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function LoggedInner(){
const navi=useNavigate();
const locat=useLocation();     
const userEmail=localStorage.getItem("userEmail")
const [profile,setProfile]=useState(null);

const relogin=()=>{
   navi("/emailLoginPage")
}

useEffect(()=>{  
if (!userEmail) {
        navi("/emailLoginPage")
        return;
    }
    const dataFetch= async ()=>{
        try {
            const response =await fetch(`http://localhost:8080/user-detail-profile/${userEmail}`)

            if (!response.ok) {
                throw new Error("Failed to fetch profile")
            }
            const data= await response.json();
            setProfile(data);
        } catch (error) {
           console.error("error loading user profile: ",error.message()) 
        }
    }
    dataFetch();
},[userEmail, navi])


return(
    <div className="wrapper">
        <div className="dash-card">
            <div className="profile-header">
                <div className="profile-ring">
                    
                    {profile && profile.profilePicUrl ? (<img  src={profile.profilePicUrl} alt="profile" className="profile-img"/>
                    ):(
                    <div className="default-avatar">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.65-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    )}
                </div>
            </div>
         <h2 className="title">Welcome, {profile?.name || "User"}!</h2>
              <p className="sub"You have logged in successfully></p>

              <div className="action-button-group">
                <button className="btn-sec" onClick={relogin}>Log Out</button>

               <button className="btn-danger" >Delete Account</button>
              </div>

              <div className="visi">
                <form>
                    <div>
                        <label>User Profile</label>
                        <input type="file" accept="image/*"/>
                    </div>
                </form>
              </div>
        </div>
    </div>
)
}
export default LoggedInner;