import React, {Component} from 'react';
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './DriverPage.css'
import GoogleMap from "./GoogleMap/GoogleMap";

class DriverPage extends Component {


    state = {
        clicked: false,
        start: true,
        address: ['87 N San Pedro St, San Jose, CA 95110',
            '233 W Santa Clara St, San Jose, CA 95113',
            '43 W San Salvador St, San Jose, CA 95113',
        '550 Newhall Dr, San Jose, CA 95110',
        '748 Story Rd, San Jose, CA 95112'],

        addresses: [
                    ['Santa Clara University', '500 El Camino Real, Santa Clara, CA'],
                    ['San Jose Civic Center', '135 W San Carlos St, San Jose, CA'],
                    ['SJC Airport', '1701 Airport Blvd, San Jose, CA 95110'],
                    ['SJSU (end)', '1 Washington Sq, San Jose, CA']],
        open: false,
    };




    clickHandler = () =>{
        this.setState({start: false, clicked: true})
    };


    render() {
            return (
                <div>
                    <img className="rounded mx-auto d-block logo" src={logo}/>
                    <Navbar bg="white" variant="light">
                        <Nav className="float-right">
                            <Nav.Link>Hi, Driver</Nav.Link>
                        </Nav>
                    </Navbar>
                    <div className="Dbutton" id="start">
                        {this.state.start &&
                        <button onClick={this.clickHandler} className="btn btn-danger">
                            Start Delivery
                        </button>}
                        {this.state.clicked &&
                        <div className="container">
                            <button className="btn btn-danger mb-2">
                                End Delivery
                            </button>
                            <table
                                className="table table-bordered table-hover"
                                id="tab_logic"
                            >
                                <thead>
                                <tr>
                                    <th className="text-center"> Address</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.addresses.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <td>
                                            {this.state.addresses[idx][1]}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>}


                    </div>

                    {this.state.clicked &&
                    <div className="inline">
                        <GoogleMap addresses = {this.state.addresses}/>
                    </div>}
                </div>

            );

    };
}

export default DriverPage;