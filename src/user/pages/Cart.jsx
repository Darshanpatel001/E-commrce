import React from 'react'
import { useState, useEffect } from 'react';
import { delete_api } from '../../api/api';
import { delete_product } from '../../constant';
import Swal from 'sweetalert2';
import axios from 'axios';
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  let getData = async () => {

    let res = await axios.get("http://localhost:3001/addtocart");
    console.log(res);

    setCart(res.data);

  }
  
 
  // =============delete_methode============
  async function deleteCart(id) {
    try {
      let res = await axios.delete(`http://localhost:3001/addtocart/${id}`)
    console.log(res);
    
    setCart(cart.filter((val) => val.id != id));
    Swal.fire({
      title: "Good job!",
      text: "Delete Successfully",
      icon: "success"
    });
        
    } catch (error) {
        console.log("error");
    }
}
useEffect(() => {
  
  getData();

}, [])
  useEffect(() => {
    const prices = cart.map(val => val.price);
    const sum = prices.reduce((acc, price) => acc + parseInt(price, 10 ), 0);
    setTotalSum(sum);
}, [cart]);

  return (
    
      <div className="container-fluid">
        <div className="row col-md-12">
          <div className="col-md-12">
           
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((val, index) => (
                  <tr key={index}>
                    <th scope="row">{val.id}</th>
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>{val.desc}</td>
                    <td><button className='btn btn-primary' onClick={()=>deleteCart(val.id)} >Delete</button></td>
                  </tr>
                ))}
                 <tr>
                                <td colSpan="3"></td>
                                <td><strong >Total:</strong> {totalSum}</td>
                                <td></td>
                            </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  
}

export default Cart