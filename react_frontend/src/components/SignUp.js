import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cookie from 'js-cookie';
import {Checkbox, Container, FormControlLabel, Grid, Typography} from "@material-ui/core";


const SignUp = (props) => {
    // A sign up page
    const {setIsAuthorized} = props
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    function onClick() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                is_admin: isAdmin
            })
        };
        fetch("api/createuser", requestOptions).then(response => {
            if (response.status > 400) {
                return this.setState(() => {
                    return {placeholder: "something went wrong!"};
                });
            }
            return response.json()
        }).then(data => {
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
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div style={{
                marginTop: 10, display: "flex", flexDirection: 'column',
                alignItems: 'center',
            }}>
                < Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form style={{width: "100%", marginTop: 1}} noValidate>
                    <TextField
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                    />
                    <TextField
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                    />
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="email"
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            name="checkedC"
                            checked={isAdmin}
                        />}
                        label="Is Admin"/>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={onClick}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
};
export default SignUp;
