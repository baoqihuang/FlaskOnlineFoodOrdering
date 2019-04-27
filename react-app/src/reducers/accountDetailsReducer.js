import * as ACTION from "../actions/action_type";


export const accountDetailsReducer = ( state= " ", action) => {
    switch(action.type){
        case ACTION.ACCOUNT_DETAIL :
            return action.payload;
        default :
            return state;
    }
};
