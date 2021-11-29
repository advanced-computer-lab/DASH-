import React from "react";
import {Navigate } from 'react-router-dom'; 

import auth from "../auth";


export const ProtectedRouteGuest = ({children})=>{

    return auth.isAuthenticatedAdmin()? <Navigate to="/"/> :auth.isAuthenticatedUser()? <Navigate to="/user/home"/>: children ;
        
}