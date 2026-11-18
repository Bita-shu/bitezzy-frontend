import React from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

function Drop(){
 const nav=useNavigate()


    return(
        <div>
            <div>
                <div>
                    <label onClick={()=>{
                        nav('/')
                    }}>Menu</label>
                </div>
                <select name="menu">
                    <option> </option>
                </select>
            </div>
        </div>
    )
}
export default Drop;