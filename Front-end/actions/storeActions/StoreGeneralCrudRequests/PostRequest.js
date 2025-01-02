

import toast from "react-hot-toast";

export async function makePOSTApiRequest(endpoint,setLoading,data,name){
  
    const baseUrl='http://localhost:3000'
    console.log(data)
    try {
        setLoading(true)
        const response=await fetch(`${baseUrl}/api/${endpoint}`,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
         })
          console.log(data);
          if(response.ok){
            console.log(response.json());
            setLoading(false)
            toast.success(`Successfully Added A ${name}!`, {icon: '✔️'})
            reset();
          }else{
            setLoading(false)
            toast.error('Some thing went wrong!', {icon: '❌'})
          }
          
       } catch (error) {
        console.log(error)
        setLoading(false)
       }

}