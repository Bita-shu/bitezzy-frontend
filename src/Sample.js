import { type } from "@testing-library/user-event/dist/type";
import { useState, useEffect, act } from "react";
import { useReducer } from "react";
 const startBook={
        product:[],
        discount:0
 }
function ren(currentSate, action){
    switch (action.type){
        case "AddProduct":
            return{...currentSate, product:[...currentSate.product,
                {id:action.newItem.id , 
                name:action.newItem.name,                                                            
                price:action.newItem.price,
                quantity:1}]}
        case "incQuantity":
            return{
                ...currentSate, product: currentSate.product.map(
                cartiteam=> cartiteam.id===action.incproductId?{
                    ...cartiteam, quantity:cartiteam.quantity+1
                }
                     :cartiteam 
                )}
        default:         
        
        break;
    }
   
}
let TicketBooking=()=>{
   const [book, selectBooking]=useReducer(ren, startBook);

return (
    <div>
       <h1>Shopping Cart</h1>
       <button onClick={()=>
        selectBooking({type:"AddProduct", newItem:{ id:1, name:"Laptop", price:50000}})
        }>Add Laptop</button>

          <button onClick={()=>{
            selectBooking({type:"incQuantity", incproductId:1})
        }}>Increase Quantity</button>

        <button onClick={()=>{
            selectBooking({type:"RemoveProduct", productId:1})
        }}>Remove Laptop</button>

        <button onClick={()=>{
            selectBooking({type:"ApplyDiscount", discount:10})
        }}>   Apply 10% Discount</button>

        <button onClick={()=>{
            selectBooking({type:"Clear"})
        }}>Clear Cart</button>

        <h2>Cart</h2>
            
            {book.product.map(cartiteam=>(

                <div key={cartiteam.id}>
                    
                      <p>{cartiteam.name}-
                        ${cartiteam.price}-
                        Quantity:{cartiteam.quantity}
                </p>
                </div>
            ))}
            <p>Discount:{book.discount}%</p>
        </div>)}
export default TicketBooking;