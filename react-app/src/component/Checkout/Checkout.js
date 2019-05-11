import React, {Component} from 'react';
import "./Checkout.scss"
import Form from "react-bootstrap/Form";
import userStoreService from './../../common/services/User/UserStoreService';
import userService from "../../common/services/User/UserService";
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import UserStoreService from "../../common/services/User/UserStoreService";

class Checkout extends Component {
    state = {
        shippingDisable: false
    };


    orderSubmit = (event) => {
        console.log(event.target.phone.value)
        let body = {
            phone_number: event.target.phone.value
        };

        if(UserStoreService.getToken() !== undefined) {
            if(parseInt(document.getElementById("month").value) >= new Date().getMonth()+1){


        userService.shoppingcart_placeorder(JSON.stringify(body)).then((data) => {
            console.log(data);
            //   console.log(props,"myprops")
            alert('Order Submit')
            this.props.history.push('/')
        }).catch((error) => {
            alert(error.message);
        });

        }
        else{
            alert("Credit card expired")
            }}
        else{
            alert("Please Log in")
        }
        event.preventDefault();
    };

    render() {
        return (
            <div className="bgnew">
                <div className="container">
                    <img className="rounded mx-auto d-block logogo" src={logo}/>
                    <br></br>
                    <h1 className="m-t-0 header-title"><b><strong>Check out</strong></b></h1>





                    <div className="card-box">
                        <h4 className="m-t-0 header-title"><b>Payment & Contact Information</b></h4>

                        <p className="text-muted m-b-30 font-13">
                            Payment Information and Phone Number
                        </p>
                        <form onSubmit={(event) => this.orderSubmit(event)}>
                            <div className="form-group">
                                <label htmlFor="cardtype">Card Type<span className="text-danger">*</span></label>
                                <Form>
                                    <Form.Control as="select">
                                        <option>Visa</option>
                                        <option>MasterCard</option>
                                        <option>American Express</option>
                                        <option>Discovery</option>
                                    </Form.Control>
                                </Form>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardnumber">Card Number (Sixteen Digits)<span className="text-danger">*</span></label>
                                <input  type="text" pattern="\d{16}" required
                                        placeholder="Card Number" className="form-control"/>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6">
                                    <label htmlFor="exp">Expiration Month<span className="text-danger">*</span></label>
                                    <Form>
                                        <Form.Control as="select" id="month">
                                            <option>01</option>
                                            <option>02</option>
                                            <option>03</option>
                                            <option>04</option>
                                            <option>05</option>
                                            <option>06</option>
                                            <option>07</option>
                                            <option>08</option>
                                            <option>09</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                        </Form.Control>
                                    </Form>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="exp">Year<span className="text-danger">*</span></label>
                                    <Form>
                                        <Form.Control as="select">
                                            <option>2019</option>
                                            <option>2020</option>
                                            <option>2021</option>
                                            <option>2022</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                        </Form.Control>
                                    </Form>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="security">Security Number (Three digits)<span className="text-danger">*</span></label>
                                <input type="text" pattern="\d{3}" required
                                       placeholder="Security Number" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phonenumber">Phone Number<span className="text-danger">*</span></label>
                                <input type="tel" required pattern="\d{10}"
                                       placeholder="Phone Number Format: 1234567890" name="phone" className="form-control"/>
                            </div>
                            <h3 className="display-price">
                                Total:    <strong>${userStoreService.getTotalPrice()}</strong>
                            </h3>
                            <div className="form-group text-right m-b-0">
                                <button className="btn btn-danger" type="submit">
                                    Place Order
                                </button>

                            </div>
                        </form>

                    </div>


                </div>
            </div>

        );
    }
}

export default Checkout;