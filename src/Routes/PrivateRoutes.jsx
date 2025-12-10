import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {

    const location = useLocation();
    const {loading,user} = useAuth();
    if(loading){
        return <Loading></Loading>
    }
if(!user){
     return <Navigate state={location?.pathname} to='/login'></Navigate>
}

    return children;
};

export default PrivateRoutes;