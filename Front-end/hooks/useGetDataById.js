import axios from "axios";
import { useQuery } from "react-query";


const fetchData=async (url,id)=>{
 const myurl=`http://localhost:3002/api/v1/${url}/${id.id}`
 console.log("🚀 ==> file: useGetDataById.js:8 ==> fetchData ==> myurl:", myurl);
return await axios.get(myurl)
}


export const useGetDataById=(url,id)=>{
    return useQuery([`FETCH_${url}_BY_ID`],()=>fetchData(url,id),{
      cacheTime: 5000,
      refetchInterval: 10000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
     
        
      })
}