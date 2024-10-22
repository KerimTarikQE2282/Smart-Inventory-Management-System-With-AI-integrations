"use client"
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
USER_CREATE_SUCCESS,
USER_CREATE_FAIL,
LOGOUT,

} from '../actions/types'


const initialState={
    isAuthenticated:null,
    access:global?.window?.localStorage.getItem('INVENTORY_USER'),
    user:global?.window?.localStorage.getItem('INVENTORY_USER' || null),
}

export default function(state=initialState,action){
    const {type,payload}=action

    
    switch(type){
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true/***changed */
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access',payload.access)
            global.window.localStorage.setItem('INVENTORY_USER',JSON.stringify(payload.user))
            global.window.localStorage.setItem('INVENTORY_USER_TOKEN',JSON.stringify(payload.token))
            return{
                ...state,
                isAuthenticated:true,/**changed */
                access:payload.access,
                user:payload.user
            }
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user:payload,
                

            }
        case AUTHENTICATED_FAILED:
            return{
                ...state,
                isAuthenticated:false
            }
        case USER_LOADED_FAIL:
            return{
                ...state,
                user:null
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh')
            return{
                ...state,
                access:null,
                refresh:null,
                isAuthenticated:false,
                user:null

                }
                case PASSWORD_RESET_FAIL:
                case PASSWORD_RESET_SUCCESS:
                case PASSWORD_RESET_CONFIRM_FAIL:
                case PASSWORD_RESET_CONFIRM_SUCCESS:
                    return {
                        ...state
                    }
                
                    
        
        default :
        return state
    }
}
 