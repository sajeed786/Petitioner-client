import { AUTH, SIGNUP} from '../constants/actionTypes';
import * as api from '../api/index';
import { toast } from 'react-toastify';

export const login = (formData, history) => async (dispatch) => {
    
    try {
        //log in the user
        const {data} = await api.logIn(formData);

        dispatch({ type: AUTH, data});

        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    
    try {
        //signup the user
        console.log(formData);
        const {data} = await api.signUp(formData);
        console.log(data);
    

        dispatch({ type: SIGNUP, data});

        //history.push('/');
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
};

export const fbauth = (response, history) => async (dispatch) => {
    
    try {
        //signup the user using facebook login
        //console.log(response);
        const {data} = await api.fbLogin(response.userID, response.accessToken);

        if(!data.error)
        {
            dispatch({ type: AUTH, data});

            history.push('/');
        }  
    } catch (error) {
        console.log(error);
    }
};

