import toast from "react-hot-toast";

export async function makePUTApiRequest(endpoint,setLoading,data,name){
 
    const baseUrl='http://localhost:3000'
  
    try {
      
      console.info('from api endpoint',endpoint,setLoading,data,name)
        setLoading(true)
        const response=await fetch(`${baseUrl}/api/${endpoint}`,{
          method:'PUT',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
         })
          
          if(response.ok){
            console.log(response.json());
            setLoading(false)
            console.log('checker',endpoint,setLoading,data,name)
            toast.success(`Successfully Updated A ${name}!`, {icon: '✔️'})
           
          }else{
            setLoading(false)
            toast.error('Some thing went wrong!', {icon: '❌'})
          }
          
       } catch (error) {
        console.log(error)
        setLoading(false)
       }
  
  }