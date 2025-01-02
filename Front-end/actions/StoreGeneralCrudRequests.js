import toast from "react-hot-toast";
import axios from "axios";



const baseUrl = 'http://https://smart-inventory-management-system-with.onrender.com/api/v1//';



export const makePOSTApiRequest = (endpoint,setLoading,data,name) => async dispatch => {
  setLoading(true);
  console.log('item addddd 222222')
  const url=`${baseUrl}${endpoint}`

  const User_role =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER_TOKEN') || '{}');
  const authentication_token=`Bearer ${User_role}`
  var config = {
  headers: {
    'Content-Type': 'application/json',
    'authorization': authentication_token
  },
};

try {
  const res = await axios.post(url, data, config);
dispatch({
  type: `CREATE_${name}_SUCCESS`,
  payload: res.data,
});
 
  setLoading(true);
  if (res.status === 200 || res.status === 201) { // Check for successful response status
    console.log(res.data);
    setLoading(false);
    toast.success(`Successfully Added A ${name}!`, { icon: '✔️' });
   
    if (typeof reset === 'function') {
      reset(); // Ensure reset is defined
    }
  } else {
    setLoading(false);
    toast.error(response.data, { icon: '❌' });
    dispatch({
      type: `CREATE_${name}_FAILED`,
      payload: res.data,
    });
  }
} catch (error) {
  console.error(error);
  setLoading(false);
  console.log('errrrrrrrrrrrrrrrrrorrrrrrrrrrrrrr',error.response?.data?.msg);
  toast.error(error.response?.data?.msg, { icon: '❌' });
  dispatch({
    type: `CREATE_${name}_FAILED`,
    payload: error.response?.data || error.message,
  });
}
};





export const makePUTApiRequest = (endpoint,setLoading,data,name) => async dispatch => {
  const User_role =  JSON?.parse(global?.window?.localStorage.getItem('INVENTORY_USER_TOKEN') || '{}');
  const authentication_token=`Bearer ${User_role}`
  var config = {
  headers: {
    'Content-Type': 'application/json',
    'authorization': authentication_token
  },
};
setLoading(true)
    
      try {
        
        const response=await axios.patch(`${baseUrl}${endpoint}`,data,config)
        
                console.log("🚀 ==> file: StoreGeneralCrudRequests.js:71 ==> makePUTApiRequest ==> response:", response);

                if(response.statusText=200){
                
                setLoading(false)
                console.log('checker',endpoint,setLoading,data,name)
                toast.success(`Successfully Updated A ${name}!`, {icon: '✔️'})
                dispatch({
                  type:`UPDATE_${name}_SUCCESS`,
                  payload:res.data
                })
               return true
              }else{
                setLoading(false)
                toast.error('Some thing went wrong!', {icon: '❌'})
                dispatch({
                  type:`UPDATE_${name}_FAILED`,
                  payload:res.data
                })
              }
              setLoading(false)
        
      } catch (error) {
        console.log(error)
        setLoading(false)
        dispatch({
          type:`UPDATE_${name}_FAILED`
        })
      }
  
  }










  