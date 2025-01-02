
const initialState={
    name:null
}

export default function (state=initialState,action){
    const {type,payload}=action;
    switch(type){
    case 'GET_ALL_brands_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'GET_ALL_brands_FAILED':
            return{
                ...state
            }
    case 'GET_brands_BY_ID_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'GET_brands_BY_ID_FAILED':
            return{
                ...state
                }
     case 'CREATE_brands_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'CREATE_brands_FAILED':
            return{
                ...state
            }
    case 'UPDATE_brands_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'UPDATE_brands_FAILED':
            return{
                ...state
            }
            default:
                return state;
    }
}