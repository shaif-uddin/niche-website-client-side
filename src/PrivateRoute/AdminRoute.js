import React from 'react';
import { Redirect } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { Route } from 'react-router-dom';

const AdminRoute = ({ children, ...rest }) => {
    const { isAdmin, loadingAdmin, user } = useAuth();
    if (loadingAdmin) return 'Loading';
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    user.email && isAdmin ? (children) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}>
                        </Redirect>
                    )}
        />
    );
};

export default AdminRoute;