import React, { ChangeEvent, CSSProperties, useContext } from 'react';
import { Button, TextField } from "@material-ui/core";
import { UserContext } from '../../contexts/UserContext';
import { LoginContext } from '../../contexts/User/loginContext';
import '../../style/Entry.css'
import { Link } from 'react-router-dom';

function HandleLogin() {
    const loginContext = useContext(LoginContext);
    const userContext = useContext(UserContext)

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        loginContext.handleEmailLogin(e);
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        loginContext.handlePasswordLogin(e);
    }

    // const handleClick = () => {
    //     loginContext.loginRequest()
    //     userContext.shopStateTrue()
    // }

    return(
        <div>
            <h2 className="entry-title">Login</h2>
            <form action="/">
                <TextField
                    className="form-inputs"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    type="email"
                    label="Email Adress"
                    name="email"
                    key="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleEmailInput}
                    // helperText={emailError}
                    // error={Boolean(emailError)}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="password"
                    type="password"
                    label="password"
                    name="password"
                    key="password"
                    autoComplete="password"
                    autoFocus
                    onChange={handlePasswordInput}
                    // helperText={passwordError}
                    // error={Boolean(passwordError)}
                />
                <Link to="/user-profile" style={{ textDecoration: "none", width: "100%" }}>
                    <Button
                        onClick={loginContext.loginRequest}
                        style={btn}
                        variant="contained"
                        >
                        Login
                    </Button>
                </Link>
            </form>
        </div>
    );
}

const btn: CSSProperties = {
    alignSelf: "center",
    borderRadius: ".5rem",
    outline: "none",
    fontSize: "1rem",
    background: "#56EAC6",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    width: '100%',
    margin: "1rem 0rem"
  };

export default HandleLogin