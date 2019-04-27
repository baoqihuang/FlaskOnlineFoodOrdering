import * as ACTION from "../actions/action_type";

export const authenticationStateReducer = ( authState=false, action) => {
    if (action.type === ACTION.SIGN_IN || action.type === ACTION.SIGN_OUT) {
        return action.payload;
    }
    return authState;
};

export const authenticationUserTypeReducer = ( state=" ", action) => {
    if (action.type === ACTION.USERTYPE) {
        return action.payload;
    }
    return state;
};


export const authenticationRequestReducer = (state = '', action) => {
    switch(action.type){
        case ACTION.LOG_IN :{
            console.log(action.payload.status);
            return action.payload.status === 201 ? action.payload.data.access_token : " ";}
        case ACTION.LOG_OUT :
            return " ";
        default :
            return state;
    }

};