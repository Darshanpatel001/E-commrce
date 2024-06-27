import React, { useState, useEffect } from "react";
import { get_api } from "../../api/api";
import { get_product } from "../../constant";
import Swal from "sweetalert2";
import axios from "axios";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from the API
  const GET_products = async () => {
    try {
      let res = await get_api(get_product);
      console.log(res);
      setProduct(res.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  // Fetch cart items from the backend
  const GET_cart = async () => {
    try {
      let res = await axios.get("http://localhost:3001/addtocart");
      console.log(res);
      setCart(res.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    GET_products();
    GET_cart();
  }, []);

  // Add product to the cart
  const ADD_cart = async (val) => {
    try {
      // Check if the product is already in the cart
      const isProductInCart = cart.some((item) => item.id === val.id);

      if (isProductInCart) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Product is already in the cart",
        });
      } else {
        let result = await axios.post("http://localhost:3001/addtocart", val);
        console.log(result);
        setCart([...cart, result.data]);
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Product has been added to the cart",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the product to the cart",
      });
    }
  };

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
                <th scope="col">Add to Cart</th>
              </tr>
            </thead>
            <tbody>
              {product?.map((val) => {
                return (
                  <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>{val.desc}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => ADD_cart(val)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
