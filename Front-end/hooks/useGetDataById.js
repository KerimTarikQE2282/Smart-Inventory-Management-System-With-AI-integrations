import axios from "axios";
import { useQuery } from "react-query";


const fetchData=async (url,id)=>{
 const myurl=`http://localhost:3002/api/v1/${url}/${id.id}`
 const User_role =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER_TOKEN') || '{}');
  const authentication_token=`Bearer ${User_role}`
  var config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': authentication_token
    },
  };
return await axios.get(myurl,config)
}


export const useGetDataById=(url,id)=>{
    return useQuery([`FETCH_${url}_BY_ID`],()=>fetchData(url,id),{
      cacheTime: 5000,
      refetchInterval: 10000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
     
        
      })
}