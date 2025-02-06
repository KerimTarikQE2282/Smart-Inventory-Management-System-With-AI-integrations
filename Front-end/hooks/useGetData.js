import axios from "axios";
import {useQuery} from "react-query";


//http://localhost:3002/api/v1/ online url ++++++++++++++++++++++++++
const fetchData=(url)=>{
  const myurl=`http://localhost:3002/api/v1/${url}/`
  const User_role =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER_TOKEN') || '{}');
  const authentication_token=`Bearer ${User_role}`
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': authentication_token
    },
  };
    console.log("🚀 ==> file: useGetData.js:7 ==> fetchData ==> url:", myurl);

    return axios.get(myurl,config)
}

export const useGetData=(url)=>{
    return useQuery(`FETCH_${url}`,()=>fetchData(url),{
      cacheTime: 5000,
      refetchInterval: 10000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
   
      
    })
}