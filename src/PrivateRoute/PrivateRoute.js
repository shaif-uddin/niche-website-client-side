import React from 'react';
import { Redirect } from 'react-router';
import useAuth from './../Hooks/useAuth';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = useAuth();
    if (loading) return 'loading';
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    user.email ? (children) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}>
                        </Redirect>
                    )}
        />
    );
};

export default PrivateRoute;