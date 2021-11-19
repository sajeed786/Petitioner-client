import { PETITIONRECIPIENT, PETITIONCATEGORY, PETITIONDATA} from '../constants/actionTypes';

const initialState = {
    recipients: [],
    category: "",
    content: {}
}

export default (state = initialState, action) => {
    //console.log("in reducer");
    switch(action.type) {
        case PETITIONDATA:
            return {...state,
                content: action?.data
            }
            
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