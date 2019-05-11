import React from 'react';
import './AddItem.css';
import userService from "../../../common/services/User/UserService";

const AddItem = (props) => {

    const handleSubmit = (event) => {
        let body = {
            name: event.target.itemName.value,
            price: event.target.price.value,
            description: event.target.itemDescription.value,
            ingredient: event.target.ingredient.value,
            cal: event.target.calorie.value,
            rating: event.target.rating.value,
            picurl: event.target.itemPicture.value,
            category: event.target.itemCategory.value
        };


        userService.set_up_items(JSON.stringify(body)).then((data) => {
            console.log(data);

            alert('Add/Update Item Successfully!');

            props.closeModal();

            //  this.props.history.push('/manager')

        }).catch((error) => {
            alert(error.message);
        });


        //userService.userLogin(body)
        event.preventDefault();
    };
    return (
        <div>


            <div>
                <h1>Add Item</h1>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="itemName">Name<span className="text-danger">*</span></label>
                        <input type="number" name="itemName" required
                               placeholder="Enter Item Name" className="form-control" id="itemName"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price<span className="text-danger">*</span></label>
                        <input type="number" step="0.01" name="price" required
                               placeholder="Enter Price" className="form-control" id="price"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemDescription">Description<span className="text-danger">*</span></label>
                        <input type="text" name="itemDescription" required
                               placeholder="Enter Item Description" className="form-control" id="itemDescription"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredient">Ingredient<span className="text-danger">*</span></label>
                        <input type="text" name="ingredient" required
                               placeholder="Enter Ingredient" className="form-control" id="ingredient"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="calorie">Calorie<span className="text-danger">*</span></label>
                        <input type="number" name="calorie" required
                               placeholder="Enter Calorie" className="form-control" id="calorie"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating<span className="text-danger">*</span></label>
                        <input type="number" name="rating" required
                               placeholder="Enter Rating" className="form-control" id="rating"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemCategory">Picture<span className="text-danger">*</span></label>
                        <input type="text" name="itemPicture" required
                               placeholder="Enter Item Picture Url" className="form-control" id="itemPicture"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemCategory">Category<span className="text-danger">*</span></label>
                        <select className="form-control" name="itemCategory" id="itemCategory">
                            <option value="Meal">Meal</option>
                            <option value="Burger">Burger</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Salad">Salad</option>
                        </select>
                    </div>

                    <div className="btnCenter">
                    <button
                        className="btn btn-danger"
                    >
                        Add Item
                    </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddItem;