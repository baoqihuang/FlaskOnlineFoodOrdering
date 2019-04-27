import {combineReducers} from 'redux'
// import * as ACTION from "../actions/action_type";
import {authenticationRequestReducer, authenticationStateReducer, authenticationUserTypeReducer} from "./authenticationReducer";
import {profileReducer} from "./profileReducer";
import {accountDetailsReducer} from "./accountDetailsReducer";
// import {imageUpLoadReducer} from "./ImageUpLoadReducer/imageUpLoadReducer";
// import {windowOpenCloseReducer} from "./WindowOpenCloseReducer/windowOpenCloseReducer"

export default combineReducers( {
    myInfo   :  profileReducer,
    auth     :  authenticationStateReducer,
    myKey    :  authenticationRequestReducer,
    myDetail :  accountDetailsReducer,
    //myImage  :  imageUpLoadReducer,
    //popWindowState : windowOpenCloseReducer,
    userType : authenticationUserTypeReducer,
});



