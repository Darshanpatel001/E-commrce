import axios from "axios";
import { base_url } from "../constant";
//  get-methode 
let get_api = async (endpoint) => {
  let res = await axios.get(base_url +endpoint);
  return res;
};
// post-methode 
let add_api = async (endpoint ,data) => {
  try{
    let res = await axios.post(base_url + endpoint,data);
  console.log(res);
  }catch(error){
    console.log(error);
  }
};

// delete-methode 
const delete_api = async (endpoint, id) => {
  
    let res =await axios.delete(base_url + endpoint, id);
   return res

};

// update_api

const Update_api = async ( endpoint , product)=>{
  let res = await axios.put( base_url+endpoint , product);
  return res

}

export{ get_api,add_api, delete_api,Update_api}