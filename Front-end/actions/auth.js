import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
   
    LOGOUT
    
    } from './types'

   export const checkAuthenticated= () => async dispatch =>{
        if(localStorage.getItem('access')){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }; 
            const body=JSON.stringify({ token:localStorage.getItem('access')});
            try{
                const res=await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,body , config)
                    if(res.data.code !== 'token_not_valid'){
                        dispatch({
                            type:AUTHENTICATED_SUCCESS
                        })
                    }
                    else{
                        dispatch({
                           
                                type:AUTHENTICATED_FAILED
                            
                            
                        })
                    }
            }catch(err)
        {
            dispatch({
                type:AUTHENTICATED_FAILED
            })
            }
    
        }
        else{
            dispatch({
                type:AUTHENTICATED_FAILED
            })
        }
    }



    export const login = (data,setLoading,setError) => async dispatch => {
        console.log('axios reached')
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
     const url='https://seniorproject-inventory-managemnet.onrender.com/api/v1/?email='+ data.Email +'&password='+data.Password+''
        
    
       try {
            const res = await axios.get(url, config);
           
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            setLoading(false)
            
         } catch (err) {

            dispatch({
                type: LOGIN_FAIL
            })
            setLoading(false)
            setError( err?.response?.data?.msg)
         }
    };
  
    export const reset_password=(email)=> async dispatch=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body=JSON.stringify({email});
        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,body,config)
            dispatch({
                type:  PASSWORD_RESET_SUCCESS
    
            })
        }
        catch(err){
            dispatch({
                type:  PASSWORD_RESET_FAIL
    
            })
        }
    }
    export const reset_password_confirm = (uid,token,new_password,re_new_password) => async dispatch =>{
        console.log("reached here")
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body=JSON.stringify({uid,token,new_password,re_new_password});
        try{
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,body,config)
            dispatch({
                type:  PASSWORD_RESET_CONFIRM_SUCCESS
    
            })
        }
        catch(err){
            dispatch({
                type:  PASSWORD_RESET_CONFIRM_FAIL
    
            })
        }
    }
    export const logout =()=> dispatch =>{
        dispatch({
            type:LOGOUT
        })
    }