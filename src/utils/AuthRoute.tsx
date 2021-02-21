import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { formsStyles } from '../styles/forms-styles';

// eslint-disable-next-line react/prop-types

type AuthProps = { component: any; authenticated: boolean; path: string, exact: boolean };

const AuthRoute = ({ component: Component, authenticated, ...rest}: AuthProps) => (
    <Route
        {...rest}
        render={(props) => authenticated ? <Redirect to='/' /> : <Component formsStyles={formsStyles} {...props} />}
        />
);

export default AuthRoute;
