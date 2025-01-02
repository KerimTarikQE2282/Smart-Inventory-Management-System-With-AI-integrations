
const initialState={
    name:null,
    abreviation:null
}

export default function (state=initialState,action){
    const {type,payload}=action;
    switch(type){
    case 'GET_ALL_units_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'GET_ALL_units_FAILED':
            return{
                ...state
            }
    case 'GET_units_BY_ID_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'GET_units_BY_ID_FAILED':
            return{
                ...state
                }
     case 'CREATE_units_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'CREATE_units_FAILED':
            return{
                ...state
            }
    case 'UPDATE_units_SUCCESS':
            return{
                ...state,
                name:payload.name
            }
    case 'UPDATE_units_FAILED':
            return{
                ...state
            }
            default:
                return state;
    }
}