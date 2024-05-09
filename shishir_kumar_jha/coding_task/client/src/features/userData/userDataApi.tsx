import axios from "axios";

export async function fetchUserDetails(){ 
    return axios.get("http://localhost:3000/api/getUserDetails")
}