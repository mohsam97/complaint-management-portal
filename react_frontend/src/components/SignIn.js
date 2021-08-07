import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cookie from 'js-cookie';
import {Container, Grid, Paper, Typography} from "@material-ui/core";


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
            <Container component="main" maxWidth="xs">
                <div style={{
                        marginTop: 10, display: "flex", flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    < Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form style={{width: "100%", marginTop: 1}} noValidate>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={onClickSignIn}
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setSignUp(true)}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
;
export default SignIn;
