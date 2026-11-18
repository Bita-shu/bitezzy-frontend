import { useNavigate } from "react-router-dom";

function FrontPage(){
  const navi=useNavigate()
return(
  <div className="landing-container">
      <div className="hero-card">
        
        <div className="logo-wrapper">
          <img src="/image_3.jpa" alt="BITEZYY Logo" className="brand-logo" />
        </div>

       
        <div className="brand-content">
          <h1 className="brand-title">Welcome to <span className="gold-text">BITEZYY</span></h1>
          <p className="brand-subtitle">Satisfy your cravings with premium dining & quick delivery.</p>
        </div>

      
        <div className="action-group">
         
          <button className="btn-primary" onClick={()=>{navi("/emailLoginPage")}}>Login Email</button> 
        </div>
      </div>
    </div>
)
}
export default FrontPage;