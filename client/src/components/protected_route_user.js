import React from "react";
import {Navigate} from 'react-router-dom'; 
import auth from "../auth";

export const ProtectedRouteUser = ({children})=>{
    
    return auth.isAuthenticatedUser()? children :auth.isAuthenticatedAdmin()? <Navigate to="/"/>: <Navigate to="/logIn"/> ;
   
        
}