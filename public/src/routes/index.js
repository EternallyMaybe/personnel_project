import React from 'react';
import {HashRouter, Route, Switch, hashHistory, Redirect} from 'react-router-dom';
import Login from '../views/base/login';
import Register from '../views/base/register';
import Home from '../views/base/home';
import NotMatch from '../views/base/404';

function requireAuth(Layout, props) {
    let isLogin = document.cookie.indexOf('USER_ID');
    
    if (isLogin !== -1) {
        return (<Layout {...props}></Layout>)
    } else {
        return (<Redirect to="/" />);
    }
}

const BasicRoute = () => (
    <HashRouter history={hashHistory}>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/home" component={props => requireAuth(Home, props)}></Route>
            <Route component={NotMatch}></Route>
        </Switch>
    </HashRouter>
);

export default BasicRoute;