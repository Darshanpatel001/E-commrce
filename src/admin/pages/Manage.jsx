import React, { useEffect, useState , useRef} from "react";
import { add_api, get_api, delete_api, Update_api } from "../../api/api";
import { delete_product, get_product, post_product, update_product } from "../../constant";
import { Switch,  TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const Manage = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    desc: "",
    isActive: true,
  });
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    price: "",
    desc: "",
    isActive: true,
  });

  let name = useRef();
  let price = useRef();
  let desc = useRef();

  let checkDuplicate = (name) => {
    let result = products.filter((val) => val.name === name);
    return result;
  };


  // Get data
  const getProducts = async () => {
    try {
      let res = await get_api(get_product);
      console.log(res);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value });
  };

  // Switch
  const handleSwitch = async (id, isActive, index) => {
    console.log(isActive);
    let data = products[index];
    console.log(data);
    await axios.put(`http://localhost:3001/products/${data.id}`, { ...data, isActive });

    setProducts(
      products.map((val, ind) => (val.id === id ? { ...data, isActive } : val))
    );
  };

  // Post method
  const postProduct = async (e) => {
    let data = {
      name: name.current.value,
      price: price.current.value,
      desc: desc.current.value,
      isActive: true,
    };
    let result = checkDuplicate(data.name)
    if (result.length !== 0) {
      console.log("duplicate found");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "duplicate found",
      });
    } else {
      let res = await add_api(post_product, data);
      e.preventDefault();
      console.log(res);
      
      console.log("product added success");
      Swal.fire({
        title: "Good job!",
        text: "product added success",
        icon: "success",
      });
      setProducts([...products, data]);
    }
  };

  // Delete method
  // const deleteProduct = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/products/${id}`);
  //     setProducts(products.filter((product) => product.id !== id));
  //     console.log(products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  let deleteProduct = async (id) => {
    try {

      let result = await delete_api(`${delete_product}/${id}`)
      console.log(result);

      setProducts(products.filter((products) => products.id !== id))
      console.log(products);
    } catch (err) {

      console.log(err, "err");

    }
  }
  // // Open modal for update
  // const openModal = (product) => {
  //   setUpdateProduct(product);
  //   setOpen(true);
  // };

  // // Update method
  // const updateProductDetails = async () => {
  //   try {
  //     await axios.put(`http://localhost:3001/products/${updateProduct.id}`, updateProduct);
  //     setProducts(products.map((product) =>
  //       product.id === updateProduct.id ? updateProduct : product
  //     ));
  //     setOpen(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  // Update Data
  let ViewData = (val) => {

    console.log(val);
    setUpdateProduct(val)
    let modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  }

  let handleView = (e) => {

    setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value })
   
  }

  let UpdateData = async () => {

    try {

      let result = await Update_api(`${update_product}/${updateProduct.id}`, updateProduct)
      console.log(result);

      setAddProduct(

        products.map((val, index) => (val.id == result.data.id ? { ...updateProduct } : val))
     
      )
      
    } catch (err) {
      
      console.log(err, "err");

    }

  }

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getProducts();
    
  },[]);

  return (
    <>
    <div className="container-fluid">
      <div className="row col-md-12">
        <div className="col-md-12" style={{ marginTop: "30px", marginBottom: "30px" }}>
          <TextField
            fullWidth
            label="Search Products"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-8" style={{ marginTop: "30px" }}>
          <table className="table table-striped" style={{ border: "1px solid black" }}>
            <thead>
              <tr style={{ backgroundColor: "black", color: "wheat" }}>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">IsActive</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((val, index) => (
                <tr key={index}>
                  <th scope="row">{val.id}</th>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>{val.desc}</td>
                  <td>
                    <Switch
                      checked={val.isActive}
                      onChange={(e) => handleSwitch(val.id, e.target.checked, index)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteProduct(val.id)}>Delete</button>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={() => ViewData(val)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4" style={{ marginTop: "30px" }}>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="name" style={{ display: "flex" }}>Name</label>
                <input
                  type="text"
                  id="name"
                  ref={name}
                  name="name"
                  value={addProduct.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price" style={{ display: "flex" }}>Price</label>
                <input
                  type="number"
                  id="price"
                  ref={price}
                  name="price"
                  value={addProduct.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  name="desc"
                  ref={desc}
                  id="desc"
                  value={addProduct.desc}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>

              <Switch
                checked={addProduct.isActive}
                onChange={(e) => setAddProduct({ ...addProduct, isActive: e.target.checked })}
              />
              <button className="btn btn-primary" onClick={postProduct}>Save Data</button>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <h2>Update Product</h2>
          <TextField
            label="Name"
            name="name"
            value={updateProduct.name}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={updateProduct.price}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="desc"
            value={updateProduct.desc}
            onChange={handleUpdateChange}
            fullWidth
            margin="normal"
          />
          <Switch
            checked={updateProduct.isActive}
            onChange={(e) => setUpdateProduct({ ...updateProduct, isActive: e.target.checked })}
          />
          <Button variant="contained" color="primary" onClick={updateProductDetails}>
            Update
          </Button>
        </Box>
      </Modal> */}
    </div>
     {/* ==modal  */}
     <div class="modal fade"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Product Data</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
               
                <div class="mb-3">
                  <label >Name : </label>
                  <input type="text" name='name' value={updateProduct.name} onChange={handleView}/>
                </div>
                <div class="mb-3">
                  <label >Price : </label>
                  <input type="number" name='price' value={updateProduct.price} onChange={handleView}/>
                </div>
                <div class="mb-3">
                  <label >Description : </label>
                  <input type="text" name='desc' value={updateProduct.desc} onChange={handleView}/>
                </div>
                <div className="mb-3">
                <Switch
            checked={updateProduct.isActive}
            onChange={(e) => setUpdateProduct({ ...updateProduct, isActive: e.target.checked })}
          />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={UpdateData}>Save Changes</button>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Manage;
