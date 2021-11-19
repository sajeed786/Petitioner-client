import { AUTH, SIGNUP, LOGOUT, ACTIVATE} from '../constants/actionTypes';
import { toast } from 'react-toastify';

const  initialState = {
    authData: null,
    isLoggedIn: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            //console.log(action.data.resultData);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));
            state = { ...state, authData: action.data.resultData, isLoggedIn: true};
            console.log(state);
            return state;
         
        case SIGNUP:
            if(action.data.success)
                toast.success(action.data.message);
            else
                toast.error(action.data.message);
            
            return state;

        case ACTIVATE:
            if(action.data.success)
            {
                toast.success(action.data.message);
            }
            else
                toast.error(action.data.message);
            
            return state; 
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, isLoggedIn: false };
        
        default:
            return state;
    }
};