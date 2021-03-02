import storage from "redux-persist/lib/storage"
export default function userLogin(state=[],action){
    switch(action.type){
        case "LOGIN_USER":
            return Object.assign(state, { ...action.payload});
        case "LOGIN_REQUEST":
                return Object.assign({...state}, { ...action.payload});
        case "LOGIN_USER_SUCCESS":
                return Object.assign({...state}, { ...action.payload});
        case "LOGIN_USER_FAILURE":
                return Object.assign({...state}, { ...action.payload});
        case "SIGN_UP_SUCCESS":
                return Object.assign(...state, { ...action.payload});
        case "SIGN_UP_FAILURE":
                return Object.assign(...state, { ...action.payload});
        case "USER_PROFILE_SUCCESS":
                    return Object.assign(state, { ...action.payload});
        case "USER_PROFILE_FAILURE":
                    return Object.assign(state, { ...action.payload});
        case "LOGOUT_USER":
                    storage.removeItem('persist:root')
                    return state=[];
        default: 
            return state;
    }
}