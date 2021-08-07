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
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [user, setUser] = useState({});
    const [isAmin, setIsAdmin] = useState(null);
    const [signUp, setSignUp] = useState(false);

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
