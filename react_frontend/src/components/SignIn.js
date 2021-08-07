import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cookie from 'js-cookie';


const SignIn = (props) => {
    const {setIsAuthorized, setSignUp} = props
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onClickSignIn() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
        };
        fetch("api/token/", requestOptions).then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                    return {placeholder: "something went wrong!"};
                });
            }
            return response.json()
        }).then(data => {
            cookie.set('token', data?.access);
            setIsAuthorized(true)
        });
    }

    return (
        <>
            <TextField
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <TextField
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <Button onClick={onClickSignIn}>Sign in</Button>
            <Button onClick={()=>setSignUp(true)}>Sign up</Button>
        </>

    );
};
export default SignIn;
