import React, {Component} from 'react';
import './ManagerPage.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "@material-ui/core/Modal/Modal";
import AddItem from "./AddItem/AddItem";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import logo from "../images/ezgif-1-e382b6df9dbb.png";
import userService from "../../common/services/User/UserService";
import UserStoreService from "../../common/services/User/UserStoreService";

class ManagerPage extends Component {
    state = {

        open: false,
        scroll: 'body',
        orderList: [],
    };
    componentDidMount() {



        if(UserStoreService.getToken() !== undefined) {

        userService.manager_display().then((data) => {

            console.log(data);
            //
             this.setState({orderList: data});
            // console.log(this.state.allData, "ComponentDidmMount allData");
            // console.log(this.state.nameData);
        }).catch((error) => {
          //  alert(error.message);
        });

        // fetch data from backend and assign all to displayCare
    }
    else{
        alert("Please Log in")
        }

    }
    handleRemoveRow = (idx, id) => {

        let datas = this.state.orderList[idx];

        let body = {
            order_id: id
        };

        userService.manager_pickup(JSON.stringify(body)).then((data) => {

            console.log(data);
            this.setState({
                orderList: this.state.orderList.filter(function (row) {
                    return row !== datas;
                })
            });
            alert("Pick up order successfully")
        }).catch((error) => {
            alert(error.message);
        });


    };
    handleOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    render() {
        return (
            <div>
                <div className="container">
                    <img className="rounded mx-auto d-block Mlogo" src={logo}/>
                    <Navbar bg="white" variant="light">
                        <Nav className="float-right">
                            <Nav.Link >Hi, Manager</Nav.Link>
                            <Nav.Link onClick={this.handleOpen('body')}>Add Item</Nav.Link>
                            <Nav.Link href="/">Log Out</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        scroll={this.state.scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="simple-modal-description"
                    >
                        <DialogContent>

                        <AddItem closeModal={this.handleClose}/>
                        </DialogContent>
                    </Dialog>
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <table
                                className="table table-bordered table-hover"
                                id="tab_logic"
                            >
                                <thead>
                                <tr>
                                    <th className="text-center"> Order Id </th>
                                    <th className="text-center"> Order Detail </th>
                                    <th className="text-center"> Order Time </th>
                                    <th className="text-center"> Pick up </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orderList.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <td>{item.order_id}</td>
                                        <td>
                                            {item.detail}
                                        </td>
                                        <td>
                                            {item.order_time}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => this.handleRemoveRow(idx, item.order_id)}
                                                className=" btn btn-danger"
                                            >
                                                Pick up
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagerPage;