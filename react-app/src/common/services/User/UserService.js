import UserStoreService from "./UserStoreService";

class UserService {
    constructor() {
        this.endpoint = 'http://localhost:5000'
    }

    userLogin(postBody) {
        let url = this.endpoint + '/login';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Sorry the password and username do not match');
            }
            return resp.json();
        });
    }
    register_user(postBody) {
        let url = this.endpoint + '/register';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            if (!resp.ok) {
                console.log(resp)
                throw Error('Sorry, user already exist');
            }
            return resp.json();
        });
    }
    userInfo() {
        // let req_headers = {Authorization: 'Bearer ' + UserStoreService.getToken()}
        let url = this.endpoint + '/userinfo';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }

        }).then((resp) => {
            if (!resp.ok) {
                console.log(resp)
                throw Error('Cannot show User Profile. Please log in.');
            }
            return resp.json();
        });
    }
    display_all() {
        let url = this.endpoint + '/display';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp)
            return resp.json();
        });
    }
    display_detail(postBody) {
        let url = this.endpoint + '/display/detail';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => {
            console.log(resp)
            return resp.json();
        });
    }

    getOrderHistory(postBody) {
        let url = this.endpoint + '/auth/userorderhistory';
        return fetch(url, {
            method: 'GET',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot get order history.');
            }
            return resp.json();
        });
    }
    getOrderHistoryDetail(postBody) {
        let url = this.endpoint + '/auth/orderdetail';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot get order history Detail.');
            }
            return resp.json();
        });
    }
    order_cancel(postBody) {
        let url = this.endpoint + '/auth/cancelorder';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot cancel order. Please Log in');
            }
            return resp.json();
        });
    }
    shoppingcart_additem(postBody) {
        let url = this.endpoint + '/auth/shoppingcart/additem';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot add to Shopping Cart. Please Log in');
            }
            return resp.json();
        });
    }
    user_shoppingcart() {
        let url = this.endpoint + '/auth/shoppingcart';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Nothing in Shopping Cart.');
            }
            return resp.json();
        });
    }
    shoppingcart_deleteitem(postBody) {
        let url = this.endpoint + '/auth/shoppingcart/deleteitem';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot delete item. Please Log in');
            }
            return resp.json();
        });
    }
    user_shoppingcarttotal() {
        let url = this.endpoint + '/auth/shoppingcarttotal';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot get total price');
            }
            return resp.json();
        });
    }
    shoppingcart_placeorder(postBody) {
        let url = this.endpoint + '/auth/shoppingcart/placeorder';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Fail to submit order');
            }
            return resp.json();
        });
    }
    manager_display() {
        let url = this.endpoint + '/auth/manager';
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Fail to show all orders');
            }
            return resp.json();
        });
    }
    manager_pickup(postBody) {
        let url = this.endpoint + '/auth/managerpickup';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot pick up order');
            }
            return resp.json();
        });
    }
    get_reviewinfo(postBody) {
        let url = this.endpoint + '/auth/getreviewinfo';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot add review. Please wait until order complete.');
            }
            return resp.json();
        });
    }
    set_up_items(postBody) {
        let url = this.endpoint + '/manager/setupitems';
        return fetch(url, {
            method: 'POST',
            body: postBody,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserStoreService.getToken()
            }
        }).then((resp) => {
            if (!resp.ok) {
                throw Error('Cannot add item.');
            }
            return resp.json();
        });
    }


}

export default new UserService();
