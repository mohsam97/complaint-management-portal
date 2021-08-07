import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import SignIn from "./SignIn";
import cookie from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import SignUp from "./SignUp";
import UserComplaints from "./UserComplaints";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


const App = () => {
    const [data, setData] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [user, setUser] = useState({});
    const [isAmin, setIsAdmin] = useState(null);
    const [signUp, setSignUp] = useState(false);
    // useEffect(() => {
    //     fetch("users/api", {
    //         headers: {
    //             "Authorization":
    //                 "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4MjY0NzcxLCJqdGkiOiJlZTc5YWQ0YmU4NDU0ZWIxOTQ5N2I4OTM4ZTI5NDFjYiIsInVzZXJfaWQiOjJ9.xtCWwZO5mEmJQXS7nkdOGonnPyMJR-AdcUSJar7CcF4"
    //         }
    //     }).then(response => {
    //         if (response.status > 400) {
    //             return this.setState(() => {
    //                 return {placeholder: "something went wrong!"};
    //             });
    //         }
    //         return response.json()
    //     }).then(data => {
    //         setData(data)
    //     });
    //
    // }, [])

    useEffect(() => {
        const token = cookie.get('token');
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: token})
        };
        fetch("api/token/veirfy/", requestOptions).then(response => {
            if (response.status < 400)
                setIsAuthorized(true)
            else
                setIsAuthorized(false)
        })
    }, [])

    useEffect(() => {
        fetch("api/me", {headers: {'Authorization': "Bearer " + cookie.get('token')}}
        ).then(response => {
            if (response.status > 400)
                console.log(response.status)
            return response.json()
        }).then(data => {
                setIsAdmin(data.is_admin)
                setUser(data)
            }
        )
    }, [isAuthorized])

    if (isAuthorized != null)
        if (isAuthorized)
            return <MuiPickersUtilsProvider utils={DateFnsUtils}><UserComplaints isAdmin={isAmin}
                                                                                 user={user}/></MuiPickersUtilsProvider>
        else if (signUp)
            return <SignUp setIsAuthorized={setIsAuthorized}/>
        else
            return <SignIn setIsAuthorized={setIsAuthorized} setSignUp={setSignUp}/>
    else
        return <CircularProgress/>

};

ReactDOM.render(<App/>, document.getElementById('app'))
