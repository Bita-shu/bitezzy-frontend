import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from "./finalRegisterPage"
import LoginPage from "./finalLoginPage"
import LoggedPage from "./FInalLoggedinPage"
import Verification from "./finalOTPVerification"
import "./App.css"

function Ap(){
 return(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/registerPage" element={<Register/>}/>
      <Route path="/User-LoggedPage" element={<LoggedPage/>}/>
      <Route path="/verify" element={<Verification/>}/>
    </Routes>
  </Router>
 )
}                                     
export default Ap                                                                                                                                        