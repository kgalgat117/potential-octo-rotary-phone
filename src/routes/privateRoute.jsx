import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { validateUser } from './../utils/api'

const PrivateRoute = ({ path, component, location }) => {

    const [loginStatus, setLoginStatus] = useState({ isLogged: false, gotUnswerFromServer: false });

    useEffect(() => {
        validateUser().then(res => {
            setLoginStatus({ gotUnswerFromServer: true, isLogged: true })
        }, err => {
            setLoginStatus({ gotUnswerFromServer: true, isLogged: false })
        })
    }, []);

    return loginStatus.gotUnswerFromServer ? loginStatus.isLogged ?
        (<Route path={path} component={component} />) :
        (<Redirect to={{ pathname: '/login', state: { from: location } }} />) :
        (<div> Loading... </div>); //this null can be repaced by the loader later 
}

export { PrivateRoute }
