import { ChangeEvent, CSSProperties, useContext } from 'react';
import { Button, TextField } from "@material-ui/core";
import { LoginContext } from '../../../contexts/loginContext';

function HandleLogin() {
    const userContext = useContext(LoginContext);

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        userContext.handleEmailLogin(e);
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        userContext.handlePasswordLogin(e);
    }

    return(
        <div>
            <h2>Login</h2>
            <form action="/">
                <TextField
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
                <Button
                    onClick={userContext.loginRequest}
                    style={btn}
                    variant="contained"
                    >
                    Login
                </Button>
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
    padding: "1rem",
    width: '10rem',
    margin: "1rem 0rem"
  };

export default HandleLogin