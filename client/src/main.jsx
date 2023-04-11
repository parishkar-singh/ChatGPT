import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {GoogleOAuthProvider} from "@react-oauth/google";
import Login from "./Login.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="23758916844-stmcc0b0hpb115g8323nubgjafmrtstl.apps.googleusercontent.com">
        <React.StrictMode>
            <Login/>
        </React.StrictMode>,
    </GoogleOAuthProvider>
)
