import React, {Component} from 'react';
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./UserProfile.css";
import HistoryBox from "./HistoryBox/HistoryBox";
import userService from "../../common/services/User/UserService";
import UserStoreService from "../../common/services/User/UserStoreService";

class UserProfile extends Component {
    state = {
        fname: '',
        lname: '',
        email: '',
        phoneNumber:'',

        orderHistory: [],

    };

    componentDidMount() {


        if (UserStoreService.getToken() !== undefined) {

            userService.userInfo().then((data) => {
                // userStoreService.setToken(data.token);
                console.log(data, "data");
                this.setState({fname: data.first, lname: data.last, email: data.email, phoneNumber: data.phonenumber})

            }).catch((error) => {
                alert(error.message);
            });

            userService.getOrderHistory().then((data) => {
                console.log(data);

                this.setState({orderHistory: data});
                UserStoreService.setUserOrderHistory(data);
                console.log(UserStoreService.getUserOrderHistory(), "orderHistory")
            }).catch((error) => {
               // alert(error.message);
            });

            // fetch data from backend and assign all to displayCare
        }
        else
        {
            alert("Please Log in");
            this.props.history.push('/');
        }

    }


    render() {
        return (<div className="bgnew">


            <div className="UserProfileContainer container ">
                <img className="rounded mx-auto d-block logogo" src={logo}/>

                <Navbar variant="light">
                    <Nav className="float-right">
                        <Nav.Link >Welcome, {this.state.fname}&nbsp;&nbsp;&nbsp;&nbsp;</Nav.Link>
                        <ul2>
                            <li><a onClick={() => this.props.history.push('/')}>Main Page</a></li>
                        </ul2>


                    </Nav>
                </Navbar>

                <div className="card-box">
                    <h3 className="m-t-0 header-title"><b>User Information</b></h3>
                    <p className="borderexample"></p>
                    <p className="text-muted m-b-30 freeFont">
                        Name: {this.state.fname} {this.state.lname}
                    </p>
                    <p className="text-muted freeFont">
                        Email: {this.state.email}
                    </p>
                    <p className="text-muted freeFont">
                        Phone Number: {this.state.phoneNumber}
                    </p>

                </div>

                <div className="card-box">

                    <h3 className="m-t-0 header-title"><b>Order History</b></h3>
                    {
                        this.state.orderHistory.map((val, index) => {
                            return (
                                <HistoryBox orderId={val.id} orderStatus={val.status} orderDate={val.time}
                                            totalPrice={val.total} key={index}/>
                            )
                        })
                    }

                </div>
            </div>


        </div>);
    }
}

export default UserProfile;