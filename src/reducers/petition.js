import { PETITIONRECIPIENT, PETITIONCATEGORY } from '../constants/actionTypes';

const initialState = {
    recipients: [],
    category: ""
}

export default (state = initialState, action) => {
    console.log("in reducer");
    switch(action.type) {
        case PETITIONRECIPIENT:
            return { ...state, 
                     recipients: action.data.map((i) => {
                            return {
                                label: i, 
                                value: i
                            }
                        })
                    }
        
        case PETITIONCATEGORY:
            return { ...state, 
                     category: action.data.map((i) => {
                                return {
                                    label: i, 
                                    value: i
                                }
                            })
                    }
        
        default:
            return state;
    }
}