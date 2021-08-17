import { AUTH, SIGNUP, LOGOUT, ACTIVATE } from '../constants/actionTypes';
import { toast } from 'react-toastify';

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));
            
            return { ...state, authData: action?.data };
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
            return { ...state, authData: null };
        
        default:
            return state;
    }
};