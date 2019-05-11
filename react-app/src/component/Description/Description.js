import React, {Component} from 'react';
import logo from "../images/ezgif-1-e382b6df9dbb.png"
import "./Description.css"
import StarRatings from 'react-star-ratings';
import userService from "../../common/services/User/UserService";
import userStoreService from "../../common/services/User/UserStoreService";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from '@material-ui/core/Modal';
import like from "./like/like.css"
import BottomComment from "./comment/comment"
import MapContainer from "./map/MapContainer"

class Description extends Component {

    state ={
        count: 0,
        itemData:[],
        review: [],
    };

    incrementMe = () =>
    {

        let newCount = this.state.count+1
        this.setState({
            count: newCount
        })

    }

    componentDidMount() {
        window.scrollTo(0, 0)
        let body = {
            item_id: parseInt(this.props.match.params.productId)
        };

        console.log(this.props.match.params.productId, "id")
        let quality = null;
        console.log(body);
        userService.display_detail(JSON.stringify(body)).then((data) => {


            console.log(data);

            this.setState({itemData: data.item_detail, review: data.review});
          //   quality = data.quantity;
          //   if (quality > 0)
          //   {
          //       this.setState({status: "In Stock"});
          //   }

        }).catch((error) => {
            alert(error.message);
        });


    }

    render() {

        return (
            <div>
                <div>
                    <img  width="250" height="180" className="rounded mx-auto d-block logo" src={logo}/>

                </div>
                <hr></hr>
                <div>
                <div id="descriptionPic">

                    <img  className="imgg" src = {this.state.itemData.picurl}/>

                </div>


                <div id="right-panel" >


                    <p className="ppp">{this.state.itemData.name}</p>
                    <div className="product-rating">
                        <StarRatings name="small-rating" caption="Small!" size={30} totalStars={5} rating={this.state.itemData.rating} starRatedColor="gold" />
                        <h6>Cal: {this.state.itemData.cal}</h6>
                    </div>

                    <h5 className="font-weight-bold">Description: </h5>
                    <div>{this.state.itemData.description}</div>
                    <h5 className="font-weight-bold mt-2">Ingredient: </h5>
                    <div>{this.state.itemData.ingredient}</div>

                    {/*<span>ies. As part of our commitment to you, we provide the most current ingredient information available from our food suppliers for the eight most common allergens as identified by the U.S. Food and Drug Administration (eggs, da*/}

                        {/*<div><h4 className="p1">Double Cheese Burger</h4></div>*/}

                    {/*th other food products, including allergens. We encourage our customers with food allergies or special dietary needs to visit www.mcdonalds.com for ingredient information, and to consult their doctor for questions regarding their diet. Due to the individualized nature of food allergies and food sensitivities, customers' physicians may be best positioned to make recommendations for customers with food allergies and special dietary needs. If you have questions about our food, please reach out to us directly at mcdonalds.com/contact or 1-800-244-6227.*/}
                        {/*<br></br> <br></br> <br></br>*/}
                    {/*</span>*/}
                    {/*<button className="bbb button-like" onClick={this.incrementMe}>*/}
                        {/*<i className="fa fa-heart"></i>*/}
                        {/*<span>Like: {this.state.count}</span>*/}
                    {/*</button>*/}
                </div>
                </div>
                <BottomComment review = {this.state.review}/>
                <p className="borderexample"></p>


                <div><MapContainer /></div>


            </div>);
    }





}

export default Description;