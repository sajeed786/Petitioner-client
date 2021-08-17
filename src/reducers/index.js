import { combineReducers } from 'redux';

import authReducer from './auth'
import petitionReducer from './petition'

export const reducers = combineReducers({ 
    auth: authReducer, 
    petition: petitionReducer 
});