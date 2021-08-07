import React, {Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import SignIn from "./SignIn";
import cookie from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';


const App = () => {
    const [data, setData] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(null);
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
            body: JSON.stringify({token:token})
        };
        fetch("api/token/veirfy/", requestOptions).then(response => {
            if (response.status<400)
                setIsAuthorized(true)
            else
                setIsAuthorized(false)
        })

    }, [])

    return isAuthorized != null? isAuthorized?<p>qwe</p>:<SignIn setIsAuthorized={setIsAuthorized}/>:<CircularProgress/>
};

// SignIn.propTypes = {
//     t: PropTypes.func,
// };
//
// SignIn.getInitialProps = async () => ({
//     t: () => {
//     },
// });
ReactDOM.render(<App/>, document.getElementById('app'))
