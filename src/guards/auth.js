import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from '../utils/auth';
import { fetchUser } from '../reducer/userSlide';
import { useEffect } from 'react';

const ProtectedAuth = ({ children }) => {
    const { user, pending, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    if (isLogin() && user === null) {
        dispatch(fetchUser());
    }
    console.log(isLogin(), user);
    return !isLogin() ? <Navigate to="/login" /> : !pending && user ? children : error ? <Navigate to="/login" /> : null;
};

export default ProtectedAuth;
