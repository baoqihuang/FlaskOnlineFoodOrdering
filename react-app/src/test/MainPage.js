import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {connect} from "react-redux";
import {loginAction,logInRequest} from "../actions/loginAction";
import jwt_decode from "jwt-decode";
import {BrowserRouter as Router, Redirect,Route} from "react-router-dom";
// import PopUpWindow from "../FrameWorkUnity/DynamicPopUpWindow/PopUpWindow";
import {changeUserType} from '../actions/changeUserTypeAction';
import * as ACTION from "../actions/action_type";



class mainPage extends React.Component {

    render() {
        console.log('I am in main page props ');
        console.log(this.props);
        if (this.props.auth === false) {
            return (
                <div>
                    <Login props={this.props}/>
                </div>
            );
        }
        else if (this.props.userType === ACTION.MANAGER && this.props.auth === true) {
            return (<Redirect to={'/manager'}/>)
        }
        else if (this.props.userType === ACTION.CLIENT && this.props.auth === true) {
            return (<Redirect to={'/overview'}/>)}
    }
}


class Login extends React.Component {
    state = {
        username:"",
        password:"",
        open:false,
        message:"",
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit =(e) => {
        e.preventDefault();

        console.log('it just submit');

        axios.post('http://127.0.0.1:5000/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            if (response.status === 201) {
                console.log(jwt_decode(response.data.access_token).identity.user_type);
                console.log(response);

                this.props.props.changeUserType(jwt_decode(response.data.access_token).identity.user_type)
                this.props.props.logInRequest(response)
                this.props.props.logInAction()
            }
        }).catch(error => {
            alert("Log In Fail, Please Try Again");
            this.props.props.logInRequest(error.response)

        });


    }

    render(){
        console.log('I am in login page props ');
        console.log(this.props);
        return (
            <div>

                <Paper style ={paperStyle}>
                    <div className ="wrapper fadeInDown" style={wrapper}>
                        <div id="formContent">
                            <form onSubmit={this.onSubmit}>
                                <Typography variant="h6" >Sign In</Typography>
                                <div style={{margin: '50px'}}>
                                    <input
                                        style={{margin: '20px'}}
                                        type = "text"
                                        placeholder="User Name"
                                        value = {this.state.username}
                                        onChange ={e=>this.setState({username:e.target.value})}
                                    />
                                    <input

                                        type = "password"
                                        placeholder="Password"
                                        value = {this.state.password}
                                        onChange ={e=>this.setState({password:e.target.value})}
                                    />
                                </div>

                                <Button variant="contained" type="submit" style={{margin:'10px'}}>
                                    Sign In
                                </Button>

                                <div id="formFooter" style={formFooter}>
                                    <a className="underlineHover" href= "/changepassword">Forgot Password?</a>
                                    <a className="underlineHover" href= "/register">New User?</a>
                                    <p>test    </p>
                                </div>
                            </form>
                            {/*<Modal*/}
                                {/*aria-labelledby="simple-modal-title"*/}
                                {/*aria-describedby="simple-modal-description"*/}
                                {/*open={this.state.open}*/}
                                {/*onClose={this.handleClose}>*/}

                                {/*<ChangePassword/>*/}
                            {/*</Modal>*/}
                        </div>
                    </div>
                </Paper>
            </div>
        )
    };
}




const wrapper = {
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'center',
    minHeight: '150%',
    width:'100%',
    padding: '20px',
    border: '3px solid blue',
    opacity: '.9',
    paddingTop: '20px',
    WebkitBorderRadius:'10px 10px 10px 10px',
}

const formContent = {
    WebkitBorderRadius: '10px 10px 10px 10px',
    padding: '30px',
    width: '90%',
    maxWidth: '450px',
    position:'relative',
    textAlign:'center',
    margin: 'auto',
}

const formFooter = {
    position: 'flex',
    padding:'25px',
    textAlign:'center',
    WebkitBorderRadius:'10px 10px 10px 10px',
    borderRadius: '10px 10px 10px 10px',
}
const paperStyle = {
    height: '80%',
    width:  '40%',
    boxShadow: '5px 1px 10px, 5px 1px 10px',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
    margin: 'auto',
    font: 'Helvetica',
};

const center = {
    margin: '0',
    position: 'absolute',
    paddingTop: '20px',
    whiteSpace: 'nowrap',
    paddingLeft:'200px',
    paddingBottom: '30px',
    height:'30%',
    width: '50%',
    opacity: '0.98'
}

const para = {
    paddingTop: '250px',
    position: 'flex',
}


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}

export default connect(mapStateToProps,{logInAction: loginAction,logInRequest,changeUserType})(mainPage);
