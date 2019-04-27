import * as ACTION from "../actions/action_type";




export const accountDetailAction = (payload) =>{
    return {
        type: ACTION.ACCOUNT_DETAIL,
        payload: payload,
    };
};
