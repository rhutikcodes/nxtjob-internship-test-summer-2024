import axios from "axios";

export async function getUserDetails(){ 
    return axios.get("http://localhost:3000/api/getUserDetails")
}