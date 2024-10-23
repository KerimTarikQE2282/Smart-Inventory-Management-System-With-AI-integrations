import axios from "axios";
import {useQuery} from "react-query";

const fetchData=(url)=>{
  const myurl=`http://localhost:3002/api/v1/${url}/`
  
    console.log("🚀 ==> file: useGetData.js:7 ==> fetchData ==> url:", myurl);

    return axios.get(myurl)
}

export const useGetData=(url)=>{
    return useQuery(`FETCH_${url}`,()=>fetchData(url),{
      cacheTime: 5000,
      refetchInterval: 10000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
   
      
    })
}