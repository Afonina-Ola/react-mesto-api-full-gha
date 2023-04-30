import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
    return (
        <Route>
            {loggedIn ? Component : <Redirect to="/sign-in" />}
        </Route>
    )
}

export default ProtectedRoute;