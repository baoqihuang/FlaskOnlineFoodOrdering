import React from 'react';
import "./Login.scss";
import userService from './../../../common/services/User/UserService';
import UserStoreService from './../../../common/services/User/UserStoreService';
import {Redirect} from "react-router";

class Login extends React.Component {

    handleSubmit = (event, closeModal) => {
        event.preventDefault();
        let body = {
            username: event.target.username.value,
            password: event.target.psw.value
        };

        userService.userLogin(JSON.stringify(body)).then((data) => {
            UserStoreService.setToken(data.access_token);
            UserStoreService.setUser(data);
            console.log(data, "data");
            console.log(UserStoreService.getToken(), "token");
            closeModal(true);
            if(data.user_type === "manager")
            {
                this.props.parentData.history.push('/manager')
            }
            else
            {
                this.props.parentData.history.push('/');
            }


            event.preventDefault();
        }).catch((error) => {
            alert(error.message);
        });

    };

    render() {
        return (
            <div>
                <div className="loginbox">
                    <h1>Welcome</h1>
                    <form onSubmit={(event) => this.handleSubmit(event,this.props.closeModal)}>
                        <div className="inner-icon left-addon">
                            <span className="glyphicon glyphicon-user"/>
                            <input type="text" name="username" placeholder="Enter username" required/>
                        </div>
                        <div className="inner-icon left-addon">
                            <span className="glyphicon glyphicon-lock"/>
                            <input type="password" name="psw" placeholder="Enter Password" required/>
                        </div>
                        <input type="submit" name="" value="Login">

                        </input>

                        <a href="/register">Don't have an account? </a>
                    </form>
                </div>

            </div>


        );
    };
}

export default Login;
