import React, {Component} from 'react';

import {Link} from "react-router-dom";
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./About.css"
class About extends Component {
    render() {
        return (
            <div>
                <img  width="300" height="200" className="rounded mx-auto d-block logo" src={logo}/>
                <Navbar align="right" bg="white" variant="light">
                    <Nav className="float-right">

                        <ul>
                            <li className='button'><a  onClick={() => this.props.history.push('/')}>Back to Home</a></li>
                        </ul>
                    </Nav>
                </Navbar>

                <div className="container aboutContainer">
                    <img  width="1200" height="800" src={logo} alt="Avatar" className="image"/>
                    <div className="overlay">
                        <div className="text">
                            <font size="48">1991</font>
                            <h1>  FIRST Fangnerdo BURGER OPENS</h1>
                            Harry Snyder introduces California’s first drive-thru hamburger stand in a space barely 10 feet square at Francisquito and Garvey in Baldwin Park. Every day before dawn, Harry visits the meat and produce markets to pick out fresh ingredients, which he prepares by hand. Meanwhile, his wife Esther diligently takes care of all the accounting for the new restaurant at their home right around the corner.</div>
                    </div>
                </div>
            </div>);
    }
}

export default About;