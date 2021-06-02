import { ChangeEvent, CSSProperties, useContext, useState } from 'react';
import { Button, TextField } from "@material-ui/core";
import { LoginContext } from '../../contexts/User/loginContext';
import '../../style/Entry.css'
import { Link } from 'react-router-dom';

function HandleLogin() {
    const { handleEmailLogin, handlePasswordLogin, loginRequest, isLoggedIn, loginError, errorTxt } = useContext(LoginContext);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const history = useHistory()

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)) {
            setEmailError("Email is not valid");
          } else if (e.target.value === "") {
            setEmailError("Field cannot be empty");
        }
          else {
            setEmailError("")
            handleEmailLogin(e);
          }
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,}).*$/.test(e.target.value)) {
            setPasswordError("Password must be eight characters, atleast one number");
        } else if (e.target.value === "") {
              setPasswordError("Field cannot be empty");
          }
          else {
            setPasswordError("")
            handlePasswordLogin(e);
          }
    }

    const handleClick = () => {
        loginRequest()
    }

    const handleLoginClick = async () => {
        const loggedIn = await loginRequest()
        if (loggedIn) {
            history.push("/user-profile")
        }
    }

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
                    helperText={emailError}
                    error={Boolean(emailError)}
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
                    helperText={passwordError}
                    error={Boolean(passwordError)}
                />
                {loginError 
                ?
                <p style={{ color: "red" }}>{errorTxt}</p>
                :
                <></>
                }
                {/* {isLoggedIn ? "/user-profile" : "/entry"} */}
                {window.location.pathname === '/checkout' ?
                    <Button
                        type="submit"
                        onClick={handleClick}
                        style={btn}
                        variant="contained"
                        >
                        Login
                    </Button>
                :

                    <Button
                        onClick={handleLoginClick}
                        style={btn}
                        variant="contained"
                        >
                        Login
                    </Button>
                }
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