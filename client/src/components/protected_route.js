import React from "react";
import {Navigate} from 'react-router-dom'; 
import auth from "../auth";;

export const ProtectedRoute = ({children})=>{
    

    return auth.isAuthenticatedAdmin()? children :auth.isAuthenticatedUser()? <Navigate to="/user/home"/>: <Navigate to="/logIn"/> ;
        
}