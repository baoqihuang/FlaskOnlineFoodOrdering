import * as ACTION from "../actions/action_type";


export const changeUserType= (payload) =>{
    return {
        type: ACTION.USERTYPE,
        payload: payload,
    };
};


export const cleanUserType= () =>{
    return {
        type: ACTION.USERTYPE,
        payload: "",
    };
};
