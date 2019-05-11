import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../images/ezgif-1-e382b6df9dbb.png"
import "./Header.css"
import Modal from '@material-ui/core/Modal';
import Login from '../Authentication/Login/Login';
import Card from './Card/Card';
import userService from "../../common/services/User/UserService";
import userStoreService from "../../common/services/User/UserStoreService";


class Header extends Component {



    state = {
        userStatus: userStoreService.isLoggedin()? 'Order History': 'Login',
        nameData: [],
        allData:[],
        open: false,
        selectedMeun: null,
        // url: ['https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-bacon.jpg',
        //     'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-deluxe.jpg',
        //     'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc.jpg',
        //     'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/qpc-double.jpg',
        //     'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/smokehouse.jpg',
        //     'https://www.mcdonalds.com/content/dam/usa/documents/fresh-beef/smokehouse-double.jpg'],
        // name: ['NEW Quarter Pounder®* with Cheese Bacon',
        //     'NEW Quarter Pounder®* Deluxe',
        //     'Quarter Pounder®* with Cheese',
        //     'Double Quarter Pounder®* with Cheese',
        //     'Bacon Smokehouse Burger',
        //     'Double Bacon Smokehouse Burger'],
        // price: ['$2.69', '$4.29', '$4.59', '$5.49', '$3.59', '$4.59']
        logout: userStoreService.isLoggedin()
    };


    // showDisplayCare = () => {
    //         userService.getAll().then((data) => {
    //             userStoreService.setUser(data);
    //             console.log(data);
    //             alert('Register Succeed')
    //         }).catch((error) => {
    //             alert(error.message);
    //         });
    //         props.history.push('/')
    //
    // };

    componentDidMount() {
        window.scrollTo(0, 0)
        this.setState({
            selectedMeun: document.getElementById('all')
        });
        userService.display_all().then((data) => {
           // userStoreService.setUser(data);
            console.log(data);
            this.setState({nameData: data, allData: data});
         //   console.log(this.state.nameData);
        }).catch((error) => {
            alert(error.message);
        });

        // fetch data from backend and assign all to displayCare
    }

    handleOpen = () => {
        if (this.state.userStatus === 'Login') {
            this.setState({open: true});
        } else {
            this.props.history.push('/userprofile')
        }

    };

    handleClose = (login = false) => {
        let userStatus = 'Login';
        if (login) {
            userStatus = 'Order History';

        }
        this.setState({
            userStatus,
            open: false,
            logout: userStoreService.isLoggedin()

        });
    };

    meunHandler = (care, element) => {
        let allData = this.state.allData;
        let nameData =[];

        if (this.state.selectedMeun !== null) {
            this.state.selectedMeun.className = '';
        }

        switch (care) {
            case 'meal': {
                console.log(this.state.nameData);
                nameData = allData.filter(function (meal) {
                    return meal.category === "meal";
                });
                console.log(nameData);
                break;
            }

            case 'burger': {
                nameData = allData.filter(function (burger) {
                    return burger.category === "burger";
                });
                console.log(nameData);
                break;
            }
            case 'drink': {
                nameData = allData.filter(function (drink) {
                    return drink.category === "drink";
                });
                console.log(nameData);
                break;
            }
            case 'appetizer': {
                nameData = allData.filter(function (appetizer) {
                    return appetizer.category === "appetizer";
                });
                console.log(nameData);
                break;
            }
            case 'all': {
                nameData = allData;
            }
        }

        element.target.className = 'active';
        this.setState({
            selectedMeun: element.target,
            nameData: nameData
        })
    };

    render() {

        return (
            <div>

                <img  width="300" height="200" className="rounded mx-auto d-block logo" src={logo}/>
                <Navbar align="right" bg="white" variant="light" className="align">
                    <Nav className="float-right">

                        <ul>
                            <li><a className="active" onClick={() => this.props.history.push('/')}>Home</a></li>
                            <li><a  onClick={this.handleOpen} >{this.state.userStatus}</a></li>
                            <li><a  onClick={() => this.props.history.push('/cart')}>Shopping Cart</a></li>
                            <li><a onClick={() => this.props.history.push('/about')}>About Us</a></li>
                            {this.state.logout &&
                            <li><a href="/">Log Out</a></li>}

                        </ul>
                    </Nav>
                </Navbar>
                <Modal
                    aria-labelledby="sm snoimple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={() => this.handleClose(false)}
                >
                    <Login closeModal={this.handleClose} parentData={this.props}/>
                </Modal>




                
                <div className="vertical-menu">

                    <a id='all' className='active' onClick={(event) => {
                        this.meunHandler('all', event)
                    }}>View All</a>
                    <a onClick={(event) => {
                        this.meunHandler('meal', event)
                    }}>Meal</a>
                    <a onClick={(event) => {
                        this.meunHandler('burger', event)
                    }}>Burger</a>
                    <a onClick={(event) => {
                        this.meunHandler('drink', event)
                    }}>Drinks</a>
                    <a onClick={(event) => {
                        this.meunHandler('appetizer', event)
                    }}>Salad</a>


                </div>

                <div className='cardBox'>
                    {
                        this.state.nameData.map((val, index) => {
                            return (
                                <Card cardName={val.name} cardPrice={val.price} cardUrl={val.picture} cardId={val.id} key={index}/>
                            )
                        })
                    }
                </div>

            </div>);
    }
}

export default Header;