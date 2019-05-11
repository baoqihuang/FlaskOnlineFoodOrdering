import React, {Component} from 'react';
import UserStoreService from "../../../common/services/User/UserStoreService";
import userService from "../../../common/services/User/UserService";
import Modal from '@material-ui/core/Modal';
import Login from "../../Authentication/Login/Login";
import "./HistoryBox.css";


class HistoryBox extends Component {

    state = {

        orderHistoryDetail: [],
        cancelButton: false,
        ifcancellable: null,
        status: this.props.orderStatus,
        open: false,
        addReview: null
    };


    componentDidMount() {

        let body = {
            order_id: this.props.orderId,
        };
        // console.log(body.authorization, "token")
        userService.getOrderHistoryDetail(JSON.stringify(body)).then((data) => {
            console.log(data);

            this.setState({orderHistoryDetail: data.orderdetail, ifcancellable: !data.ifcancellable});
            var pair = {reviewed: false};
            for (let i = 0; i < this.state.orderHistoryDetail.length; i++) {
                this.state.orderHistoryDetail[i] = {...this.state.orderHistoryDetail[i], ...pair};
            }
            //this.state.orderHistoryDetail = {...this.state.orderHistoryDetail, ...pair};
            console.log(this.state.orderHistoryDetail, "orderHistory")
        }).catch((error) => {
            alert(error.message);
        });

    }

    handleCancel = () => {

        this.setState({status: 'canceled', ifcancellable: true});

        console.log(this.props.orderId)
        let body = {
            order_id: this.props.orderId,
        };
        // console.log(body.authorization, "token")
        userService.order_cancel(JSON.stringify(body)).then((data) => {
            console.log(data);
            alert("Cancel Order Succeed!");
        }).catch((error) => {
            alert(error.message);
        });

    };
    handleClose = () => {

        this.setState({

            open: false
        });
    };
    handleReview = (itemId, index) => {

        this.setState({
            open: true,
            addReview: {
                index: index,
                itemId: itemId
            }
        });
    };
    handleSubmit = () => {
        if(document.getElementById('reviewBox').value === ""){
            alert("Cannot add empty review!")
        }
        else{
        console.log(this.state.addReview.itemId)
        console.log(this.props.orderId)
        console.log(document.getElementById('reviewBox').value)
        // console.log(document.getElementById('reviewBox').value, "review")
        // console.log(itemid, "item id")
         this.handleClose();
        // // event.preventDefault();
        let body = {
            order_id: this.props.orderId,
            item_id: this.state.addReview.itemId,
            comment: document.getElementById('reviewBox').value,
        };

        userService.get_reviewinfo(JSON.stringify(body)).then((data) => {

            console.log(data, "data");

            let orderHistoryDetail = this.state.orderHistoryDetail;
            orderHistoryDetail[this.state.addReview.index].reviewed = true;
             this.setState({
                 orderHistoryDetail: orderHistoryDetail
             })

             console.log(this.state.orderHistoryDetail, "check status")
         //   this.setState({ifReviewed: true})

            alert("Review Submit")
        }).catch((error) => {
            alert(error.message);
        });}

    };


    render() {
        return (
            <div>
                <Modal
                    aria-labelledby="sm snoimple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                >
                    <div>
                        <div className="loginbox reviewbox">

                        <textarea rows="10" cols="50" id='reviewBox'>
                        </textarea>
                            <input type="submit" name="" value="Submit Review" onClick={this.handleSubmit}>
                            </input>
                        </div>

                    </div>
                </Modal>

                <div>
                    <p className="borderexample"></p>
                    <div className="text-muted m-b-30 freeFont">

                        OrderId: {this.props.orderId}
                    </div>
                    <div className="text-muted m-b-30 freeFont">
                        OrderStatus: {this.state.status}
                    </div>
                    <div className="text-muted m-b-30 freeFont">
                        Date: {this.props.orderDate}
                    </div>
                    <div className="text-muted m-b-30 freeFont">
                        TotalPrice: {this.props.totalPrice.toFixed(2)} </div>
                </div>

                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <table
                            className="table table-bordered table-hover"
                            id="tab_logic"
                        >
                            <thead>
                            <tr>

                                <th className="text-center freeFont"> Picture</th>
                                <th className="text-center freeFont"> Name</th>
                                <th className="text-center freeFont"> Price</th>
                                <th className="text-center freeFont"> Quantity</th>
                                <th className="text-center freeFont"> Add Review</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.orderHistoryDetail.map((item, idx) => (
                                <tr id="addr0" key={item.item_id}>

                                    <td>
                                        <img className="rounded managerpicsize imagesize " src={item.picurl}/>
                                    </td>
                                    <td>
                                        <p className="fontsize">{item.name}</p>
                                    </td>
                                    <td>
                                        <p className="fontsize"> {item.price}</p>
                                    </td>
                                    <td>
                                        <p className="fontsize">{item.quantity}</p>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.handleReview(item.item_id, idx)}
                                            className=" btn btn-success"
                                            disabled={item.reviewed || !item.reviewable}
                                        >
                                            Add Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <button
                            onClick={this.handleCancel}
                            className=" btn btn-danger pull-right mb-3"
                            disabled={this.state.ifcancellable}
                        >
                            Cancel Order
                        </button>


                    </div>
                </div>

            </div>

        )

    };
}

export default HistoryBox;