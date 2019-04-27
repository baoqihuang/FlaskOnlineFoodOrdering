import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

import MainPage from "./test/MainPage";
import OverViewPage from "./test/OverViewPage";
import Register from "./test/Register";
import Changepassword from "./test/changepassword"
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/changepassword" component={Changepassword} />
                    {/*<Route exact path="/openAcc" component={OpenAccountPage} />*/}
                    {/*<Route exact path="/closeAcc" component={CloseAccountPage} />*/}

                    {/*<SecretRoute exact path="/profile" component={ProfileSettingPage} />*/}
                    <SecretRoute exact path="/overview" component={OverViewPage} />
                    {/*<SecretRoute exact path="/pay" component={BillPayPage} />*/}
                    {/*<SecretRoute exact path="/transfer" component={TransferPage} />*/}
                    {/*<SecretRoute exact path="/transfer/innerTransfer" component={InnerAccountTransfer} />*/}
                    {/*<SecretRoute exact path="/transfer/outerTransfer" component={OuterAccountTransfer} />*/}
                    {/*<SecretRoute exact path="/deposit" component={DepositPage} />*/}
                    {/*<SecretRoute exact path="/overview/account_detail" component={CheckingAccountDetail}/>*/}
                    
                    {/*<SecretRoute exact path="/manager" component={ManagerPage} />*/}


                </div>
            </Router>
        );
    }
}

const AuthService = {
    isAuthenticated: true,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    logout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const SecretRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            console.log(store.getState().auth),
                store.getState().auth === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        )}
    />
);

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
