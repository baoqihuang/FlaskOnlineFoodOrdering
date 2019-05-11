import React from 'react';
import userService from "../../../common/services/User/UserService";
import userStoreService from "../../../common/services/User/UserStoreService";



class Register extends React.Component {


    handleSubmit = (event,props) => {
        event.preventDefault();
        let body = {
            first_name: event.target.fname.value,
            last_name: event.target.lname.value,
            email: event.target.email.value,
            username: event.target.username.value,
            password: event.target.password.value,
        };

    if ( event.target.password.value === event.target.cPassword.value) {

        userService.register_user(JSON.stringify(body)).then((data) => {
             console.log(data);
         //   console.log(props,"myprops")
            alert('Register Succeed')
             props.history.push('/')
        }).catch((error) => {
            alert(error.message);
        });

        // axios .post("/register", {
        //     first_name: event.target.fname.value,
        //     last_name: event.target.lname.value,
        //     email: event.target.email.value,
        //     username: event.target.username.value,
        //     password: event.target.password.value,
        // }) .then(response => {
        //     console.log(response);
        //     alert("New Account Successfully Created");
        //     // this.setState({flag:true})
        // })
        //     .catch(error => {
        //      //   console.log(error.response.data.msg)
        //         alert("Register Fail, Please Try Again");
        //         //this.props.logInRequest(error.response)
        //     });

       // props.history.push('/')

    } else {
        alert('Sorry, the passwords are not same.')
    }

    };

    render() {
        return (<div>


            <div className="container">
                <h4 className="header-title m-t-0">Register</h4>
                <p className="text-muted font-14 m-b-20">
                    Please follow the instruction to fill in the register form.
                </p>

                <form onSubmit={(event) => this.handleSubmit(event,this.props)}>
                    <div className="form-group">
                        <label htmlFor="fisrtName">First Name<span className="text-danger">*</span></label>
                        <input type="text" name="fname" required
                               placeholder="Enter user name" className="form-control" id="fname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                        <input type="text" name="lname" required
                               placeholder="Enter user name" className="form-control" id="lname"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email address<span className="text-danger">*</span></label>
                        <input type="email" name="email" required
                               placeholder="Enter email" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username<span className="text-danger">*</span></label>
                        <input type="text" name="username" required
                               placeholder="Enter username" className="form-control" id="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass1">Password<span className="text-danger">*</span></label>
                        <input type="password" name="password" required
                               placeholder="Password" className="form-control" id="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passWord2">Confirm Password <span className="text-danger">*</span></label>
                        <input type="password" required name='cPassword'
                               placeholder="Password" className="form-control" id="cPassword"/>
                    </div>

                    <div className="form-group text-right m-b-0">

                        <input type='submit' name='Submit' className="btn btn-danger"/>


                    </div>
                </form>

            </div>
        </div>);
    };

}

export default Register;