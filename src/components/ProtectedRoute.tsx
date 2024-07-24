import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = Cookies.get('token'); // Adjust the cookie name if necessary
    return !!token;
};


const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/note" />;
};

const PublicRoute = ({ children }) => {
    return !isAuthenticated() ? children : <Navigate to="/login" />;
};

export { PrivateRoute, PublicRoute };

