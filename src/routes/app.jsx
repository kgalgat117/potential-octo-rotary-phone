import React from "react"
import { BrowserRouter, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Login } from "../pages/login"
import { Problems } from "../pages/problems";
import { PrivateRoute } from "./privateRoute";

function AppRoute() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/problems" component={Problems} />
                <Redirect from="*" to="/login" />
            </Switch>
        </BrowserRouter>
    )
}

export { AppRoute }