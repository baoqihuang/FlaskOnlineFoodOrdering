let _instance = null;

class UserStoreService {
    constructor() {
        if (_instance) {
            return _instance;
        }

        _instance = this;
        this.initialize();
    }

    initialize() {
        this.userInfo = null;
    }

    setUser(userInfo) {
        this.userInfo = userInfo;
    }

    getUser() {
        return this.userInfo;
    }
    isLoggedin() {
        return this.userInfo !== null;
    }
    setToken(token){
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    getTotalPrice(){
        return this.totalPrice;
    }
    setTotalPrice(totalPrice) {
        this.totalPrice = totalPrice;
    }
    setUserOrderHistory(orderHistory) {
        this.orderHistory = orderHistory;
    }
    getUserOrderHistory(){
        return this.orderHistory;
    }
}

export default new UserStoreService();

