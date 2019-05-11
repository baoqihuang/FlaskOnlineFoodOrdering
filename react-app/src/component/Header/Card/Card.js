import React from 'react';
import './Card.scss'
import { withRouter } from "react-router";
import userService from "../../../common/services/User/UserService";
import UserStoreService from "../../../common/services/User/UserStoreService";

const goToCarddetails = (event,props) => {


   // props.history.push('/productdetail/'+ props.cardId);
    props.history.push('./desription/' + props.cardId);
    event.preventDefault();
}
const addToShoppingCart = (event,props) => {


    // props.history.push('/productdetail/'+ props.cardId);
   // props.history.push('./desription/' + props.cardId);
   // event.preventDefault();
    if(UserStoreService.getToken() !== undefined) {
        let body = {
            item_id: parseInt(props.cardId)
        };
        userService.shoppingcart_additem(JSON.stringify(body)).then((data) => {
            // userStoreService.setToken(data.token);
            console.log(data, "data");
            alert("Thanks to add this Item to the Shopping Cart.");
        }).catch((error) => {
            alert(error.message);
        });
    }
    else
    {
        alert("Please Log in")
    }


}

const Card = (props) => {



    return (
        <div className='cardContent'>
            <div onClick = {(event)=>goToCarddetails(event,props)}>
            <img className="rounded picsize" src={props.cardUrl} />

            <p className='short-description cardName'>{props.cardName}</p>
            <p className='short-description cardPrice'>{props.cardPrice}</p>
            </div>
            <div className="addCartCenter">
                <button type="button" className="btn btn-success addCart" onClick = {(event)=>addToShoppingCart(event,props)}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default withRouter(Card);