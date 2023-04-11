import React from 'react'
import {GoogleLogin} from '@react-oauth/google';
import {GoogleOAuthProvider} from '@react-oauth/google';
//client id=23758916844-stmcc0b0hpb115g8323nubgjafmrtstl.apps.googleusercontent.com
//client secret=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

const Login = () => {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (<div>
        <h2>React Google Login</h2>
        <br/>
        <br/>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
    </div>)
};

export default Login;
