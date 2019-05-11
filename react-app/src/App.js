import React, {Component} from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Login from "./component/Authentication/Login/Login";
import Checkout from './component/Checkout/Checkout';
import Headers from './component/Header/Header';
import Register from "./component/Authentication/Register/Register";
import Cart from "./component/Cart/Cart";
import ManagerPage from "./component/ManagerPage/ManagerPage";
import DriverPage from "./component/DriverPage/DriverPage";
import UserProfile from "./component/UserProfile/UserProfile";
import About from "./component/About/About";
import Description from "./component/Description/Description";
class App extends Component {

    render() {
        return (

            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Headers}/>
                        <Route exact path='/cart' component={Cart}/>
                        {/*<Route exact path='/productdetail/:productId' component={ProductDetail}/>*/}
                        <Route exact path='/desription/:productId' component={Description}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/checkout' component={Checkout}/>
                        <Route exact path='/userProfile' component={UserProfile}/>
                        <Route exact path='/manager' component={ManagerPage}/>
                        <Route exact path='/driver' component={DriverPage}/>
                        <Route exact path='/about' component={About}/>

                    </Switch>
                </BrowserRouter>
            </React.Fragment>

        );
    }
}

export default App;
